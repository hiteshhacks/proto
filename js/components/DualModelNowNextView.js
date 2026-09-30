/**
 * Synapse SIH 2026 - Dual-Model 'Now' vs 'Next' Dedicated View
 * Features:
 * 1. Dual-Model Architecture Status & Co-Training Diagnostics
 * 2. Side-by-Side Comparison:
 *    - Model 1: 'NOW' State Diagnostic Risk Map (T = 0h to +24h)
 *    - Model 2: 'NEXT' Evolutionary Projection Risk Map (T = +24h to +96h)
 * 3. Sub-Monitoring Micro-Telemetry Maps (Vorticity Shear, MSLP Deepening, Coastal SST & Moisture Flux)
 * 4. Dual-Model Feature Interaction & Trajectory Fallback Matrix
 */
import { appState } from '../state.js';

export function renderDualModelNowNextView(container) {
  if (!container) return;

  container.innerHTML = `
    <div class="flex flex-col gap-space-lg w-full animate-fadeIn">
      
      <!-- 1. Top Dual-Model Co-Training Synchronization Header Banner -->
      <div class="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border-t-4 border-primary">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div class="flex items-start gap-space-md">
            <div class="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-md">
              <span class="material-symbols-outlined text-[28px]">model_training</span>
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h2 class="font-headline-md text-headline-md text-on-surface font-bold">Dual-Model Behaviour Co-Training Engine</h2>
                <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold uppercase">Stage 3 Architecture</span>
                <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-bold uppercase">Co-Trained Synced</span>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-4xl">
                Splits the NWP forecasting problem into <strong>"Now"</strong> (Model 1: encodes cyclone's present vortex intensity, central pressure &amp; inner-core structure) versus <strong>"Next"</strong> (Model 2: projects spatio-temporal track evolution, intensity deepening &amp; bifurcation risk).
              </p>
            </div>
          </div>

          <!-- Quick Metrics Badges -->
          <div class="flex items-center gap-space-sm shrink-0 bg-surface-container-low p-space-sm rounded-xl border border-outline-variant/30">
            <div class="px-3 py-1 text-center border-r border-outline-variant/30">
              <span class="font-label-sm text-[10px] uppercase text-outline block font-bold">Ensemble Rate</span>
              <span class="font-headline-sm text-headline-sm text-primary font-bold">1,000/hr</span>
            </div>
            <div class="px-3 py-1 text-center border-r border-outline-variant/30">
              <span class="font-label-sm text-[10px] uppercase text-outline block font-bold">Loss Divergence</span>
              <span class="font-headline-sm text-headline-sm text-secondary font-bold">0.0142</span>
            </div>
            <div class="px-3 py-1 text-center">
              <span class="font-label-sm text-[10px] uppercase text-outline block font-bold">Bust Horizon</span>
              <span class="font-headline-sm text-headline-sm text-error font-bold">Day 4 (+96h)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. SIDE-BY-SIDE DUAL RISK COMPARISON MAPS -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
        
        <!-- MAP 1: Model 1 — 'NOW' State Diagnostic Risk Map (T = 0h to +24h) -->
        <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between pb-space-sm mb-space-sm border-b border-outline-variant/20">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-primary"></span>
                <div>
                  <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Model 1: 'NOW' State Diagnostic Map</h3>
                  <span class="font-label-sm text-label-sm text-outline font-medium">Present Vortex Structure (T = 0h to +24h)</span>
                </div>
              </div>
              <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded bg-surface-container text-primary font-bold">Observed + INSAT-3DR</span>
            </div>

            <!-- SVG Map 1 Canvas: Present Vortex Core -->
            <div class="relative w-full aspect-[4/3] bg-[#e8f1f7] rounded-xl overflow-hidden border border-outline-variant/30 mb-space-md">
              <svg class="w-full h-full select-none" viewBox="0 0 400 300">
                <defs>
                  <!-- Core Vortex Gradients -->
                  <radialGradient id="vortexCoreGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#9333EA" stop-opacity="0.9"></stop>
                    <stop offset="35%" stop-color="#DC2626" stop-opacity="0.85"></stop>
                    <stop offset="70%" stop-color="#F59E0B" stop-opacity="0.65"></stop>
                    <stop offset="100%" stop-color="#38BDF8" stop-opacity="0"></stop>
                  </radialGradient>
                </defs>

                <!-- Water Background & Grid -->
                <rect width="400" height="300" fill="#e8f1f7"></rect>
                <g stroke="#d4e3ed" stroke-width="0.75" stroke-dasharray="2 3">
                  <line x1="0" y1="75" x2="400" y2="75"></line>
                  <line x1="0" y1="150" x2="400" y2="150"></line>
                  <line x1="0" y1="225" x2="400" y2="225"></line>
                  <line x1="100" y1="0" x2="100" y2="300"></line>
                  <line x1="200" y1="0" x2="200" y2="300"></line>
                  <line x1="300" y1="0" x2="300" y2="300"></line>
                </g>

                <!-- Coastline -->
                <path d="M 0,0 L 140,0 L 120,80 L 110,140 L 90,210 L 40,280 L 0,300 Z" fill="#d9e5ec" stroke="#9bb6c7" stroke-width="1.5"></path>
                <path d="M 280,0 L 320,80 L 360,160 L 400,200 L 400,0 Z" fill="#d9e5ec" stroke="#9bb6c7" stroke-width="1.5"></path>

                <!-- Labels -->
                <text x="30" y="80" class="fill-[#708a99] font-label-md text-[10px] font-bold uppercase">Odisha Coast</text>
                <text x="18" y="190" class="fill-[#708a99] font-label-md text-[9px] font-bold uppercase">Andhra Coast</text>
                <text x="210" y="40" class="fill-[#708a99] font-label-md text-[10px] font-bold uppercase">Bay of Bengal</text>

                <!-- Present Vortex Core Blob -->
                <circle cx="210" cy="170" r="85" fill="url(#vortexCoreGrad)"></circle>
                
                <!-- Concentric Atmospheric Isobar Rings -->
                <circle cx="210" cy="170" r="30" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-dasharray="3 2" opacity="0.8"></circle>
                <circle cx="210" cy="170" r="55" fill="none" stroke="#ffffff" stroke-width="1" stroke-dasharray="3 2" opacity="0.6"></circle>
                <circle cx="210" cy="170" r="80" fill="none" stroke="#707881" stroke-width="0.8" opacity="0.5"></circle>

                <!-- Eye Center -->
                <circle cx="210" cy="170" r="5" fill="#ffffff" stroke="#9333EA" stroke-width="2"></circle>
                <circle cx="210" cy="170" r="1.5" fill="#131b2e"></circle>

                <!-- Inner Core Wind Vector Arrows -->
                <path d="M 210,120 Q 250,130 255,170" fill="none" stroke="#ffffff" stroke-width="1.5" marker-end="url(#arrow)"></path>
                <path d="M 255,170 Q 250,215 210,220" fill="none" stroke="#ffffff" stroke-width="1.5"></path>
                <path d="M 210,220 Q 165,210 165,170" fill="none" stroke="#ffffff" stroke-width="1.5"></path>
                <path d="M 165,170 Q 170,125 210,120" fill="none" stroke="#ffffff" stroke-width="1.5"></path>

                <!-- Callout Badge: Observed Center (T = 0h) -->
                <g transform="translate(210, 170)">
                  <rect x="14" y="-32" width="130" height="42" rx="6" fill="#ffffff" stroke="#bfc7d2" stroke-width="0.8" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"></rect>
                  <text x="22" y="-18" class="fill-on-surface font-headline-sm text-[10px] font-bold">Present Storm Core</text>
                  <text x="22" y="-5" class="fill-primary font-label-sm text-[9px] font-semibold">996 hPa • 83 kt Winds</text>
                  <text x="22" y="6" class="fill-secondary font-label-sm text-[8px] font-medium">Core Radius: 35 km</text>
                </g>
              </svg>
              
              <!-- Map 1 Bottom Badge -->
              <div class="absolute bottom-2 left-2 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-on-surface shadow-xs border border-outline-variant/30">
                Spatial Symmetry: <span class="text-secondary font-extrabold">94.2% Coherent</span>
              </div>
            </div>

            <!-- Model 1 Key Diagnostic Statistics -->
            <div class="grid grid-cols-2 gap-space-sm font-label-sm text-[11px]">
              <div class="p-2.5 bg-surface-container-low rounded-lg border border-outline-variant/20">
                <span class="text-outline uppercase text-[9px] block font-bold">Observed Intensity</span>
                <strong class="text-on-surface text-[13px]">83 kt (Severe Storm)</strong>
              </div>
              <div class="p-2.5 bg-surface-container-low rounded-lg border border-outline-variant/20">
                <span class="text-outline uppercase text-[9px] block font-bold">Central Pressure</span>
                <strong class="text-on-surface text-[13px]">996 hPa (-18 hPa Deficit)</strong>
              </div>
              <div class="p-2.5 bg-surface-container-low rounded-lg border border-outline-variant/20">
                <span class="text-outline uppercase text-[9px] block font-bold">Vorticity Density</span>
                <strong class="text-primary text-[13px]">1.84 × 10⁻⁴ s⁻¹</strong>
              </div>
              <div class="p-2.5 bg-surface-container-low rounded-lg border border-outline-variant/20">
                <span class="text-outline uppercase text-[9px] block font-bold">'Now' Model State</span>
                <strong class="text-secondary text-[13px]">Locked &amp; Verified</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- MAP 2: Model 2 — 'NEXT' Evolutionary Projection Risk Map (T = +24h to +96h) -->
        <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between pb-space-sm mb-space-sm border-b border-outline-variant/20">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-error"></span>
                <div>
                  <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Model 2: 'NEXT' Evolutionary Projection</h3>
                  <span class="font-label-sm text-label-sm text-outline font-medium">Trajectory &amp; Intensity Evolution (T = +24h to +96h)</span>
                </div>
              </div>
              <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded bg-error-container text-on-error-container font-bold">Bifurcation Risk 78%</span>
            </div>

            <!-- SVG Map 2 Canvas: Evolutionary Track & Landfall Cone -->
            <div class="relative w-full aspect-[4/3] bg-[#e8f1f7] rounded-xl overflow-hidden border border-outline-variant/30 mb-space-md">
              <svg class="w-full h-full select-none" viewBox="0 0 400 300">
                <defs>
                  <!-- Multi-Track Cone Gradient -->
                  <linearGradient id="evolutionConeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#FCD34D" stop-opacity="0.6"></stop>
                    <stop offset="50%" stop-color="#FB923C" stop-opacity="0.75"></stop>
                    <stop offset="100%" stop-color="#E11D48" stop-opacity="0.85"></stop>
                  </linearGradient>
                </defs>

                <!-- Water Background & Grid -->
                <rect width="400" height="300" fill="#e8f1f7"></rect>
                <g stroke="#d4e3ed" stroke-width="0.75" stroke-dasharray="2 3">
                  <line x1="0" y1="75" x2="400" y2="75"></line>
                  <line x1="0" y1="150" x2="400" y2="150"></line>
                  <line x1="0" y1="225" x2="400" y2="225"></line>
                  <line x1="100" y1="0" x2="100" y2="300"></line>
                  <line x1="200" y1="0" x2="200" y2="300"></line>
                  <line x1="300" y1="0" x2="300" y2="300"></line>
                </g>

                <!-- Coastline -->
                <path d="M 0,0 L 140,0 L 120,80 L 110,140 L 90,210 L 40,280 L 0,300 Z" fill="#d9e5ec" stroke="#9bb6c7" stroke-width="1.5"></path>
                <path d="M 280,0 L 320,80 L 360,160 L 400,200 L 400,0 Z" fill="#d9e5ec" stroke="#9bb6c7" stroke-width="1.5"></path>

                <!-- Labels -->
                <text x="30" y="80" class="fill-[#708a99] font-label-md text-[10px] font-bold uppercase">Odisha Coast</text>
                <text x="18" y="190" class="fill-[#708a99] font-label-md text-[9px] font-bold uppercase">Andhra Coast</text>

                <!-- Divergent Evolutionary Cone Envelope -->
                <path d="M 120,240 C 150,220 180,180 230,130 C 270,90 320,60 360,40 C 310,70 250,130 200,190 C 160,230 135,260 120,240 Z" fill="url(#evolutionConeGrad)" opacity="0.65"></path>

                <!-- Multi-member Spaghetti Trajectories (Model 2 Forecast Branches) -->
                <path d="M 120,240 Q 180,190 240,110 T 320,40" fill="none" stroke="#131b2e" stroke-width="2.5"></path>
                <path d="M 120,240 Q 190,205 260,135 T 350,60" fill="none" stroke="#f97316" stroke-width="1.2" stroke-dasharray="3 2"></path>
                <path d="M 120,240 Q 165,180 220,95 T 290,25" fill="none" stroke="#f97316" stroke-width="1.2" stroke-dasharray="3 2"></path>

                <!-- +66h Landfall Eyewall Marker -->
                <g transform="translate(240, 110)">
                  <circle cx="0" cy="0" r="10" fill="#ba1a1a" fill-opacity="0.3" class="animate-ping"></circle>
                  <circle cx="0" cy="0" r="6" fill="#131b2e"></circle>
                  <circle cx="0" cy="0" r="2.5" fill="#ffffff"></circle>
                  <rect x="8" y="-14" width="95" height="28" rx="5" fill="#0f172a" stroke="#ba1a1a" stroke-width="1.2" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.25))"></rect>
                  <text x="13" y="-3" class="fill-[#6cf8bb] font-label-sm text-[8px] font-bold uppercase">+66h LANDFALL</text>
                  <text x="13" y="8" class="fill-[#ffffff] font-label-sm text-[9px] font-bold">98 kt (Cat 3 Peak)</text>
                </g>

                <!-- +96h Bifurcation Horizon Marker -->
                <g transform="translate(320, 40)">
                  <circle cx="0" cy="0" r="5" fill="#131b2e"></circle>
                  <rect x="8" y="-12" width="70" height="22" rx="4" fill="#ffffff" stroke="#bfc7d2" stroke-width="0.8"></rect>
                  <text x="13" y="-2" class="fill-on-surface font-label-sm text-[8px] font-bold">+96h Day 4</text>
                  <text x="13" y="6" class="fill-error font-label-sm text-[8px] font-semibold">Track Spread ±165km</text>
                </g>
              </svg>

              <!-- Map 2 Bottom Badge -->
              <div class="absolute bottom-2 left-2 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-on-surface shadow-xs border border-outline-variant/30">
                Bifurcation Horizon: <span class="text-error font-extrabold">D+4 (+96h) Trigger</span>
              </div>
            </div>

            <!-- Model 2 Key Evolutionary Statistics -->
            <div class="grid grid-cols-2 gap-space-sm font-label-sm text-[11px]">
              <div class="p-2.5 bg-surface-container-low rounded-lg border border-outline-variant/20">
                <span class="text-outline uppercase text-[9px] block font-bold">Peak Landfall Intensity</span>
                <strong class="text-error text-[13px]">98 kt (Category 3)</strong>
              </div>
              <div class="p-2.5 bg-surface-container-low rounded-lg border border-outline-variant/20">
                <span class="text-outline uppercase text-[9px] block font-bold">Track Uncertainty Spread</span>
                <strong class="text-on-surface text-[13px]">±165 km (Divergent)</strong>
              </div>
              <div class="p-2.5 bg-surface-container-low rounded-lg border border-outline-variant/20">
                <span class="text-outline uppercase text-[9px] block font-bold">Continuous P(Bust)</span>
                <strong class="text-error text-[13px]">78% (High Cliff Risk)</strong>
              </div>
              <div class="p-2.5 bg-surface-container-low rounded-lg border border-outline-variant/20">
                <span class="text-outline uppercase text-[9px] block font-bold">Verification Fallback</span>
                <strong class="text-primary text-[13px]">Active &amp; Armed</strong>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- 3. SUB-MONITORING MICRO-TELEMETRY MAPS (3 Operational Diagnostic Cards) -->
      <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-space-sm mb-space-md border-b border-outline-variant/20 gap-space-sm">
          <div>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Coupled Micro-Telemetry &amp; Diagnostic Maps</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Spatio-temporal atmospheric interactions driving the 'Now' to 'Next' evolutionary divergence</p>
          </div>
          <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold">Unified 4-Variable Coupling</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          
          <!-- Micro-Map 1: Spatio-Temporal Vorticity & Vertical Wind Shear -->
          <div class="rounded-xl border border-outline-variant/30 bg-surface-container-low overflow-hidden flex flex-col justify-between">
            <div class="bg-[#FEF08A] p-space-md flex items-center justify-between text-[#78350F] border-b border-[#FDE047]">
              <div>
                <span class="font-label-sm text-[9px] uppercase tracking-widest font-extrabold block">Micro-Map 1</span>
                <span class="font-label-lg text-label-lg font-bold text-on-surface">Vorticity &amp; Wind Shear</span>
              </div>
              <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-[#FEF9C3] font-extrabold text-[#78350F]">850 vs 200 hPa</span>
            </div>
            
            <div class="relative w-full aspect-[4/3] bg-[#d9e5ec] p-2 flex items-center justify-center overflow-hidden">
              <svg class="w-full h-full" viewBox="0 0 240 160">
                <path d="M 0,0 L 70,0 L 50,160 L 0,160 Z" fill="#c3d5e0"></path>
                <path d="M 170,0 L 240,0 L 240,160 L 190,160 Z" fill="#c3d5e0"></path>
                <!-- Shear Plume -->
                <circle cx="120" cy="80" r="55" fill="#38BDF8" opacity="0.6"></circle>
                <circle cx="120" cy="80" r="35" fill="#FBBF24" opacity="0.8"></circle>
                <circle cx="120" cy="80" r="18" fill="#EF4444" opacity="0.85"></circle>
                <path d="M 90,80 L 150,80" stroke="#ffffff" stroke-width="2" marker-end="url(#arrow)"></path>
              </svg>
              <div class="absolute bottom-2 left-2 bg-surface-container-lowest/90 px-2 py-0.5 rounded text-[10px] font-bold text-on-surface">
                Shear: <span class="text-secondary font-extrabold">12.4 m/s (Favorable)</span>
              </div>
            </div>

            <div class="p-space-md bg-surface-container-lowest space-y-1 font-label-sm text-[11px] text-on-surface-variant border-t border-outline-variant/20">
              <div class="flex justify-between">
                <span>Vorticity Flux:</span>
                <strong class="text-on-surface font-bold">1.84 × 10⁻⁴ s⁻¹</strong>
              </div>
              <div class="flex justify-between">
                <span>Upper Divergence:</span>
                <strong class="text-on-surface font-bold">High (200 hPa Outflow)</strong>
              </div>
            </div>
          </div>

          <!-- Micro-Map 2: MSLP Barometric Deepening Anomaly -->
          <div class="rounded-xl border border-outline-variant/30 bg-surface-container-low overflow-hidden flex flex-col justify-between">
            <div class="bg-[#FB923C] p-space-md flex items-center justify-between text-[#7C2D12] border-b border-[#F97316]">
              <div>
                <span class="font-label-sm text-[9px] uppercase tracking-widest font-extrabold block">Micro-Map 2</span>
                <span class="font-label-lg text-label-lg font-bold text-[#ffffff]">MSLP Deepening Bias</span>
              </div>
              <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-[#FFEDD5] font-extrabold text-[#7C2D12]">ΔP / Δt Rate</span>
            </div>
            
            <div class="relative w-full aspect-[4/3] bg-[#d9e5ec] p-2 flex items-center justify-center overflow-hidden">
              <svg class="w-full h-full" viewBox="0 0 240 160">
                <path d="M 0,0 L 70,0 L 50,160 L 0,160 Z" fill="#c3d5e0"></path>
                <path d="M 170,0 L 240,0 L 240,160 L 190,160 Z" fill="#c3d5e0"></path>
                <!-- Pressure Anomaly Contours -->
                <ellipse cx="130" cy="85" rx="60" ry="40" fill="#FB923C" opacity="0.65"></ellipse>
                <ellipse cx="130" cy="85" rx="35" ry="22" fill="#E11D48" opacity="0.8"></ellipse>
                <ellipse cx="130" cy="85" rx="18" ry="10" fill="#7E22CE" opacity="0.9"></ellipse>
              </svg>
              <div class="absolute bottom-2 left-2 bg-surface-container-lowest/90 px-2 py-0.5 rounded text-[10px] font-bold text-on-surface">
                Rate: <span class="text-error font-extrabold">-22 hPa / 24h</span>
              </div>
            </div>

            <div class="p-space-md bg-surface-container-lowest space-y-1 font-label-sm text-[11px] text-on-surface-variant border-t border-outline-variant/20">
              <div class="flex justify-between">
                <span>Model Deepening Bias:</span>
                <strong class="text-error font-bold">+68% (NCUM Over-deep)</strong>
              </div>
              <div class="flex justify-between">
                <span>Pressure Gradient:</span>
                <strong class="text-on-surface font-bold">8.4 hPa / 100km</strong>
              </div>
            </div>
          </div>

          <!-- Micro-Map 3: Coastal Sea-Surface Thermal & Moisture Flux -->
          <div class="rounded-xl border border-outline-variant/30 bg-surface-container-low overflow-hidden flex flex-col justify-between">
            <div class="bg-[#E11D48] p-space-md flex items-center justify-between text-[#ffffff] border-b border-[#BE123C]">
              <div>
                <span class="font-label-sm text-[9px] uppercase tracking-widest font-extrabold block">Micro-Map 3</span>
                <span class="font-label-lg text-label-lg font-bold text-[#ffffff]">SST Thermal Coupling</span>
              </div>
              <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-[#FFE4E6] font-extrabold text-[#9F1239]">30.5°C Ocean</span>
            </div>
            
            <div class="relative w-full aspect-[4/3] bg-[#d9e5ec] p-2 flex items-center justify-center overflow-hidden">
              <svg class="w-full h-full" viewBox="0 0 240 160">
                <path d="M 0,0 L 70,0 L 50,160 L 0,160 Z" fill="#c3d5e0"></path>
                <path d="M 170,0 L 240,0 L 240,160 L 190,160 Z" fill="#c3d5e0"></path>
                <!-- Thermal Blobs -->
                <rect x="70" y="40" width="100" height="90" rx="20" fill="#E11D48" opacity="0.65"></rect>
                <circle cx="120" cy="85" r="30" fill="#9333EA" opacity="0.8"></circle>
              </svg>
              <div class="absolute bottom-2 left-2 bg-surface-container-lowest/90 px-2 py-0.5 rounded text-[10px] font-bold text-on-surface">
                OHC: <span class="text-secondary font-extrabold">92 kJ/cm² (High Energy)</span>
              </div>
            </div>

            <div class="p-space-md bg-surface-container-lowest space-y-1 font-label-sm text-[11px] text-on-surface-variant border-t border-outline-variant/20">
              <div class="flex justify-between">
                <span>Moisture Influx Rate:</span>
                <strong class="text-on-surface font-bold">42 g/kg·m/s</strong>
              </div>
              <div class="flex justify-between">
                <span>Inversion Boundary:</span>
                <strong class="text-on-surface font-bold">Weakened • Convective Influx</strong>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- 4. DUAL-MODEL INTERACTION & FALLBACK VERIFICATION TABLE -->
      <div class="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30">
        <div class="flex items-center justify-between pb-space-sm mb-space-md border-b border-outline-variant/20">
          <div>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Dual-Model Feature Attribution &amp; Fallback Verification Matrix</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Feature-level inputs comparison between Model 1 ('Now') and Model 2 ('Next')</p>
          </div>
          <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">Verified Trajectory Active</span>
        </div>

        <div class="w-full overflow-x-auto">
          <table class="w-full text-left font-body-sm text-body-sm">
            <thead>
              <tr class="text-outline uppercase font-label-sm text-[10px] tracking-wider border-b border-outline-variant/30">
                <th class="py-2.5 px-3">Atmospheric Parameter</th>
                <th class="py-2.5 px-3">Model 1 ('Now' State Reading)</th>
                <th class="py-2.5 px-3">Model 2 ('Next' Evolutionary Projection)</th>
                <th class="py-2.5 px-3 text-center">Bust Divergence Risk</th>
                <th class="py-2.5 px-3 text-center">Fallback Verification Trigger</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant/20">
              <tr class="hover:bg-surface-container-low/60 transition-colors">
                <td class="py-3 px-3 font-semibold text-on-surface">Cyclone Track &amp; Steering Flow</td>
                <td class="py-3 px-3 text-on-surface-variant">North-Northwest (18.4°N, 88.2°E)</td>
                <td class="py-3 px-3 text-error font-semibold">Bifurcates Northward into Odisha Coast (+66h Landfall)</td>
                <td class="py-3 px-3 text-center font-bold text-error">84% High Divergence</td>
                <td class="py-3 px-3 text-center"><span class="px-2 py-0.5 rounded bg-error-container text-on-error-container text-[10px] font-bold">Triggered &amp; Armed</span></td>
              </tr>
              <tr class="hover:bg-surface-container-low/60 transition-colors">
                <td class="py-3 px-3 font-semibold text-on-surface">Central MSLP Barometric Tendency</td>
                <td class="py-3 px-3 text-on-surface-variant">996 hPa (Stable Core)</td>
                <td class="py-3 px-3 text-tertiary font-semibold">Rapid Deepening to 962 hPa (Cat 3 Peak)</td>
                <td class="py-3 px-3 text-center font-bold text-tertiary">68% Moderate Bias</td>
                <td class="py-3 px-3 text-center"><span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">Cross-Validated</span></td>
              </tr>
              <tr class="hover:bg-surface-container-low/60 transition-colors">
                <td class="py-3 px-3 font-semibold text-on-surface">Coupled Vorticity &amp; Moisture Flux</td>
                <td class="py-3 px-3 text-on-surface-variant">1.84 × 10⁻⁴ s⁻¹ (Symmetric Outflow)</td>
                <td class="py-3 px-3 text-primary font-semibold">Asymmetric Moisture Influx over Bengal Coast</td>
                <td class="py-3 px-3 text-center font-bold text-primary">52% Moderate Risk</td>
                <td class="py-3 px-3 text-center"><span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">Cross-Validated</span></td>
              </tr>
              <tr class="hover:bg-surface-container-low/60 transition-colors">
                <td class="py-3 px-3 font-semibold text-on-surface">Ocean Thermal Heat Content (OHC)</td>
                <td class="py-3 px-3 text-on-surface-variant">92 kJ/cm² (SST 30.5°C)</td>
                <td class="py-3 px-3 text-on-surface-variant">Rapid Upwelling Cooling Post Landfall (-3.2°C)</td>
                <td class="py-3 px-3 text-center font-bold text-secondary">24% Low Risk</td>
                <td class="py-3 px-3 text-center"><span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">Locked Baseline</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}
