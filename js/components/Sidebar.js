/**
 * Synapse SIH 2026 - Sidebar 6-Stage Pipeline Navigation Component
 */
import { appState } from '../state.js';

export function renderSidebar(container) {
  if (!container) return;

  const pipelineStages = [
    { id: 'bust-targeting-map', label: '1. Continuous Bust Map', icon: 'radar', active: true, tag: 'Stage 6' },
    { id: 'dual-model-learning', label: "2. Dual-Model 'Now/Next'", icon: 'model_training', active: false, tag: 'Stage 3' },
    { id: 'coupled-encoder', label: '3. Coupled Atmospheric Net', icon: 'cyclone', active: false, tag: 'Stage 3' },
    { id: 'regime-aware-fusion', label: '4. Regime Gating (MoE)', icon: 'hub', active: false, tag: 'Stage 4' },
    { id: 'trajectory-verification', label: '5. Trajectory Fallback', icon: 'route', active: false, tag: 'Stage 5' }
  ];

  const verificationStages = [
    { id: 'blockchain-provenance', label: 'Blockchain Ledger Audit', icon: 'token', active: false, tag: 'SHA-256' },
    { id: 'model-feedback-loop', label: 'Continuous Feedback Loop', icon: 'published_with_changes', active: false, tag: 'Update' }
  ];

  const renderNavLinks = (items) => items.map(item => `
    <a href="#${item.id}" data-path="${item.id}" class="nav-item-link flex items-center justify-between px-space-md py-2.5 transition-all rounded-xl font-label-lg text-label-lg ${
      item.active
        ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_2px_8px_rgba(0,123,185,0.2)]'
        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
    }">
      <div class="flex items-center gap-space-md">
        <span class="material-symbols-outlined text-[20px]">${item.icon}</span>
        <span>${item.label}</span>
      </div>
      <span class="font-label-sm text-[9px] px-1.5 py-0.5 rounded ${item.active ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-surface-container text-outline'} uppercase font-bold">${item.tag}</span>
    </a>
  `).join('');

  container.innerHTML = `
    <aside class="fixed left-0 top-16 bottom-0 w-64 bg-surface-container-lowest border-r border-outline-variant/30 z-40 flex flex-col justify-between py-space-lg overflow-y-auto">
      <div class="px-space-md">
        <div class="px-space-sm pb-space-md text-[10px] font-bold text-outline uppercase tracking-wider font-label-sm flex items-center justify-between">
          <span>6-Stage Pipeline</span>
          <span class="text-primary font-bold">Synapse</span>
        </div>
        <nav class="flex flex-col gap-1" id="nav-core">
          ${renderNavLinks(pipelineStages)}
        </nav>

        <div class="mt-space-xl px-space-sm pb-space-md text-[10px] font-bold text-outline uppercase tracking-wider font-label-sm">
          Trust &amp; Provenance
        </div>
        <nav class="flex flex-col gap-1" id="nav-config">
          ${renderNavLinks(verificationStages)}
        </nav>
      </div>

      <!-- Compute-Aware Throughput Box -->
      <div class="px-space-md pt-space-md border-t border-outline-variant/30">
        <div class="bg-surface-container-low p-space-md rounded-xl border border-outline-variant/30">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[18px]">bolt</span>
              <span class="font-label-md text-label-md font-semibold text-on-surface">Compute Engine</span>
            </div>
            <span class="font-label-sm text-label-sm px-1.5 py-0.2 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">Input Ensembling</span>
          </div>
          <p class="font-label-sm text-label-sm text-on-surface-variant mt-1.5">Throughput: <strong>1,000 runs/hr</strong> via input-stage ensembling</p>
        </div>
      </div>
    </aside>
  `;

  // Attach nav item click active state handling
  container.querySelectorAll('.nav-item-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      container.querySelectorAll('.nav-item-link').forEach(l => {
        l.className = 'nav-item-link flex items-center justify-between px-space-md py-2.5 transition-all rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface';
        const tag = l.querySelector('span:last-child');
        if (tag) tag.className = 'font-label-sm text-[9px] px-1.5 py-0.5 rounded bg-surface-container text-outline uppercase font-bold';
      });
      link.className = 'nav-item-link flex items-center justify-between px-space-md py-2.5 transition-all rounded-xl font-label-lg text-label-lg bg-primary-container text-on-primary-container font-semibold shadow-[0_2px_8px_rgba(0,123,185,0.2)]';
      const activeTag = link.querySelector('span:last-child');
      if (activeTag) activeTag.className = 'font-label-sm text-[9px] px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed uppercase font-bold';
    });
  });
}
