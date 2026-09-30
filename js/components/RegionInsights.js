/**
 * Synapse SIH 2026 - Continuous Risk Indicators & Deep-Dive Diagnostics Panel
 */
import { appState } from '../state.js';

export function renderRegionInsights(container) {
  if (!container) return;

  const renderContent = () => {
    const sector = appState.getSelectedSector();
    const radius = 38;
    const circumference = 2 * Math.PI * radius; // ~238.7
    const strokeDash = (circumference * sector.confidence) / 100;
    const isHighRisk = sector.confidence < 50;
    const isModerateRisk = sector.confidence >= 50 && sector.confidence < 75;

    container.innerHTML = `
      <aside class="flex flex-col gap-space-md w-full animate-fadeIn" id="region-insights-container">
        
        <!-- 1. Main Continuous Risk Indicators Header Card -->
        <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border-t-4 ${isHighRisk ? 'border-error' : (isModerateRisk ? 'border-tertiary' : 'border-secondary')}">
          
          <!-- Top Panel Header -->
          <div class="flex items-center justify-between pb-space-xs mb-space-sm border-b border-outline-variant/20">
            <div>
              <div class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-primary text-[18px]">analytics</span>
                <span class="font-label-sm text-label-sm uppercase text-outline tracking-wider font-bold">Continuous Risk Indicators</span>
              </div>
              <h2 class="font-headline-md text-headline-md text-on-surface font-extrabold mt-0.5" id="insights-sector-name">${sector.name}</h2>
              <span class="font-label-sm text-[10px] text-outline font-mono flex items-center gap-1">
                <span class="material-symbols-outlined text-[13px] text-primary">location_on</span>
                ${sector.dominantDriver}
              </span>
            </div>
            <div class="text-right">
              <span class="font-label-sm text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase block mb-1 ${
                isHighRisk 
                  ? 'bg-error-container text-on-error-container' 
                  : (isModerateRisk ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-secondary-container text-on-secondary-container')
              }">
                ${sector.radarType}
              </span>
              <span class="font-label-sm text-[11px] font-bold ${sector.bustProbColor}">${sector.riskLevel}</span>
            </div>
          </div>

          <!-- 2. Core Quantitative Metrics Block -->
          <div class="grid grid-cols-2 gap-space-md items-center py-space-sm bg-surface-container-low rounded-xl px-space-md mb-space-md border border-outline-variant/20">
            <!-- Circular Arc Trust Score -->
            <div class="flex flex-col items-center justify-center">
              <div class="relative w-24 h-24 flex items-center justify-center">
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="${radius}" fill="transparent" stroke="#dae2fd" stroke-width="7"></circle>
                  <circle cx="50" cy="50" r="${radius}" fill="transparent" stroke="${isHighRisk ? '#ba1a1a' : (isModerateRisk ? '#825100' : '#006c49')}" stroke-width="7" stroke-dasharray="${strokeDash} ${circumference}" stroke-linecap="round"></circle>
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <span class="font-headline-md text-headline-md font-extrabold text-on-surface">${sector.confidence}%</span>
                  <span class="font-label-sm text-[8.5px] text-outline font-bold uppercase">Trust Index</span>
                </div>
              </div>
              <span class="font-label-sm text-[10px] ${sector.bustProbColor} font-bold mt-1 text-center">${sector.scores ? `D+4 Reliability: ${sector.scores.d4}` : ''}</span>
            </div>

            <!-- Probability & Outlier Risk Readout -->
            <div class="flex flex-col justify-center space-y-1">
              <span class="font-label-sm text-[10px] uppercase text-outline font-bold">Continuous P(Bust)</span>
              <div class="flex items-baseline gap-1.5">
                <span class="font-display-lg text-display-lg ${sector.bustProbColor} font-extrabold leading-none">${sector.bustProb}</span>
                <span class="font-label-sm text-label-sm ${sector.bustProbColor} font-bold">${sector.probDelta}</span>
              </div>
              <div class="font-label-sm text-[11px] text-on-surface-variant pt-1 leading-tight space-y-0.5 border-t border-outline-variant/30">
                <div class="flex justify-between">
                  <span class="text-outline">P(E &gt; P90) Outlier:</span>
                  <span class="font-bold text-error">${sector.pE90}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-outline">P(E &gt; P50) Median:</span>
                  <span class="font-bold text-on-surface">${sector.pE50}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-outline">Physical Spread:</span>
                  <span class="font-bold text-on-surface">${sector.spreadSigma || '1.8 m/s'}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Physical Error Magnitude Callout Box -->
          <div class="grid grid-cols-2 gap-2 mb-space-md text-[11px] font-label-sm">
            <div class="p-2.5 bg-surface-container rounded-lg border border-outline-variant/20">
              <span class="text-outline block text-[9px] uppercase font-bold">Expected Error Rate:</span>
              <span class="font-headline-sm text-on-surface font-extrabold text-[13px]">${sector.expectedError}</span>
            </div>
            <div class="p-2.5 bg-surface-container rounded-lg border border-outline-variant/20">
              <span class="text-outline block text-[9px] uppercase font-bold">Track Dispersion:</span>
              <span class="font-headline-sm text-error font-extrabold text-[13px]">${sector.trackError}</span>
            </div>
          </div>

          <!-- 4. Dual-Model Behaviour Split ('Now' vs 'Next') -->
          <div class="mb-space-md p-space-sm bg-surface-container rounded-xl border border-primary/25">
            <div class="flex items-center justify-between mb-1.5">
              <span class="font-label-sm text-label-sm font-bold text-primary flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[16px]">model_training</span>
                Dual-Model Architecture Split
              </span>
              <span class="font-label-sm text-[9px] px-1.5 py-0.2 rounded bg-primary text-on-primary font-bold uppercase">Stage 3 Learning</span>
            </div>
            <div class="space-y-1.5 font-body-sm text-[11px] text-on-surface leading-snug">
              <div class="p-2 bg-surface-container-lowest rounded-lg border border-outline-variant/20">
                <strong class="text-primary block font-bold mb-0.5">1. Present 'Now' State (Observed Assimilation):</strong>
                <span>${sector.dualModelSplit.nowState}</span>
              </div>
              <div class="p-2 bg-surface-container-lowest rounded-lg border border-error/20">
                <strong class="text-error block font-bold mb-0.5">2. Evolutionary 'Next' Model Projection:</strong>
                <span>${sector.dualModelSplit.nextEvolution}</span>
              </div>
            </div>
          </div>

          <!-- 5. Physical Root Cause & Atmospheric Diagnosis -->
          <div class="mb-space-md p-space-sm bg-surface-container-low rounded-xl border border-outline-variant/30">
            <span class="font-label-sm text-[10px] uppercase font-bold text-primary flex items-center gap-1 mb-1">
              <span class="material-symbols-outlined text-[14px]">psychology</span>
              Physical Diagnosis &amp; Root Cause:
            </span>
            <p class="font-body-sm text-[12px] text-on-surface leading-relaxed">
              ${sector.diagnosis}
            </p>
          </div>

          <!-- 6. Coupled Atmospheric Feature Importance Weights -->
          <div class="mb-space-md">
            <div class="flex items-center justify-between mb-2">
              <span class="font-headline-sm text-headline-sm text-on-surface font-bold flex items-center gap-1">
                <span class="material-symbols-outlined text-secondary text-[16px]">tune</span>
                Coupled Atmospheric Weights
              </span>
              <span class="font-label-sm text-[10px] text-secondary font-bold">Unified Net</span>
            </div>
            <div class="space-y-2 font-label-sm text-[11px]">
              ${sector.coupledVariables.map(item => `
                <div>
                  <div class="flex justify-between text-on-surface mb-0.5">
                    <span>${item.name}</span>
                    <strong class="font-bold ${item.textColor}">${item.value}%</strong>
                  </div>
                  <div class="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <div class="h-2 rounded-full ${item.color} transition-all duration-500" style="width: ${item.value}%;"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 7. MoE Regime Gating & Trajectory Fallback Fix -->
          <div class="mb-space-md p-space-sm bg-surface-container rounded-xl border border-secondary/30">
            <div class="flex items-center justify-between mb-1">
              <span class="font-label-sm text-[10px] uppercase font-bold text-secondary flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">hub</span>
                Stage 4 MoE Routing
              </span>
              <span class="font-label-sm text-[9px] px-1.5 py-0.2 rounded bg-secondary text-on-secondary font-bold">Active Fix</span>
            </div>
            <p class="font-body-sm text-[11px] font-semibold text-on-surface">${sector.regimeGating ? sector.regimeGating.activeExpert : 'Stage 4 Expert Routing Active'}</p>
            <span class="font-label-sm text-[10px] text-secondary block mt-0.5">${sector.regimeGating ? sector.regimeGating.fallbackStatus : 'Trajectory Verification Ready'}</span>
          </div>

          <!-- 8. Multi-Line Lead-Time Uncertainty Envelope Fan (D+1 to D+10) -->
          <div class="mb-space-md">
            <div class="flex items-center justify-between mb-1">
              <span class="font-label-sm text-[10px] uppercase font-bold text-outline">Lead-Time Error Field (5th–95th %ile)</span>
              <span class="font-label-sm text-[10px] text-primary font-bold">D+4 Cliff Horizon</span>
            </div>
            <div class="w-full h-24 bg-surface rounded-lg p-2 relative border border-outline-variant/30">
              <svg class="w-full h-full select-none" viewBox="0 0 280 80">
                <!-- Shaded Uncertainty Envelope (Pastel Coral) -->
                <path d="M 0,10 L 30,12 L 60,18 L 90,28 L 120,45 L 150,58 L 180,68 L 210,72 L 240,75 L 280,78 L 280,50 L 240,40 L 210,32 L 180,25 L 150,18 L 120,12 L 90,8 L 60,6 L 30,5 L 0,5 Z" fill="#FECDD3" opacity="0.6"></path>
                <!-- Median Path -->
                <path d="M 0,8 Q 90,14 120,30 T 210,55 T 280,68" fill="none" stroke="#ba1a1a" stroke-width="2"></path>
                <!-- D+4 Vertical Marker -->
                <line x1="120" y1="0" x2="120" y2="80" stroke="#006194" stroke-width="1.5" stroke-dasharray="3 3"></line>
                <text x="124" y="75" fill="#006194" class="font-label-sm text-[9px] font-bold">D+4 Cliff Trigger</text>
              </svg>
            </div>
          </div>

          <!-- 9. Blockchain-Backed Provenance Certificate -->
          <div class="mb-space-md p-space-sm bg-surface-container-low rounded-xl border border-outline-variant/30">
            <div class="flex items-center justify-between mb-1">
              <span class="font-label-sm text-[11px] font-bold text-on-surface flex items-center gap-1">
                <span class="material-symbols-outlined text-primary text-[15px]">verified</span>
                Immutable Blockchain Provenance
              </span>
              <span class="font-label-sm text-[9px] px-1.5 py-0.2 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">SHA-256</span>
            </div>
            <div class="font-mono text-[9px] text-outline break-all bg-surface-container-lowest p-1.5 rounded border border-outline-variant/20">
              ${sector.blockchainCertificate.sha256Hash}
            </div>
            <div class="flex justify-between items-center mt-1 text-[10px] text-on-surface-variant font-label-sm">
              <span>Cert ID: <strong>${sector.blockchainCertificate.certificateId}</strong></span>
              <span class="text-secondary font-semibold">${sector.blockchainCertificate.status}</span>
            </div>
          </div>

          <!-- 10. Historical Meteorological Analogues & Event Matches -->
          <div>
            <span class="font-label-sm text-[10px] uppercase font-bold text-outline block mb-1.5">Historical Event Analogue Matches</span>
            <div class="grid grid-cols-1 gap-1.5">
              ${sector.historicalMatches.map(m => `
                <div class="p-2 rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/20">
                  <div>
                    <span class="font-label-sm text-[11px] font-bold text-on-surface block">${m.event}</span>
                    <span class="font-label-sm text-[10px] text-outline">${m.note}</span>
                  </div>
                  <span class="font-label-sm text-[9px] px-2 py-0.5 rounded ${m.tagColor} font-bold">${m.tag}</span>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      </aside>
    `;
  };

  renderContent();

  // Re-render when selected sector changes on pin click or table selection
  appState.subscribe('sectorChanged', () => {
    renderContent();
  });
}

