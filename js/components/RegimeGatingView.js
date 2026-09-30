/**
 * Synapse SIH 2026 - Regime-Aware Mixture of Experts (MoE) & Multi-Type Bust Analytics View
 * Supports: Tropical Cyclone, Mountain Snow/Freeze, Heavy Rain Squalls, Extreme Heatwave, Severe Thunderstorms, Marine Inversion
 */
import { REGIME_BUST_TYPES, BUST_LOCATIONS } from '../data/regimeBustData.js';

export function renderRegimeGatingView(container) {
  if (!container) return;

  let activeFilter = 'all';
  let selectedBustId = 'bust-cyclone-bay'; // Default selected

  const renderContent = () => {
    const filteredBusts = activeFilter === 'all'
      ? BUST_LOCATIONS
      : BUST_LOCATIONS.filter(b => b.type === activeFilter);

    // Find active selected bust object
    const activeBust = BUST_LOCATIONS.find(b => b.id === selectedBustId) || BUST_LOCATIONS[0];

    container.innerHTML = `
      <div class="flex flex-col gap-space-lg w-full animate-fadeIn">
        
        <!-- 1. Top Regime Gating MoE Header Banner -->
        <div class="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border-t-4 border-primary">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            <div class="flex items-start gap-space-md">
              <div class="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-md">
                <span class="material-symbols-outlined text-[28px]">hub</span>
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h2 class="font-headline-md text-headline-md text-on-surface font-bold">Regime-Aware Mixture of Experts (MoE) Gating</h2>
                  <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold uppercase">Stage 4 Architecture</span>
                  <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-bold uppercase">Multi-Type Bust Routing</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-4xl">
                  Weather forecast busts stem from distinct meteorological physics (snow/freezing level shifts, extreme rain CAPE bursts, tropical cyclogenesis, heatwaves, marine fog). The Stage 4 gating network dynamically routes inputs to specialized neural experts.
                </p>
              </div>
            </div>

            <!-- MoE Gating Metrics -->
            <div class="flex items-center gap-space-sm shrink-0 bg-surface-container-low p-space-sm rounded-xl border border-outline-variant/30">
              <div class="px-3 py-1 text-center border-r border-outline-variant/30">
                <span class="font-label-sm text-[10px] uppercase text-outline block font-bold">Expert Networks</span>
                <span class="font-headline-sm text-headline-sm text-primary font-bold">6 Specialized</span>
              </div>
              <div class="px-3 py-1 text-center border-r border-outline-variant/30">
                <span class="font-label-sm text-[10px] uppercase text-outline block font-bold">Gating Latency</span>
                <span class="font-headline-sm text-headline-sm text-secondary font-bold">18 ms</span>
              </div>
              <div class="px-3 py-1 text-center">
                <span class="font-label-sm text-[10px] uppercase text-outline block font-bold">Active Hotspots</span>
                <span class="font-headline-sm text-headline-sm text-error font-bold">6 Monitored</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Interactive Bust Type Filter Pills -->
        <div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-wrap items-center gap-2">
          <span class="font-label-sm text-[11px] font-bold text-outline uppercase tracking-wider mr-2">Filter Bust Types:</span>
          ${REGIME_BUST_TYPES.map(filter => `
            <button data-type="${filter.id}" class="regime-filter-btn px-3 py-1.5 rounded-full font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1.5 ${activeFilter === filter.id
        ? 'bg-primary text-on-primary shadow-sm ring-2 ring-primary ring-offset-1'
        : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
      }" type="button">
              <span>${filter.label}</span>
            </button>
          `).join('')}
        </div>

        <!-- 3. MAIN INTERACTIVE MAP & DEEP-DIVE ANALYTICS GRID -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          
          <!-- Left Column: Interactive Sub-continental Multi-Type Bust Map (Col 1-6) -->
          <div class="lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-space-sm mb-space-sm border-b border-outline-variant/20">
                <div>
                  <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Multi-Type Bust Surveillance Map</h3>
                  <span class="font-label-sm text-label-sm text-outline">Click any bust pin to inspect complete physical &amp; model analytics</span>
                </div>
                <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-primary font-bold">Interactive SVG</span>
              </div>

              <!-- SVG Map Canvas with Multi-Type Color-Coded Pins -->
              <div class="relative w-full aspect-[4/3] bg-[#e8f1f7] rounded-xl overflow-hidden border border-outline-variant/30 mb-space-md">
                <svg class="w-full h-full select-none" viewBox="0 0 600 520">
                  <defs>
                    <pattern id="gatingGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#dae2fd" stroke-width="0.75" stroke-dasharray="2 2"></path>
                    </pattern>
                  </defs>

                  <!-- Water Background & Grid -->
                  <rect width="600" height="520" fill="#e8f1f7"></rect>
                  <rect width="600" height="520" fill="url(#gatingGrid)"></rect>

                  <!-- Ocean Annotations -->
                  <text x="70" y="380" class="fill-outline/50 font-label-md text-[11px] font-bold tracking-widest uppercase">Arabian Sea</text>
                  <text x="440" y="380" class="fill-outline/50 font-label-md text-[11px] font-bold tracking-widest uppercase">Bay of Bengal</text>
                  <text x="240" y="525" class="fill-outline/50 font-label-md text-[11px] font-bold tracking-widest uppercase">Indian Ocean</text>

                  <!-- High-Precision Geographically Accurate Map of India (Official Survey Alignment) -->
                  <g id="regime-india-landmass-group">
                    <!-- India Mainland -->
                    <path id="regime-india-mainland" d="M 280,24 C 292,22 308,26 320,38 C 328,46 335,62 334,78 C 333,88 325,98 324,110 C 328,120 345,130 365,140 C 385,150 405,160 425,170 C 438,175 448,182 458,188 C 460,184 462,170 468,170 C 474,170 476,184 480,188 C 488,188 500,186 512,184 C 520,178 532,158 548,152 C 560,148 574,158 572,172 C 570,184 558,198 548,210 C 542,222 538,236 532,252 C 528,264 524,282 516,294 C 510,300 504,298 502,286 C 498,272 492,260 484,260 C 476,260 472,270 466,276 C 472,255 484,250 494,244 C 496,236 478,232 466,234 C 454,242 444,262 438,284 C 435,298 428,312 422,320 C 412,332 396,352 380,374 C 370,388 358,408 346,430 C 336,446 322,468 310,488 C 304,500 296,508 290,508 C 284,508 280,500 276,482 C 270,462 264,432 256,396 C 250,364 242,330 232,298 C 225,272 218,248 210,230 C 212,222 214,212 204,210 C 192,210 172,212 155,222 C 142,232 135,248 144,258 C 156,266 178,266 190,256 C 196,248 200,240 204,236 C 182,232 162,230 146,235 C 134,238 126,232 132,220 C 118,222 106,212 108,200 C 112,188 132,182 152,185 C 164,188 174,180 180,170 C 188,155 194,140 204,122 C 214,108 226,92 236,75 C 244,62 250,50 260,40 C 266,32 274,26 280,24 Z" fill="#ffffff" stroke="#bfc7d2" stroke-width="1.6" stroke-linejoin="round"></path>
                    
                    <!-- Andaman and Nicobar Islands Archipelago -->
                    <path id="regime-andaman-islands" d="M 495,392 C 498,388 501,396 499,414 C 497,424 494,435 496,444 C 498,450 494,453 492,446 C 490,436 493,414 495,392 Z M 493,458 C 496,458 496,464 493,464 C 490,464 490,458 493,458 Z M 500,476 C 503,476 503,482 500,482 C 497,482 497,476 500,476 Z M 504,488 C 507,488 507,494 504,494 C 501,494 501,488 504,488 Z M 508,502 C 512,499 515,508 512,516 C 509,519 506,510 508,502 Z" fill="#ffffff" stroke="#bfc7d2" stroke-width="1.2"></path>
                    
                    <!-- Lakshadweep Islands Archipelago -->
                    <path id="regime-lakshadweep-islands" d="M 212,426 C 215,426 215,432 212,432 C 209,432 209,426 212,426 Z M 208,444 C 211,444 211,450 208,450 C 205,450 205,444 208,444 Z M 214,462 C 217,462 217,468 214,468 C 211,468 211,462 214,462 Z" fill="#ffffff" stroke="#bfc7d2" stroke-width="1.2"></path>
                  </g>
                  
                  <!-- Sri Lanka -->
                  <path d="M 314,488 C 322,482 328,495 325,508 C 320,514 313,506 314,488 Z" fill="#ffffff" stroke="#bfc7d2" stroke-width="1.2"></path>

                  <!-- State & Synoptic Boundary Lines -->
                  <path d="M 280,24 Q 288,65 330,95" fill="none" stroke="#dae2fd" stroke-width="1"></path>
                  <path d="M 204,122 Q 280,140 425,170" fill="none" stroke="#dae2fd" stroke-width="1"></path>
                  <path d="M 180,170 Q 250,185 365,220" fill="none" stroke="#dae2fd" stroke-width="1"></path>
                  <path d="M 210,230 Q 290,245 422,320" fill="none" stroke="#dae2fd" stroke-width="1"></path>
                  <path d="M 232,298 Q 285,320 380,374" fill="none" stroke="#dae2fd" stroke-width="1"></path>
                  <path d="M 256,396 Q 285,420 322,468" fill="none" stroke="#dae2fd" stroke-width="1"></path>
                  <path d="M 458,188 Q 480,215 512,240" fill="none" stroke="#dae2fd" stroke-width="1"></path>

                  <!-- Render Filtered Bust Pins -->
                  ${filteredBusts.map(bust => {
        const isSelected = bust.id === selectedBustId;
        return `
                      <g class="cursor-pointer bust-map-pin transition-transform" data-bust-id="${bust.id}" transform="translate(${bust.pinX}, ${bust.pinY})">
                        <!-- Pulsing Alert Ring for Selected Pin -->
                        ${isSelected ? `<circle cx="0" cy="0" r="14" fill="${bust.color}" fill-opacity="0.3" class="animate-ping"></circle>` : ''}
                        
                        <!-- Outer Glow Circle -->
                        <circle cx="0" cy="0" r="${isSelected ? 8 : 6}" fill="${bust.color}" stroke="#ffffff" stroke-width="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"></circle>
                        
                        <!-- Callout Tag -->
                        <rect x="10" y="-16" width="${bust.name.length * 5.8 + 20}" height="22" rx="4" fill="${isSelected ? '#0f172a' : '#ffffff'}" stroke="${isSelected ? bust.color : '#bfc7d2'}" stroke-width="${isSelected ? 1.5 : 0.8}" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"></rect>
                        <text x="16" y="-2" class="${isSelected ? 'fill-[#ffffff]' : 'fill-on-surface'} font-headline-sm text-[9px] font-bold">${bust.name}</text>
                      </g>
                    `;
      }).join('')}
                </svg>

                <!-- Map Bottom-Left Help Tip -->
                <div class="absolute bottom-2 left-2 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-on-surface shadow-xs border border-outline-variant/30 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-primary text-[14px]">touch_app</span>
                  <span>Click pin to view full physical &amp; model analytics</span>
                </div>
              </div>

              <!-- Color Legend of Bust Types -->
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5 font-label-sm text-[10px] p-space-sm bg-surface-container-low rounded-xl border border-outline-variant/20">
                <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#E11D48]"></span><span>🌀 Cyclone / Pressure</span></div>
                <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#38BDF8]"></span><span>❄️ Snow / Freezing</span></div>
                <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></span><span>🌧️ Extreme Rain / Flood</span></div>
                <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span><span>☀️ Heatwave / Arid</span></div>
                <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#9333EA]"></span><span>⚡ Severe Convection</span></div>
                <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span><span>🌊 Marine Inversion</span></div>
              </div>
            </div>
          </div>

          <!-- Right Column: COMPLETE DEEP-DIVE ANALYTICS INSPECTOR (Col 7-12) -->
          <div class="lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <!-- Inspector Header -->
              <div class="flex items-center justify-between pb-space-xs mb-space-sm border-b border-outline-variant/20">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full" style="background-color: ${activeBust.color};"></span>
                    <span class="font-label-sm text-label-sm uppercase text-outline font-bold tracking-wider">${activeBust.typeName}</span>
                  </div>
                  <h3 class="font-headline-md text-headline-md text-on-surface font-bold mt-0.5">${activeBust.name}</h3>
                  <span class="font-label-sm text-[10px] text-outline font-mono">${activeBust.location}</span>
                </div>
                <div class="text-right">
                  <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full ${activeBust.severityBadge} font-bold block mb-1">${activeBust.severity}</span>
                  <span class="font-headline-sm text-headline-sm font-extrabold" style="color: ${activeBust.color};">P(Bust): ${activeBust.pBust}</span>
                </div>
              </div>

              <!-- Physical Error Magnitude Callout Box -->
              <div class="p-space-sm bg-surface-container-low rounded-xl border border-outline-variant/20 mb-space-md">
                <div class="flex items-center justify-between">
                  <span class="font-label-sm text-[10px] uppercase font-bold text-outline">Observed Error Magnitude:</span>
                  <span class="font-label-sm text-[10px] font-bold text-primary">Stage 4 Verified</span>
                </div>
                <p class="font-body-sm text-[13px] font-bold text-on-surface mt-0.5">${activeBust.errorMagnitude}</p>
              </div>

              <!-- Mixture of Experts Softmax Weight Allocation Breakdown -->
              <div class="mb-space-md">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="font-label-sm text-label-sm font-bold text-on-surface flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-primary text-[18px]">account_tree</span>
                    MoE Gating Softmax Weights (αₖ)
                  </span>
                  <span class="font-label-sm text-[10px] px-2 py-0.2 rounded bg-primary text-on-primary font-bold">Top: ${activeBust.expertWeight}</span>
                </div>
                <div class="space-y-2 font-label-sm text-[11px]">
                  ${activeBust.expertDistribution.map(exp => `
                    <div>
                      <div class="flex justify-between text-on-surface mb-0.5">
                        <span>${exp.name}</span>
                        <strong class="font-bold">${exp.weight}%</strong>
                      </div>
                      <div class="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                        <div class="h-2 rounded-full ${exp.color} transition-all duration-500" style="width: ${exp.weight}%;"></div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Physical Root Cause Explanation -->
              <div class="p-space-sm bg-surface-container-low rounded-xl border border-primary/20 mb-space-md">
                <span class="font-label-sm text-[10px] uppercase font-bold text-primary block mb-0.5">Atmospheric Physics Root Cause:</span>
                <p class="font-body-sm text-body-sm text-on-surface leading-relaxed">${activeBust.rootCause}</p>
              </div>

              <!-- Multi-Model Baseline Divergence Cards -->
              <div class="mb-space-md">
                <span class="font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider block mb-2">Model Baseline Comparison:</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-label-sm">
                  <div class="p-2 bg-surface-container rounded-lg">
                    <strong class="text-on-surface block font-bold">NCMRWF NCUM 12km:</strong>
                    <span class="text-error font-medium">${activeBust.modelComparison.ncmrwf}</span>
                  </div>
                  <div class="p-2 bg-surface-container rounded-lg">
                    <strong class="text-on-surface block font-bold">DeepMind GraphCast:</strong>
                    <span class="text-tertiary font-medium">${activeBust.modelComparison.graphcast}</span>
                  </div>
                  <div class="p-2 bg-surface-container rounded-lg">
                    <strong class="text-on-surface block font-bold">DeepMind GenCast (50-M):</strong>
                    <span class="text-on-surface-variant font-medium">${activeBust.modelComparison.gencast}</span>
                  </div>
                  <div class="p-2 bg-surface-container-low border border-secondary/40 rounded-lg">
                    <strong class="text-secondary block font-bold">Synapse AI MoE Fix:</strong>
                    <span class="text-on-surface font-semibold">${activeBust.modelComparison.synapseCorrection}</span>
                  </div>
                </div>
              </div>

              <!-- Actionable Recommendation & Ground Truth Verification -->
              <div class="p-space-sm bg-surface-container-lowest rounded-xl border border-outline-variant/30 space-y-1.5 font-label-sm text-[11px]">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary text-[16px]">sensors</span>
                  <span>Ground Truth Verification: <strong>${activeBust.verificationFix}</strong></span>
                </div>
                <div class="flex items-start gap-2 pt-1 border-t border-outline-variant/20">
                  <span class="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">policy</span>
                  <span>Actionable Recommendation: <strong class="text-on-surface">${activeBust.actionableRecommendation}</strong></span>
                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- 4. ALL BUST EVENTS SUMMARY COMPARISON MATRIX TABLE -->
        <div class="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30">
          <div class="flex items-center justify-between pb-space-sm mb-space-md border-b border-outline-variant/20">
            <div>
              <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Multi-Type Meteorological Bust Event Roster</h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Comprehensive real-time monitoring across all 6 distinct atmospheric regimes</p>
            </div>
            <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold">6 Hotspots Active</span>
          </div>

          <div class="w-full overflow-x-auto">
            <table class="w-full text-left font-body-sm text-body-sm">
              <thead>
                <tr class="text-outline uppercase font-label-sm text-[10px] tracking-wider border-b border-outline-variant/30">
                  <th class="py-2.5 px-3">Bust Phenomenon Type</th>
                  <th class="py-2.5 px-3">Target Region</th>
                  <th class="py-2.5 px-3">Primary MoE Expert</th>
                  <th class="py-2.5 px-3 text-center">Gating Weight (α)</th>
                  <th class="py-2.5 px-3 text-right">P(Bust)</th>
                  <th class="py-2.5 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-outline-variant/20">
                ${BUST_LOCATIONS.map(bust => {
        const isSelected = bust.id === selectedBustId;
        return `
                    <tr class="hover:bg-surface-container-low/60 transition-colors cursor-pointer ${isSelected ? 'bg-surface-container-low/80 font-semibold' : ''}" data-bust-id="${bust.id}">
                      <td class="py-3 px-3 font-semibold text-on-surface flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${bust.color};"></span>
                        <span>${bust.typeName}</span>
                      </td>
                      <td class="py-3 px-3 text-on-surface-variant">${bust.name}</td>
                      <td class="py-3 px-3 text-primary font-medium">${bust.primaryExpert}</td>
                      <td class="py-3 px-3 text-center"><span class="px-2 py-0.5 rounded bg-surface-container text-on-surface font-mono text-[11px] font-bold">${bust.expertWeight}</span></td>
                      <td class="py-3 px-3 text-right font-bold" style="color: ${bust.color};">${bust.pBust}</td>
                      <td class="py-3 px-3 text-center">
                        <button class="select-bust-btn text-primary hover:text-primary-container font-label-sm text-label-sm font-semibold" data-bust-id="${bust.id}" type="button">Inspect Analytics</button>
                      </td>
                    </tr>
                  `;
      }).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;

    // Attach Filter Button Click Listeners
    container.querySelectorAll('.regime-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.type;
        renderContent();
      });
    });

    // Attach Pin & Table Row Click Listeners to Select Active Bust
    container.querySelectorAll('.bust-map-pin, .select-bust-btn, tr[data-bust-id]').forEach(elem => {
      elem.addEventListener('click', (e) => {
        const id = elem.dataset.bustId;
        if (id) {
          selectedBustId = id;
          renderContent();
        }
      });
    });
  };

  renderContent();
}
