/**
 * Synapse SIH 2026 - Region Insights, Dual-Model & Explainability (XAI) Component
 */
import { appState } from '../state.js';

export function renderRegionInsights(container) {
  if (!container) return;

  const renderContent = () => {
    const sector = appState.getSelectedSector();
    const radius = 40;
    const circumference = 2 * Math.PI * radius; // ~251.3
    const strokeDash = (circumference * sector.confidence) / 100;

    container.innerHTML = `
      <aside class="lg:col-span-4 flex flex-col gap-space-lg" id="region-insights-container">
        <!-- Sector Header Card -->
        <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border-t-2 border-primary">
          <div class="flex items-center justify-between pb-space-xs mb-space-sm">
            <div>
              <div class="flex items-center gap-1.5">
                <span class="font-label-sm text-label-sm uppercase text-outline tracking-wider font-semibold">Continuous Risk Sector</span>
                <span class="w-2 h-2 rounded-full ${sector.statusColor}"></span>
              </div>
              <h2 class="font-headline-md text-headline-md text-on-surface font-bold" id="insights-sector-name">${sector.name}</h2>
            </div>
            <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-primary font-bold">${sector.radarType}</span>
          </div>

          <!-- Arc Progress & Continuous Bust Metric Block -->
          <div class="grid grid-cols-2 gap-space-md items-center py-space-sm bg-surface-container-low rounded-xl px-space-md">
            <!-- Circular Arc Score -->
            <div class="flex flex-col items-center justify-center">
              <div class="relative w-24 h-24 flex items-center justify-center">
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="${radius}" fill="transparent" stroke="#dae2fd" stroke-width="8"></circle>
                  <circle cx="50" cy="50" r="${radius}" fill="transparent" stroke="${sector.confidence < 50 ? '#ba1a1a' : (sector.confidence < 75 ? '#825100' : '#006c49')}" stroke-width="8" stroke-dasharray="${strokeDash} ${circumference}" stroke-linecap="round"></circle>
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <span class="font-headline-md text-headline-md font-bold text-on-surface">${sector.confidence}</span>
                  <span class="font-label-sm text-[9px] text-outline font-semibold uppercase">Trust Index</span>
                </div>
              </div>
              <span class="font-label-sm text-label-sm ${sector.bustProbColor} font-bold mt-1">${sector.riskLevel}</span>
            </div>

            <!-- Probability Readout -->
            <div class="flex flex-col justify-center space-y-1">
              <span class="font-label-sm text-label-sm text-on-surface-variant font-semibold">Continuous P(Bust)</span>
              <div class="flex items-baseline gap-1">
                <span class="font-display-lg text-display-lg ${sector.bustProbColor} font-bold leading-none">${sector.bustProb}</span>
                <span class="font-label-sm text-label-sm ${sector.bustProbColor} font-semibold">${sector.probDelta}</span>
              </div>
              <div class="font-label-sm text-[11px] text-on-surface-variant pt-1 leading-tight space-y-0.5">
                <div>P(E &gt; P90): <span class="font-bold text-error">${sector.pE90}</span></div>
                <div>Expected Err: <span class="font-bold text-on-surface">${sector.expectedError}</span></div>
                <div>Track Err: <span class="font-bold text-on-surface">${sector.trackError}</span></div>
              </div>
            </div>
          </div>

          <!-- Dual-Model Behaviour Split ('Now' vs 'Next') -->
          <div class="mt-space-md p-space-sm bg-surface-container rounded-xl border border-primary/20">
            <div class="flex items-center justify-between mb-1.5">
              <span class="font-label-sm text-label-sm font-bold text-primary flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">model_training</span>
                Dual-Model Behaviour Split
              </span>
              <span class="font-label-sm text-[9px] px-1.5 py-0.2 rounded bg-primary-fixed text-on-primary-fixed font-bold">Synapse Core</span>
            </div>
            <div class="space-y-1 font-body-sm text-[11px] text-on-surface leading-tight">
              <div class="p-1.5 bg-surface-container-lowest rounded-md">
                <strong class="text-primary">1. 'Now' State:</strong> ${sector.dualModelSplit.nowState}
              </div>
              <div class="p-1.5 bg-surface-container-lowest rounded-md">
                <strong class="text-error">2. 'Next' Evolution:</strong> ${sector.dualModelSplit.nextEvolution}
              </div>
            </div>
          </div>

          <!-- Multi-Line Uncertainty Envelope Fan (D1 - D10) -->
          <div class="mt-space-md">
            <div class="flex items-center justify-between mb-1">
              <span class="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Forecast Error Field (5th-95th %ile)</span>
              <span class="font-label-sm text-label-sm text-primary font-bold">Trajectory Fallback</span>
            </div>
            <div class="w-full h-24 bg-surface rounded-lg p-2 relative">
              <svg class="w-full h-full" viewBox="0 0 280 80">
                <!-- Shaded Uncertainty Envelope (Pastel Coral) -->
                <path d="M 0,10 L 30,12 L 60,18 L 90,28 L 120,45 L 150,58 L 180,68 L 210,72 L 240,75 L 280,78 L 280,50 L 240,40 L 210,32 L 180,25 L 150,18 L 120,12 L 90,8 L 60,6 L 30,5 L 0,5 Z" fill="#FECDD3" opacity="0.6"></path>
                <!-- Median Path -->
                <path d="M 0,8 Q 90,14 120,30 T 210,55 T 280,68" fill="none" stroke="#ba1a1a" stroke-width="2"></path>
                <!-- D+4 Vertical Marker -->
                <line x1="120" y1="0" x2="120" y2="80" stroke="#006194" stroke-width="1.5" stroke-dasharray="3 3"></line>
                <text x="124" y="75" fill="#006194" class="font-label-sm text-[9px] font-bold">D+4 Cliff</text>
              </svg>
            </div>
          </div>

          <!-- Coupled Atmospheric Weights (Unified System) -->
          <div class="mt-space-md">
            <div class="flex items-center justify-between mb-2">
              <span class="font-headline-sm text-headline-sm text-on-surface font-semibold">Coupled Atmospheric Weights</span>
              <span class="font-label-sm text-label-sm text-secondary font-bold">Unified Net</span>
            </div>
            <div class="space-y-2 font-label-sm text-label-sm">
              ${sector.coupledVariables.map(item => `
                <div>
                  <div class="flex justify-between text-on-surface mb-1">
                    <span>${item.name}</span>
                    <span class="font-bold ${item.textColor}">${item.value}%</span>
                  </div>
                  <div class="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <div class="h-2 rounded-full ${item.color} transition-all duration-500" style="width: ${item.value}%;"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Blockchain-Backed Provenance Certificate Preview -->
          <div class="mt-space-md p-space-sm bg-surface-container-low rounded-xl border border-outline-variant/30">
            <div class="flex items-center justify-between mb-1">
              <span class="font-label-sm text-[11px] font-bold text-on-surface flex items-center gap-1">
                <span class="material-symbols-outlined text-primary text-[15px]">verified</span>
                Blockchain Provenance
              </span>
              <span class="font-label-sm text-[9px] px-1.5 py-0.2 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">SHA-256</span>
            </div>
            <div class="font-mono text-[9px] text-outline break-all bg-surface-container-lowest p-1.5 rounded border border-outline-variant/20">
              ${sector.blockchainCertificate.sha256Hash}
            </div>
            <div class="flex justify-between items-center mt-1 text-[10px] text-on-surface-variant font-label-sm">
              <span>Cert: <strong>${sector.blockchainCertificate.certificateId}</strong></span>
              <span class="text-secondary font-semibold">${sector.blockchainCertificate.status}</span>
            </div>
          </div>

          <!-- Meteorological Diagnosis paragraph -->
          <div class="mt-space-md p-space-sm bg-surface-container rounded-lg">
            <p class="font-body-sm text-body-sm text-on-surface leading-relaxed">
              <span class="font-bold text-primary">Coupled Diagnosis:</span> ${sector.diagnosis}
            </p>
          </div>

          <!-- Historical Analogues -->
          <div class="mt-space-md">
            <span class="font-label-md text-label-md text-on-surface-variant uppercase font-semibold block mb-2">Historical Event Matches</span>
            <div class="grid grid-cols-1 gap-2">
              ${sector.historicalMatches.map(m => `
                <div class="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between">
                  <div>
                    <span class="font-label-md text-label-md font-bold text-on-surface block">${m.event}</span>
                    <span class="font-label-sm text-label-sm text-outline">${m.note}</span>
                  </div>
                  <span class="font-label-sm text-label-sm px-2 py-0.5 rounded ${m.tagColor} font-bold">${m.tag}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </aside>
    `;
  };

  renderContent();

  // Re-render when selected sector changes
  appState.subscribe('sectorChanged', () => {
    renderContent();
  });
}
