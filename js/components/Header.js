/**
 * Synapse SIH 2026 - Header Component
 */
import { appState } from '../state.js';
import { exportTableToCSV, exportBlockchainCertificateJSON } from '../utils/exportHelper.js';

export function renderHeader(container) {
  if (!container) return;

  container.innerHTML = `
    <header class="fixed top-0 left-0 right-0 h-16 bg-surface-container-lowest border-b border-outline-variant/30 z-50 shadow-[0_1px_8px_rgba(19,27,46,0.04)]">
      <div class="h-16 w-full px-space-xl flex items-center justify-between gap-space-lg">
        <!-- Brand & Model Selection -->
        <div class="flex items-center gap-space-lg shrink-0">
          <div class="flex items-center gap-space-md">
            <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_2px_8px_rgba(0,97,148,0.25)]">
              <span class="material-symbols-outlined text-on-primary text-[22px]">hub</span>
            </div>
            <div>
              <div class="flex items-center gap-space-xs">
                <span class="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">Synapse</span>
                <span class="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold uppercase tracking-wider">SIH 2026</span>
                <span class="hidden sm:inline-block font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-bold uppercase tracking-wider">Dual-Model AI</span>
              </div>
              <p class="font-label-sm text-label-sm text-on-surface-variant leading-none mt-0.5">Continuous NWP Bust Prediction &amp; Atmospheric Coupling</p>
            </div>
          </div>
          
          <div class="h-6 w-px bg-outline-variant/40 hidden md:block"></div>
          
          <div class="hidden xl:flex items-center gap-space-sm">
            <div class="flex items-center gap-space-xs bg-surface-container-low px-space-md py-1.5 rounded-lg border border-outline-variant/30">
              <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Base Model:</span>
              <select id="model-select" class="bg-transparent font-label-lg text-label-lg text-on-surface font-semibold focus:outline-none cursor-pointer pr-1">
                <option value="graphcast">GraphCast (Google DeepMind 10-Day)</option>
                <option value="gencast">GenCast (DeepMind 50-Trajectory)</option>
                <option value="weathernext">WeatherNext (Google TPU Engine)</option>
                <option value="ncmrwf" selected>NCMRWF NCUM 12km Baseline</option>
                <option value="imd">IMD GFS 0.125° Operational</option>
              </select>
            </div>
            <div class="flex items-center gap-space-xs bg-surface-container-low px-space-md py-1.5 rounded-lg border border-outline-variant/30">
              <span class="material-symbols-outlined text-primary text-[16px]">schedule</span>
              <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Cycle:</span>
              <span class="font-label-lg text-label-lg text-on-surface font-semibold">2025-05-18 00Z</span>
            </div>
          </div>
        </div>

        <!-- Controls & Actions -->
        <div class="flex items-center gap-space-md">
          <div class="hidden sm:flex items-center gap-2 bg-surface-container px-space-md py-1.5 rounded-full border border-secondary/20">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span class="font-label-sm text-label-sm font-semibold text-secondary uppercase tracking-wider">1,000 Inf/hr Live</span>
          </div>

          <button id="theme-toggle-btn" class="w-9 h-9 rounded-lg bg-surface-container-low hover:bg-surface-container hover:text-on-surface text-on-surface-variant flex items-center justify-center transition-colors border border-outline-variant/30" type="button" title="Toggle Theme">
            <span class="material-symbols-outlined text-[18px]">light_mode</span>
          </button>

          <!-- Export Certificate Dropdown Trigger -->
          <div class="relative flex items-center shrink-0">
            <button id="export-report-btn" class="flex items-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary px-space-lg py-2 rounded-xl font-label-lg text-label-lg font-semibold shadow-[0_2px_8px_rgba(0,97,148,0.25)] transition-all" type="button">
              <span class="material-symbols-outlined text-[18px]">verified_user</span>
              <span>Bust Certificate</span>
              <span class="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
          </div>

          <div class="h-6 w-px bg-outline-variant/40 hidden sm:block"></div>

          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm cursor-pointer" title="Synapse SIH Team">
            <span class="material-symbols-outlined text-on-primary text-[18px]">smart_toy</span>
          </div>
        </div>
      </div>
    </header>
  `;

  // Bind Export button event
  const exportBtn = container.querySelector('#export-report-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      exportBlockchainCertificateJSON();
    });
  }

  // Bind Theme toggle button event
  const themeBtn = container.querySelector('#theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      appState.toggleTheme();
    });
  }
}
