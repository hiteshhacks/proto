/**
 * Synapse SIH 2026 - Operational Critical Alert Banner Component
 */
export function renderAlertBanner(container) {
  if (!container) return;

  container.innerHTML = `
    <div class="w-full bg-surface-container-high rounded-xl p-space-md mb-space-lg flex flex-wrap items-center justify-between gap-space-md shadow-sm border border-error/20">
      <div class="flex items-center gap-space-md">
        <div class="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-error">
          <span class="material-symbols-outlined text-[18px]">warning</span>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-headline-sm text-headline-sm text-on-surface font-bold">Dual-Model Divergence &amp; Continuous Bust Trigger</span>
            <span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-bold uppercase">Continuous Risk P(Bust) = 78%</span>
          </div>
          <p class="font-body-sm text-body-sm text-on-surface-variant">
            'Now' state reads active tropical depression (996 hPa) while 'Next' evolutionary model projects track divergence at Lead D+4 (+96h). Trajectory verification fallback active.
          </p>
        </div>
      </div>
      <div class="flex items-center gap-space-sm">
        <span class="font-label-sm text-label-sm text-outline hidden md:inline">Verification Layer: Trajectory-Based Fallback Engine</span>
        <button id="view-sounding-btn" class="px-space-md py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-sm text-label-sm font-semibold shadow-sm hover:bg-surface-container transition-all flex items-center gap-1.5" type="button">
          <span class="material-symbols-outlined text-[16px]">visibility</span>
          <span>Inspect Dual-Model XAI</span>
        </button>
      </div>
    </div>
  `;

  const btn = container.querySelector('#view-sounding-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      const el = document.getElementById('region-insights-container');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
