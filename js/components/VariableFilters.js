/**
 * Synapse SIH 2026 - Variable Filters & Coupled Atmospheric Controls Component
 */
import { appState } from '../state.js';

export function renderVariableFilters(container) {
  if (!container) return;

  const coupledVariables = [
    { id: 'vorticity_pressure', name: 'Coupled Pressure & Vorticity', icon: 'cyclone', badge: 'Coupled', active: true },
    { id: 'humidity_moisture', name: 'Humidity & Moisture Flux', icon: 'water_drop', badge: 'Coupled', active: false },
    { id: 'wind_vectors', name: '850 hPa Wind & Shear', icon: 'air', badge: 'knots', active: false },
    { id: 'sea_pressure', name: 'Sea Pressure & SST Coupling', icon: 'compress', badge: 'hPa', active: false }
  ];

  container.innerHTML = `
    <aside class="lg:col-span-3 flex flex-col gap-space-lg">
      <!-- Coupled Atmospheric Network Card -->
      <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
        <div class="flex items-center justify-between mb-space-md">
          <div>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-semibold">Coupled Atmospheric Net</h3>
            <p class="font-label-sm text-[10px] text-primary font-bold mt-0.5">Unified Coupling (Not Stacked)</p>
          </div>
          <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold">Stage 3</span>
        </div>
        <div class="grid grid-cols-1 gap-2" id="variable-buttons-group">
          ${coupledVariables.map(v => `
            <button data-var="${v.id}" class="var-select-btn flex items-center justify-between p-3 rounded-lg font-label-lg text-label-lg font-semibold text-left transition-all ${
              v.active ? 'bg-surface-container text-primary shadow-sm' : 'bg-surface hover:bg-surface-container text-on-surface-variant'
            }" type="button">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-[20px]">${v.icon}</span>
                <span>${v.name}</span>
              </div>
              <span class="font-label-sm text-[10px] px-1.5 py-0.5 rounded ${v.badge === 'Coupled' ? 'bg-secondary-fixed text-on-secondary-fixed font-bold' : 'text-outline'}">${v.badge}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Regime-Aware Mixture of Experts (MoE) -->
      <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
        <div class="flex items-center justify-between mb-space-md">
          <div>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-semibold">Regime Gating (MoE)</h3>
            <p class="font-label-sm text-[10px] text-outline mt-0.5">Stage 4 Mixture of Experts</p>
          </div>
          <span class="font-label-sm text-label-sm text-secondary font-bold">Gated Active</span>
        </div>
        <div class="flex flex-wrap gap-2" id="synoptic-regimes-group">
          <button class="px-3 py-1.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold flex items-center gap-1.5 shadow-sm" type="button">
            <span>Tropical Cyclone</span>
            <span class="text-error font-extrabold text-[9px]">CRITICAL</span>
          </button>
          <button class="px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold flex items-center gap-1.5 shadow-sm" type="button">
            <span>Monsoon Trough</span>
            <span class="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span>
          </button>
          <button class="px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm flex items-center gap-1 transition-colors" type="button">
            <span>Western Disturbance</span>
          </button>
          <button class="px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm flex items-center gap-1 transition-colors" type="button">
            <span>Convective Squall Line</span>
          </button>
        </div>
      </div>

      <!-- Continuous GIS Heatmap Overlays -->
      <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
        <h3 class="font-headline-sm text-headline-sm text-on-surface mb-space-md font-semibold">Continuous Risk Overlays</h3>
        <div class="flex flex-col gap-3 font-label-lg text-label-lg text-on-surface">
          <label class="flex items-center justify-between cursor-pointer">
            <span class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-secondary"></span>
              Continuous Probability P(Bust)
            </span>
            <input id="layer-pastel" checked class="w-4 h-4 text-primary rounded accent-primary cursor-pointer" type="checkbox"/>
          </label>
          <label class="flex items-center justify-between cursor-pointer">
            <span class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-tertiary"></span>
              Coupled Isobar Convergence
            </span>
            <input id="layer-isobars" checked class="w-4 h-4 text-primary rounded accent-primary cursor-pointer" type="checkbox"/>
          </label>
          <label class="flex items-center justify-between cursor-pointer">
            <span class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-error"></span>
              Trajectory Fallback Hazard Zone
            </span>
            <input id="layer-polygons" checked class="w-4 h-4 text-primary rounded accent-primary cursor-pointer" type="checkbox"/>
          </label>
          <label class="flex items-center justify-between cursor-pointer">
            <span class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-primary"></span>
              Forecast Error Field (mm/day)
            </span>
            <input id="layer-vectors" class="w-4 h-4 text-primary rounded accent-primary cursor-pointer" type="checkbox"/>
          </label>
        </div>
      </div>

      <!-- Dual-Model Architecture Metadata Card -->
      <div class="bg-surface-container-low rounded-xl p-space-lg shadow-sm border border-primary/20">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[18px]">account_tree</span>
            <span class="font-headline-sm text-headline-sm text-on-surface font-semibold">Dual-Model Co-Training</span>
          </div>
          <span class="font-label-sm text-[9px] px-1.5 py-0.5 rounded bg-primary text-on-primary font-bold">Synapse</span>
        </div>
        <div class="space-y-1.5 font-label-sm text-label-sm text-on-surface-variant">
          <div class="flex justify-between">
            <span>Model 1 ('Now'):</span>
            <span class="font-semibold text-on-surface">Cyclone Present State</span>
          </div>
          <div class="flex justify-between">
            <span>Model 2 ('Next'):</span>
            <span class="font-semibold text-on-surface">Evolutionary Projection</span>
          </div>
          <div class="flex justify-between">
            <span>Ensemble Processing:</span>
            <span class="font-semibold text-secondary">Input-Stage (1,000/hr)</span>
          </div>
          <div class="flex justify-between">
            <span>Verification:</span>
            <span class="font-semibold text-primary">Trajectory Fallback Engine</span>
          </div>
        </div>
      </div>
    </aside>
  `;

  // Attach variable button interactions
  const varBtns = container.querySelectorAll('.var-select-btn');
  varBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      varBtns.forEach(b => {
        b.className = 'var-select-btn flex items-center justify-between p-3 rounded-lg font-label-lg text-label-lg font-semibold text-left transition-all bg-surface hover:bg-surface-container text-on-surface-variant';
      });
      btn.className = 'var-select-btn flex items-center justify-between p-3 rounded-lg font-label-lg text-label-lg font-semibold text-left transition-all bg-surface-container text-primary shadow-sm';
      appState.setActiveVariable(btn.dataset.var);
    });
  });

  // Attach GIS Layer checkboxes
  container.querySelector('#layer-pastel')?.addEventListener('change', (e) => {
    appState.toggleGisLayer('pastelConfidence', e.target.checked);
  });
  container.querySelector('#layer-isobars')?.addEventListener('change', (e) => {
    appState.toggleGisLayer('bustIsobars', e.target.checked);
  });
  container.querySelector('#layer-polygons')?.addEventListener('change', (e) => {
    appState.toggleGisLayer('pulsingPolygons', e.target.checked);
  });
  container.querySelector('#layer-vectors')?.addEventListener('change', (e) => {
    appState.toggleGisLayer('ensembleSpread', e.target.checked);
  });
}
