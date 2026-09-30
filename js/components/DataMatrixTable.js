/**
 * Synapse SIH 2026 - Data Matrix, Operational Feeds & Blockchain Ledger Component
 */
import { appState } from '../state.js';
import { SUBDIVISIONS_DATA } from '../data/mockData.js';
import { OPERATIONAL_ALERTS, BLOCKCHAIN_PROVENANCE_LEDGER, API_ENDPOINT_PREVIEW } from '../data/alertFeedData.js';
import { exportTableToCSV } from '../utils/exportHelper.js';
import { getConfidenceBadgeClass } from '../utils/formatters.js';

export function renderDataMatrixTable(container) {
  if (!container) return;

  let activeTab = 'matrix';
  let searchTerm = '';

  const renderContent = () => {
    const { selectedSectorId } = appState.getState();
    const filteredSubdivisions = SUBDIVISIONS_DATA.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dominantDriver.toLowerCase().includes(searchTerm.toLowerCase())
    );

    container.innerHTML = `
      <div class="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
        <!-- Tab Navigation Bar & Search/Export Tools -->
        <div class="flex flex-wrap items-center justify-between border-b border-outline-variant/30 pb-space-sm mb-space-md gap-space-sm">
          <div class="flex items-center gap-space-sm">
            <button data-tab="matrix" class="tab-btn px-space-md py-2 rounded-lg font-label-lg text-label-lg font-semibold transition-all ${
              activeTab === 'matrix' ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
            }" type="button">
              Sub-division Continuous Risk Matrix (D1-D10)
            </button>
            <button data-tab="alerts" class="tab-btn px-space-md py-2 rounded-lg font-label-lg text-label-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'alerts' ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
            }" type="button">
              <span>Trajectory Fallback Alerts</span>
              <span class="font-label-sm text-label-sm px-1.5 py-0.2 rounded-full ${activeTab === 'alerts' ? 'bg-error text-on-error' : 'bg-error-container text-on-error-container'} font-bold">4 Active</span>
            </button>
            <button data-tab="blockchain" class="tab-btn px-space-md py-2 rounded-lg font-label-lg text-label-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'blockchain' ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
            }" type="button">
              <span>Blockchain Provenance Ledger</span>
              <span class="font-label-sm text-[9px] px-1.5 py-0.2 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">SHA-256</span>
            </button>
            <button data-tab="json" class="tab-btn px-space-md py-2 rounded-lg font-label-lg text-label-lg transition-all ${
              activeTab === 'json' ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
            }" type="button">
              Continuous Risk API (JSON)
            </button>
          </div>

          <div class="flex items-center gap-space-sm">
            <div class="relative">
              <input id="subdivision-search" class="pl-8 pr-3 py-1.5 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none w-64 border border-outline-variant/30 focus:border-primary" placeholder="Search coupled drivers..." type="text" value="${searchTerm}"/>
              <span class="material-symbols-outlined absolute left-2 top-2 text-outline text-[16px]">search</span>
            </div>
            <button id="export-csv-btn" class="px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-colors" type="button">
              <span class="material-symbols-outlined text-[16px]">download</span>
              Export CSV
            </button>
          </div>
        </div>

        <!-- Tab 1: Comprehensive Sub-division Table -->
        <div id="tab-pane-matrix" class="tab-pane ${activeTab === 'matrix' ? 'active' : ''}">
          <div class="w-full overflow-x-auto">
            <table class="w-full text-left font-body-sm text-body-sm">
              <thead>
                <tr class="text-outline uppercase font-label-sm text-[10px] tracking-wider border-b border-outline-variant/30">
                  <th class="py-2.5 px-3">Sub-Division</th>
                  <th class="py-2.5 px-2 text-center">D1</th>
                  <th class="py-2.5 px-2 text-center">D2</th>
                  <th class="py-2.5 px-2 text-center">D3</th>
                  <th class="py-2.5 px-2 text-center bg-primary-fixed/30 font-bold text-on-surface">D4 (Now)</th>
                  <th class="py-2.5 px-2 text-center">D5</th>
                  <th class="py-2.5 px-2 text-center">D6</th>
                  <th class="py-2.5 px-2 text-center">D7</th>
                  <th class="py-2.5 px-2 text-center">D8-10</th>
                  <th class="py-2.5 px-3">Coupled Atmospheric Driver</th>
                  <th class="py-2.5 px-3 text-right">P(Bust)</th>
                  <th class="py-2.5 px-3 text-center">Dual-Model Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-outline-variant/20">
                ${filteredSubdivisions.map(item => {
                  const isSelected = item.id === selectedSectorId;
                  return `
                    <tr class="hover:bg-surface-container-low/60 transition-colors cursor-pointer ${isSelected ? 'bg-surface-container-low/80' : ''}" data-id="${item.id}">
                      <td class="py-3 px-3 font-semibold text-on-surface flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full ${item.statusColor}"></span>
                        <span>${item.name}</span>
                      </td>
                      <td class="text-center"><span class="px-1.5 py-0.5 rounded ${getConfidenceBadgeClass(item.scores.d1)} text-[10px] font-bold">${item.scores.d1}</span></td>
                      <td class="text-center"><span class="px-1.5 py-0.5 rounded ${getConfidenceBadgeClass(item.scores.d2)} text-[10px] font-bold">${item.scores.d2}</span></td>
                      <td class="text-center"><span class="px-1.5 py-0.5 rounded ${getConfidenceBadgeClass(item.scores.d3)} text-[10px] font-bold">${item.scores.d3}</span></td>
                      <td class="text-center bg-primary-fixed/20"><span class="px-1.5 py-0.5 rounded ${getConfidenceBadgeClass(item.scores.d4)} text-[10px] font-bold">${item.scores.d4}</span></td>
                      <td class="text-center"><span class="px-1.5 py-0.5 rounded ${getConfidenceBadgeClass(item.scores.d5)} text-[10px] font-bold">${item.scores.d5}</span></td>
                      <td class="text-center"><span class="px-1.5 py-0.5 rounded ${getConfidenceBadgeClass(item.scores.d6)} text-[10px] font-bold">${item.scores.d6}</span></td>
                      <td class="text-center"><span class="px-1.5 py-0.5 rounded ${getConfidenceBadgeClass(item.scores.d7)} text-[10px] font-bold">${item.scores.d7}</span></td>
                      <td class="text-center"><span class="px-1.5 py-0.5 rounded ${getConfidenceBadgeClass(item.scores.d8_10)} text-[10px] font-bold">${item.scores.d8_10}</span></td>
                      <td class="py-3 px-3 text-on-surface-variant font-label-sm text-label-sm">${item.dominantDriver}</td>
                      <td class="py-3 px-3 text-right font-bold ${item.bustProbColor}">${item.bustProb}</td>
                      <td class="py-3 px-3 text-center">
                        <button class="inspect-btn text-primary hover:text-primary-container font-label-sm text-label-sm font-semibold" data-id="${item.id}" type="button">Inspect XAI</button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tab 2: Trajectory Fallback Alerts -->
        <div id="tab-pane-alerts" class="tab-pane ${activeTab === 'alerts' ? 'active' : ''}">
          <div class="space-y-2">
            ${OPERATIONAL_ALERTS.map(alert => `
              <div class="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/30 flex items-start justify-between gap-space-md hover:bg-surface-container transition-colors">
                <div class="flex items-start gap-3">
                  <span class="font-label-sm text-label-sm px-2 py-0.5 rounded ${alert.badgeColor} font-bold uppercase mt-0.5">${alert.severity}</span>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-label-lg text-label-lg font-bold text-on-surface">${alert.region}</span>
                      <span class="font-label-sm text-label-sm text-outline">• ${alert.lead} Horizon</span>
                      <span class="font-label-sm text-label-sm px-1.5 py-0.2 rounded bg-primary-fixed text-on-primary-fixed font-semibold">${alert.status}</span>
                    </div>
                    <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">${alert.message}</p>
                  </div>
                </div>
                <div class="text-right shrink-0">
                  <span class="font-label-sm text-label-sm text-outline">${alert.time}</span>
                  <div class="font-bold text-error text-[11px]">P(Bust): ${alert.pBust}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Tab 3: Blockchain Provenance Ledger -->
        <div id="tab-pane-blockchain" class="tab-pane ${activeTab === 'blockchain' ? 'active' : ''}">
          <div class="space-y-2">
            ${BLOCKCHAIN_PROVENANCE_LEDGER.map(item => `
              <div class="p-3.5 bg-surface-container-low rounded-xl border border-secondary/30 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:bg-surface-container transition-colors">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-secondary text-[18px]">verified</span>
                    <span class="font-label-lg text-label-lg font-bold text-on-surface">${item.certificateId}</span>
                    <span class="font-label-sm text-[9px] px-1.5 py-0.2 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">${item.status}</span>
                  </div>
                  <div class="font-mono text-[10px] text-outline mt-1 break-all">Hash: ${item.sha256Hash}</div>
                </div>
                <div class="text-right shrink-0 text-on-surface-variant font-label-sm text-label-sm">
                  <div>Sector: <strong>${item.sector}</strong> (${item.leadHorizon})</div>
                  <div class="text-[10px] text-outline">${item.timestamp} • ${item.modelVersion}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Tab 4: API Endpoint Preview (JSON) -->
        <div id="tab-pane-json" class="tab-pane ${activeTab === 'json' ? 'active' : ''}">
          <div class="bg-surface-container-low rounded-xl p-space-md border border-outline-variant/30 font-mono text-body-sm text-on-surface overflow-x-auto">
            <pre><code>${JSON.stringify(API_ENDPOINT_PREVIEW, null, 2)}</code></pre>
          </div>
        </div>
      </div>

      <!-- Operational Simulation Disclaimer Footer Note -->
      <div class="mt-space-lg mb-space-sm flex flex-wrap items-center justify-between text-outline font-label-sm text-label-sm">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-[16px]">info</span>
          <span>Synapse Dual-Model continuous risk system operates with input-level ensembling for near-hourly inference. Backed by SHA-256 blockchain tamper-evident audit trail.</span>
        </div>
        <span>Engine ID: SYN-SIH-2026-IND</span>
      </div>
    `;

    // Attach Tab Navigation Clicks
    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.tab;
        renderContent();
      });
    });

    // Attach Search Input handling
    const searchInput = container.querySelector('#subdivision-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        renderContent();
        const freshInput = container.querySelector('#subdivision-search');
        if (freshInput) {
          freshInput.focus();
          freshInput.setSelectionRange(freshInput.value.length, freshInput.value.length);
        }
      });
    }

    // Attach CSV Export
    container.querySelector('#export-csv-btn')?.addEventListener('click', () => {
      exportTableToCSV('Synapse_Subdivisions_Continuous_Risk.csv');
    });

    // Attach Row / Inspect button click
    container.querySelectorAll('.inspect-btn, tr[data-id]').forEach(elem => {
      elem.addEventListener('click', (e) => {
        const id = elem.dataset.id;
        if (id) {
          appState.setSelectedSector(id);
          const insights = document.getElementById('region-insights-container');
          if (insights) insights.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  };

  renderContent();

  // Re-render when selected sector changes
  appState.subscribe('sectorChanged', () => {
    renderContent();
  });
}
