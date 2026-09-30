/**
 * Synapse SIH 2026 - Footer Component
 */
export function renderFooter(container) {
  if (!container) return;

  container.innerHTML = `
    <footer class="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-space-md">
      <div class="w-full px-space-xl flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant">
        <div class="flex items-center gap-space-sm">
          <span class="font-label-sm text-label-sm">Operational Status: <span class="text-secondary font-bold">1,000 Inf/hr Real-Time</span></span>
          <span class="text-outline-variant">•</span>
          <span class="font-label-sm text-label-sm text-outline">Smart India Hackathon 2026 • Team OAA-Synapse</span>
        </div>
        <div class="flex items-center gap-space-lg">
          <span class="font-label-sm text-label-sm font-semibold">Synapse Dual-Model AI v2.6</span>
          <span class="font-label-sm text-label-sm text-outline">© 2026 Meteorological Analytics Directorate</span>
        </div>
      </div>
    </footer>
  `;
}
