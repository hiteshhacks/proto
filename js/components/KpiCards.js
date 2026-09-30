/**
 * Synapse SIH 2026 - Top 4 KPI Summary Cards Component
 */
import { INITIAL_METRICS } from '../data/mockData.js';

export function renderKpiCards(container) {
  if (!container) return;
  const m = INITIAL_METRICS;

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-lg mb-space-lg">
      <!-- Card 1: Forecast Reliability Built-In -->
      <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between border-t-2 border-primary">
        <div class="flex items-center justify-between">
          <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Forecast Reliability Index</span>
          <span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-primary font-bold">Continuous Score</span>
        </div>
        <div class="flex items-baseline justify-between mt-space-md">
          <div>
            <span class="font-display-lg text-display-lg text-on-surface font-bold">${m.basinConfidence.value}</span>
            <div class="flex items-center gap-1 mt-1">
              <span class="material-symbols-outlined text-error text-[16px]">arrow_downward</span>
              <span class="font-label-sm text-label-sm text-error font-semibold">${m.basinConfidence.delta}</span>
              <span class="font-label-sm text-label-sm text-outline">vs D-1 Cycle</span>
            </div>
          </div>
          <!-- Sparkline -->
          <div class="w-20 h-10">
            <svg class="w-full h-full" viewBox="0 0 80 40">
              <path d="M0,18 Q15,10 30,22 T60,14 T80,26" fill="none" stroke="#007bb9" stroke-linecap="round" stroke-width="2.5"></path>
              <circle cx="80" cy="26" fill="#ba1a1a" r="3"></circle>
            </svg>
          </div>
        </div>
        <div class="mt-space-md pt-space-xs flex items-center justify-between text-outline font-label-sm text-label-sm">
          <span>${m.basinConfidence.subtext}</span>
          <span class="text-secondary font-semibold">${m.basinConfidence.syncTime}</span>
        </div>
      </div>

      <!-- Card 2: Dual-Model 'Now' vs 'Next' Highest-Risk Sector -->
      <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between border-t-2 border-error">
        <div class="flex items-center justify-between">
          <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Dual-Model Bust Sector</span>
          <span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-bold">${m.highestRiskSector.alertLevel}</span>
        </div>
        <div class="mt-space-md">
          <div class="font-headline-md text-headline-md text-on-surface truncate font-bold">${m.highestRiskSector.name}</div>
          <div class="flex items-center gap-space-md mt-1">
            <span class="font-headline-sm text-headline-sm text-error font-bold">${m.highestRiskSector.bustProb} P(Bust)</span>
            <span class="font-label-sm text-label-sm text-outline font-medium">• ${m.highestRiskSector.leadHorizon}</span>
          </div>
        </div>
        <div class="mt-space-md pt-space-xs flex items-center justify-between font-label-sm text-label-sm">
          <span class="text-on-surface-variant">${m.highestRiskSector.driver}</span>
          <span class="text-error font-semibold">${m.highestRiskSector.trackSpread}</span>
        </div>
      </div>

      <!-- Card 3: Regime-Aware Mixture of Experts -->
      <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between border-t-2 border-secondary">
        <div class="flex items-center justify-between">
          <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Regime-Aware Fusion (MoE)</span>
          <span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">${m.errorRegimes.monitored}</span>
        </div>
        <div class="mt-space-md">
          <div class="font-display-lg text-display-lg text-on-surface font-bold">${m.errorRegimes.title}</div>
          <div class="flex flex-wrap gap-1 mt-1.5">
            ${m.errorRegimes.tags.map(tag => `<span class="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-medium">${tag}</span>`).join('')}
          </div>
        </div>
        <div class="mt-space-md pt-space-xs flex items-center justify-between font-label-sm text-label-sm text-outline">
          <span>${m.errorRegimes.subtext}</span>
          <span class="text-primary font-semibold">${m.errorRegimes.subDivisionsCount}</span>
        </div>
      </div>

      <!-- Card 4: Continuous Error Cliff & Fallback -->
      <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between border-t-2 border-tertiary">
        <div class="flex items-center justify-between">
          <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Predictability Cliff Horizon</span>
          <span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold">${m.predictabilityCliff.leadWindow}</span>
        </div>
        <div class="flex items-baseline justify-between mt-space-md">
          <div>
            <span class="font-display-lg text-display-lg text-on-surface font-bold">${m.predictabilityCliff.cliffDay} <span class="font-headline-sm text-headline-sm text-outline">${m.predictabilityCliff.leadTime}</span></span>
            <div class="flex items-center gap-1 mt-1">
              <span class="material-symbols-outlined text-error text-[16px]">troubleshoot</span>
              <span class="font-label-sm text-label-sm text-error font-semibold">${m.predictabilityCliff.drop}</span>
              <span class="font-label-sm text-label-sm text-outline">${m.predictabilityCliff.horizon}</span>
            </div>
          </div>
          <div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
            <span class="material-symbols-outlined text-[20px]">route</span>
          </div>
        </div>
        <div class="mt-space-md pt-space-xs flex items-center justify-between font-label-sm text-label-sm text-outline">
          <span>${m.predictabilityCliff.note}</span>
          <span class="text-tertiary font-bold">${m.predictabilityCliff.badge}</span>
        </div>
      </div>
    </div>
  `;
}
