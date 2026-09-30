/**
 * Synapse SIH 2026 - Spatio-Temporal Cone & Track Trajectory Component
 * Features:
 * 1. Spatio-Temporal Cone & Track Trajectory (Bay of Bengal Sector, Landfall +66h Cat 3, Wind Radii)
 * 2. Wind Speed Exceedance Probability in Next 4 Days (N = 1,000) with 3 Threshold Panels (34+ kt, 50+ kt, 64+ kt)
 */
import { appState } from '../state.js';

export function renderSpatioTemporalCone(container) {
  if (!container) return;

  let currentViewMode = 'all'; // 'all' | 'track' | 'ensemble'

  const renderContent = () => {
    container.innerHTML = `
      <div class="flex flex-col gap-space-lg mt-space-md">
        
        <!-- SECTION 1: Spatio-Temporal Cone & Track Trajectory -->
        <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30">
          <!-- Header Bar -->
          <div class="flex flex-wrap items-start justify-between gap-space-sm mb-space-md">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Spatio-Temporal Cone &amp; Track Trajectory</h3>
                <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-semibold">Deterministic + Ensemble</span>
              </div>
              <p class="font-label-sm text-label-sm text-on-surface-variant mt-0.5">North Indian Ocean / Bay of Bengal Sector · Model Run Cycle: 2025-05-18 00Z</p>
            </div>

            <!-- View Mode Toggle Buttons -->
            <div class="flex items-center bg-surface-container-low p-1 rounded-xl border border-outline-variant/30">
              <button data-mode="all" class="view-mode-btn px-3 py-1 rounded-lg font-label-sm text-label-sm font-semibold transition-all ${
                currentViewMode === 'all' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }" type="button">All Swaths</button>
              <button data-mode="track" class="view-mode-btn px-3 py-1 rounded-lg font-label-sm text-label-sm font-semibold transition-all ${
                currentViewMode === 'track' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }" type="button">Track Only</button>
              <button data-mode="ensemble" class="view-mode-btn px-3 py-1 rounded-lg font-label-sm text-label-sm font-semibold transition-all ${
                currentViewMode === 'ensemble' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }" type="button">Ensemble 1,000</button>
            </div>
          </div>

          <!-- Main Cyclone Trajectory Map Canvas -->
          <div class="relative w-full aspect-[16/10] bg-[#eef4f9] rounded-xl overflow-hidden border border-outline-variant/30">
            <svg class="w-full h-full select-none" viewBox="0 0 700 440">
              <defs>
                <!-- Soft Glow Gradients for Wind Radii -->
                <radialGradient id="swathRedGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#E11D48" stop-opacity="0.85"></stop>
                  <stop offset="60%" stop-color="#FB923C" stop-opacity="0.6"></stop>
                  <stop offset="100%" stop-color="#FDE047" stop-opacity="0"></stop>
                </radialGradient>
                <radialGradient id="swathYellowGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.55"></stop>
                  <stop offset="60%" stop-color="#FCD34D" stop-opacity="0.35"></stop>
                  <stop offset="100%" stop-color="#FEF08A" stop-opacity="0"></stop>
                </radialGradient>
                
                <!-- Ensemble Multi-member Spread Gradient Cone -->
                <linearGradient id="ensembleConeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.4"></stop>
                  <stop offset="50%" stop-color="#FDBA74" stop-opacity="0.55"></stop>
                  <stop offset="100%" stop-color="#FCA5A5" stop-opacity="0.3"></stop>
                </linearGradient>
              </defs>

              <!-- Water Background -->
              <rect width="700" height="440" fill="#e8f1f7"></rect>

              <!-- Lat/Long Grid Lines -->
              <g stroke="#d4e3ed" stroke-width="0.75" stroke-dasharray="2 3">
                <line x1="0" y1="110" x2="700" y2="110"></line>
                <line x1="0" y1="220" x2="700" y2="220"></line>
                <line x1="0" y1="330" x2="700" y2="330"></line>
                <line x1="175" y1="0" x2="175" y2="440"></line>
                <line x1="350" y1="0" x2="350" y2="440"></line>
                <line x1="525" y1="0" x2="525" y2="440"></line>
              </g>

              <!-- Indian East Coastline & Landmass -->
              <path d="M 0,0 L 230,0 L 210,130 L 195,190 L 175,260 L 110,360 L 50,400 L 0,440 Z" fill="#d9e5ec" stroke="#9bb6c7" stroke-width="1.5"></path>
              
              <!-- Myanmar / East Bay Coastline -->
              <path d="M 410,0 L 460,130 L 530,190 L 600,240 L 700,280 L 700,0 Z" fill="#d9e5ec" stroke="#9bb6c7" stroke-width="1.5"></path>

              <!-- State & Region Labels -->
              <text x="250" y="160" class="fill-[#708a99] font-label-md text-[11px] font-bold uppercase tracking-wider">West Bengal</text>
              <text x="130" y="230" class="fill-[#708a99] font-label-md text-[10px] font-bold uppercase tracking-wider">Odisha</text>
              <text x="75" y="300" class="fill-[#708a99] font-label-md text-[10px] font-bold uppercase tracking-wider">Andhra Pradesh</text>
              <text x="560" y="250" class="fill-[#708a99] font-label-md text-[11px] font-bold uppercase tracking-wider">Myanmar</text>

              <!-- Coastal Port Markers -->
              <g transform="translate(185, 205)">
                <circle cx="0" cy="0" r="3" fill="#006194"></circle>
                <text x="8" y="3" class="fill-on-surface font-label-sm text-[9px] font-bold">Paradip Port</text>
              </g>
              <g transform="translate(160, 235)">
                <circle cx="0" cy="0" r="3" fill="#006194"></circle>
                <text x="8" y="3" class="fill-on-surface font-label-sm text-[9px] font-bold">Gopalpur</text>
              </g>
              <g transform="translate(135, 275)">
                <circle cx="0" cy="0" r="3" fill="#006194"></circle>
                <text x="-80" y="3" class="fill-on-surface font-label-sm text-[9px] font-bold">Visakhapatnam</text>
              </g>

              <!-- Spatio-Temporal Wind Swaths Layer (Yellow/Orange/Red Overlapping Cones) -->
              <g id="swath-layer" style="display: ${currentViewMode === 'track' ? 'none' : 'block'};">
                <!-- Outer Envelope Cone -->
                <path d="M 170,360 C 230,340 310,270 410,200 C 470,160 520,130 580,120 C 530,160 450,230 380,290 C 310,340 240,390 170,360 Z" fill="url(#ensembleConeGrad)" opacity="0.6"></path>

                <!-- Swath Blobs at Key Track Waypoints -->
                <!-- +12h -->
                <circle cx="210" cy="335" r="40" fill="#FEF08A" opacity="0.5"></circle>
                <circle cx="210" cy="335" r="24" fill="#FDBA74" opacity="0.6"></circle>
                <circle cx="210" cy="335" r="12" fill="#F87171" opacity="0.75"></circle>

                <!-- +30h -->
                <circle cx="260" cy="310" r="48" fill="#FEF08A" opacity="0.55"></circle>
                <circle cx="260" cy="310" r="30" fill="#FDBA74" opacity="0.65"></circle>
                <circle cx="260" cy="310" r="15" fill="#F87171" opacity="0.8"></circle>

                <!-- +48h -->
                <circle cx="310" cy="280" r="58" fill="#FEF08A" opacity="0.6"></circle>
                <circle cx="310" cy="280" r="36" fill="#FB923C" opacity="0.7"></circle>
                <circle cx="310" cy="280" r="18" fill="#E11D48" opacity="0.85"></circle>

                <!-- +66h LANDFALL (Peak Swath) -->
                <circle cx="355" cy="245" r="70" fill="#FEF08A" opacity="0.65"></circle>
                <circle cx="355" cy="245" r="45" fill="#FB923C" opacity="0.75"></circle>
                <circle cx="355" cy="245" r="24" fill="#E11D48" opacity="0.9"></circle>

                <!-- +84h -->
                <circle cx="420" cy="215" r="62" fill="#FEF08A" opacity="0.6"></circle>
                <circle cx="420" cy="215" r="38" fill="#FB923C" opacity="0.65"></circle>
                <circle cx="420" cy="215" r="18" fill="#E11D48" opacity="0.8"></circle>

                <!-- +96h -->
                <circle cx="500" cy="195" r="52" fill="#FEF08A" opacity="0.5"></circle>
                <circle cx="500" cy="195" r="30" fill="#FB923C" opacity="0.55"></circle>
                <circle cx="500" cy="195" r="14" fill="#E11D48" opacity="0.7"></circle>
              </g>

              <!-- Ensemble 1,000 Spaghetti Perturbation Lines -->
              <g id="ensemble-spaghetti-layer" style="display: ${currentViewMode === 'ensemble' ? 'block' : 'none'};" stroke="#f97316" stroke-width="0.8" opacity="0.45" fill="none">
                <path d="M 180,350 Q 250,300 345,230 T 490,185"></path>
                <path d="M 180,350 Q 265,315 365,255 T 510,205"></path>
                <path d="M 180,350 Q 240,290 335,220 T 475,175"></path>
                <path d="M 180,350 Q 270,320 375,260 T 520,210"></path>
                <path d="M 180,350 Q 255,305 350,240 T 495,190"></path>
              </g>

              <!-- Main Deterministic Cyclone Track Line -->
              <path d="M 180,350 L 210,335 L 260,310 L 310,280 L 355,245 L 420,215 L 500,195" fill="none" stroke="#131b2e" stroke-width="2.5" stroke-linecap="round"></path>

              <!-- Track Points with Eye Icons & Callout Pills -->
              <!-- +6h -->
              <g transform="translate(180, 350)">
                <circle cx="0" cy="0" r="4.5" fill="#131b2e"></circle>
                <rect x="-42" y="-30" width="40" height="20" rx="4" fill="#ffffff" stroke="#bfc7d2" stroke-width="0.8" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.1))"></rect>
                <text x="-37" y="-20" class="fill-on-surface font-label-sm text-[8px] font-bold">+6h</text>
                <text x="-37" y="-12" class="fill-on-surface-variant font-label-sm text-[8px] font-medium">83 kt</text>
              </g>

              <!-- +12h -->
              <g transform="translate(210, 335)">
                <circle cx="0" cy="0" r="4.5" fill="#131b2e"></circle>
                <rect x="8" y="10" width="40" height="20" rx="4" fill="#ffffff" stroke="#bfc7d2" stroke-width="0.8" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.1))"></rect>
                <text x="14" y="20" class="fill-on-surface font-label-sm text-[8px] font-bold">+12h</text>
                <text x="14" y="28" class="fill-on-surface-variant font-label-sm text-[8px] font-medium">82 kt</text>
              </g>

              <!-- +30h -->
              <g transform="translate(260, 310)">
                <circle cx="0" cy="0" r="5" fill="#131b2e"></circle>
                <circle cx="0" cy="0" r="2" fill="#ffffff"></circle>
                <rect x="8" y="8" width="42" height="20" rx="4" fill="#ffffff" stroke="#bfc7d2" stroke-width="0.8" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.1))"></rect>
                <text x="14" y="18" class="fill-on-surface font-label-sm text-[8px] font-bold">+30h</text>
                <text x="14" y="26" class="fill-on-surface-variant font-label-sm text-[8px] font-medium">84 kt</text>
              </g>

              <!-- +48h -->
              <g transform="translate(310, 280)">
                <circle cx="0" cy="0" r="5" fill="#131b2e"></circle>
                <circle cx="0" cy="0" r="2" fill="#ffffff"></circle>
                <rect x="12" y="-5" width="42" height="20" rx="4" fill="#ffffff" stroke="#bfc7d2" stroke-width="0.8" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.1))"></rect>
                <text x="18" y="5" class="fill-on-surface font-label-sm text-[8px] font-bold">+48h</text>
                <text x="18" y="13" class="fill-on-surface-variant font-label-sm text-[8px] font-medium">81 kt</text>
              </g>

              <!-- +66h LANDFALL (CRITICAL HIGHLIGHT) -->
              <g transform="translate(355, 245)">
                <circle cx="0" cy="0" r="8" fill="#ba1a1a" fill-opacity="0.3" class="animate-ping"></circle>
                <circle cx="0" cy="0" r="6" fill="#131b2e"></circle>
                <circle cx="0" cy="0" r="2.5" fill="#ffffff"></circle>
                <!-- Highlight Landfall Pill -->
                <rect x="8" y="-14" width="76" height="26" rx="5" fill="#0f172a" stroke="#00714d" stroke-width="1.2" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.25))"></rect>
                <text x="13" y="-3" class="fill-[#6cf8bb] font-label-sm text-[8px] font-extrabold uppercase tracking-wider">+66h LANDFALL</text>
                <text x="13" y="8" class="fill-[#ffffff] font-label-sm text-[9px] font-bold">98 kt (Cat 3)</text>
              </g>

              <!-- +84h -->
              <g transform="translate(420, 215)">
                <circle cx="0" cy="0" r="5" fill="#131b2e"></circle>
                <circle cx="0" cy="0" r="2" fill="#ffffff"></circle>
                <rect x="10" y="8" width="42" height="20" rx="4" fill="#ffffff" stroke="#bfc7d2" stroke-width="0.8" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.1))"></rect>
                <text x="16" y="18" class="fill-on-surface font-label-sm text-[8px] font-bold">+84h</text>
                <text x="16" y="26" class="fill-on-surface-variant font-label-sm text-[8px] font-medium">71 kt</text>
              </g>

              <!-- +96h (Final Horizon) -->
              <g transform="translate(500, 195)">
                <circle cx="0" cy="0" r="5" fill="#131b2e"></circle>
                <circle cx="0" cy="0" r="2" fill="#ffffff"></circle>
                <rect x="12" y="-12" width="44" height="20" rx="4" fill="#ffffff" stroke="#bfc7d2" stroke-width="0.8" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.1))"></rect>
                <text x="17" y="-2" class="fill-on-surface font-label-sm text-[8px] font-bold">+96h (6d)</text>
                <text x="17" y="6" class="fill-on-surface-variant font-label-sm text-[8px] font-medium">76 kt</text>
              </g>

              <!-- Scale Indicator Bar (100km) -->
              <g transform="translate(40, 395)">
                <line x1="0" y1="0" x2="60" y2="0" stroke="#131b2e" stroke-width="2"></line>
                <line x1="0" y1="-4" x2="0" y2="4" stroke="#131b2e" stroke-width="2"></line>
                <line x1="60" y1="-4" x2="60" y2="4" stroke="#131b2e" stroke-width="2"></line>
                <text x="12" y="-6" class="fill-on-surface font-label-sm text-[9px] font-bold">100 km</text>
              </g>
            </svg>

            <!-- Floating Legend: Wind Radius Swaths (Bottom-Right) -->
            <div class="absolute bottom-3 right-3 bg-surface-container-lowest/95 backdrop-blur-sm p-space-sm rounded-xl shadow-md border border-outline-variant/30 text-on-surface max-w-xs">
              <span class="font-label-sm text-[10px] font-bold uppercase tracking-wider block mb-2 text-on-surface">Wind Radius Swaths</span>
              <div class="space-y-1.5 font-label-sm text-[11px]">
                <div class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-sm bg-[#FEF08A] border border-[#F59E0B]"></span>
                  <span>Tropical-storm (≥34 kt)</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-sm bg-[#FB923C] border border-[#EA580C]"></span>
                  <span>Severe tropical-storm (≥50 kt)</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-sm bg-[#E11D48] border border-[#BE123C]"></span>
                  <span class="font-semibold text-on-surface">Category 1+ cyclone (≥64 kt)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 2: Wind Speed Exceedance Probability in Next 4 Days (N = 1,000) -->
        <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30">
          <!-- Header & Probability Scale Bar -->
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-lg pb-space-sm border-b border-outline-variant/20">
            <div>
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-[22px]">air</span>
                <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Wind Speed Exceedance Probability in Next 4 Days (N = 1,000)</h3>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Ensemble spatial kernel density probability maps across 3 key operational impact thresholds</p>
            </div>

            <!-- Horizontal Probability Gradient Bar Legend -->
            <div class="flex flex-col items-end">
              <div class="flex justify-between w-64 text-[9px] font-mono text-outline font-semibold mb-1">
                <span>0%</span><span>10</span><span>20</span><span>30</span><span>40</span><span>50</span><span>60</span><span>70</span><span>80</span><span>90</span><span>100%</span>
              </div>
              <div class="w-64 h-2.5 rounded-full bg-gradient-to-r from-[#FEF08A] via-[#FB923C] via-[#E11D48] to-[#7E22CE] mb-1"></div>
              <span class="font-label-sm text-[9px] uppercase tracking-wider text-outline font-bold">Probability (%) of Exceeding Threshold</span>
            </div>
          </div>

          <!-- 3 Threshold Panels Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            
            <!-- PANEL B: Tropical-storm winds (34+ kt) -->
            <div class="rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container-low flex flex-col justify-between">
              <!-- Panel Header -->
              <div class="bg-[#FEF08A] p-space-md flex items-center justify-between text-[#78350F] border-b border-[#FDE047]">
                <div>
                  <span class="font-label-sm text-[9px] uppercase tracking-widest font-extrabold block">Panel B</span>
                  <span class="font-label-lg text-label-lg font-bold text-on-surface">Tropical-storm winds (34+ kt)</span>
                </div>
                <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-[#FEF9C3] font-extrabold text-[#78350F]">≥ 63 km/h</span>
              </div>

              <!-- SVG Kernel Density Map -->
              <div class="relative w-full aspect-[4/3] bg-[#d9e5ec] p-2 flex items-center justify-center overflow-hidden">
                <svg class="w-full h-full" viewBox="0 0 240 180">
                  <path d="M 0,0 L 80,0 L 60,180 L 0,180 Z" fill="#c3d5e0"></path>
                  <path d="M 180,0 L 240,0 L 240,180 L 200,180 Z" fill="#c3d5e0"></path>
                  <!-- Plume Probability Kernel Density -->
                  <path d="M 20,160 C 60,140 120,90 220,50 C 200,65 130,110 50,175 Z" fill="#38BDF8" opacity="0.6"></path>
                  <path d="M 30,155 C 70,135 125,85 210,55 C 190,70 125,115 55,170 Z" fill="#FBBF24" opacity="0.8"></path>
                  <path d="M 40,150 C 75,130 130,80 200,60 C 180,75 120,118 60,165 Z" fill="#EF4444" opacity="0.85"></path>
                  <path d="M 50,145 C 80,125 135,78 190,65 C 175,78 115,120 70,158 Z" fill="#7E22CE" opacity="0.9"></path>
                  <!-- Eye dot -->
                  <circle cx="150" cy="90" r="2.5" fill="#ffffff"></circle>
                </svg>
                <!-- Impact Pill -->
                <div class="absolute bottom-2 left-2 bg-surface-container-lowest/90 px-2 py-0.5 rounded text-[10px] font-bold text-on-surface shadow-xs">
                  Coastal Impact: <span class="text-error font-extrabold">96%</span>
                </div>
              </div>

              <!-- Stats Footer -->
              <div class="p-space-md bg-surface-container-lowest space-y-1 font-label-sm text-[11px] text-on-surface-variant border-t border-outline-variant/20">
                <div class="flex justify-between">
                  <span>Population Exposed:</span>
                  <strong class="text-on-surface font-bold">14.2 Million</strong>
                </div>
                <div class="flex justify-between">
                  <span>Corridor Width:</span>
                  <strong class="text-on-surface font-bold">420 km Swath</strong>
                </div>
              </div>
            </div>

            <!-- PANEL C: Severe winds (50+ kt) -->
            <div class="rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container-low flex flex-col justify-between">
              <!-- Panel Header -->
              <div class="bg-[#FB923C] p-space-md flex items-center justify-between text-[#7C2D12] border-b border-[#F97316]">
                <div>
                  <span class="font-label-sm text-[9px] uppercase tracking-widest font-extrabold block">Panel C</span>
                  <span class="font-label-lg text-label-lg font-bold text-[#ffffff]">Severe winds (50+ kt)</span>
                </div>
                <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-[#FFEDD5] font-extrabold text-[#7C2D12]">≥ 92 km/h</span>
              </div>

              <!-- SVG Kernel Density Map -->
              <div class="relative w-full aspect-[4/3] bg-[#d9e5ec] p-2 flex items-center justify-center overflow-hidden">
                <svg class="w-full h-full" viewBox="0 0 240 180">
                  <path d="M 0,0 L 80,0 L 60,180 L 0,180 Z" fill="#c3d5e0"></path>
                  <path d="M 180,0 L 240,0 L 240,180 L 200,180 Z" fill="#c3d5e0"></path>
                  <!-- Plume Probability Kernel Density -->
                  <path d="M 35,155 C 70,135 125,85 210,55 C 190,70 125,115 55,170 Z" fill="#38BDF8" opacity="0.6"></path>
                  <path d="M 45,150 C 75,130 130,80 200,60 C 180,75 120,118 60,165 Z" fill="#FB923C" opacity="0.8"></path>
                  <path d="M 55,145 C 80,125 135,78 190,65 C 175,78 115,120 70,158 Z" fill="#7E22CE" opacity="0.9"></path>
                  <!-- Eye dot -->
                  <circle cx="150" cy="90" r="2.5" fill="#ffffff"></circle>
                </svg>
                <!-- Impact Pill -->
                <div class="absolute bottom-2 left-2 bg-surface-container-lowest/90 px-2 py-0.5 rounded text-[10px] font-bold text-on-surface shadow-xs">
                  Coastal Impact: <span class="text-error font-extrabold">78%</span>
                </div>
              </div>

              <!-- Stats Footer -->
              <div class="p-space-md bg-surface-container-lowest space-y-1 font-label-sm text-[11px] text-on-surface-variant border-t border-outline-variant/20">
                <div class="flex justify-between">
                  <span>Population Exposed:</span>
                  <strong class="text-on-surface font-bold">6.8 Million</strong>
                </div>
                <div class="flex justify-between">
                  <span>Corridor Width:</span>
                  <strong class="text-on-surface font-bold">240 km Swath</strong>
                </div>
              </div>
            </div>

            <!-- PANEL D: Category 1+ winds (64+ kt) -->
            <div class="rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container-low flex flex-col justify-between">
              <!-- Panel Header -->
              <div class="bg-[#E11D48] p-space-md flex items-center justify-between text-[#ffffff] border-b border-[#BE123C]">
                <div>
                  <span class="font-label-sm text-[9px] uppercase tracking-widest font-extrabold block">Panel D</span>
                  <span class="font-label-lg text-label-lg font-bold text-[#ffffff]">Category 1+ winds (64+ kt)</span>
                </div>
                <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-[#FFE4E6] font-extrabold text-[#9F1239]">≥ 119 km/h</span>
              </div>

              <!-- SVG Kernel Density Map -->
              <div class="relative w-full aspect-[4/3] bg-[#d9e5ec] p-2 flex items-center justify-center overflow-hidden">
                <svg class="w-full h-full" viewBox="0 0 240 180">
                  <path d="M 0,0 L 80,0 L 60,180 L 0,180 Z" fill="#c3d5e0"></path>
                  <path d="M 180,0 L 240,0 L 240,180 L 200,180 Z" fill="#c3d5e0"></path>
                  <!-- Core Eyewall Kernel Density -->
                  <path d="M 50,150 C 75,130 130,80 200,60 C 185,73 125,115 65,160 Z" fill="#4ADE80" opacity="0.6"></path>
                  <path d="M 60,145 C 80,125 135,78 190,65 C 175,78 115,120 70,158 Z" fill="#7E22CE" opacity="0.9"></path>
                  <!-- Eye dot -->
                  <circle cx="150" cy="90" r="2.5" fill="#ffffff"></circle>
                </svg>
                <!-- Impact Pill -->
                <div class="absolute bottom-2 left-2 bg-surface-container-lowest/90 px-2 py-0.5 rounded text-[10px] font-bold text-on-surface shadow-xs">
                  Coastal Impact: <span class="text-error font-extrabold">54%</span>
                </div>
              </div>

              <!-- Stats Footer -->
              <div class="p-space-md bg-surface-container-lowest space-y-1 font-label-sm text-[11px] text-on-surface-variant border-t border-outline-variant/20">
                <div class="flex justify-between">
                  <span>Population Exposed:</span>
                  <strong class="text-on-surface font-bold">2.1 Million</strong>
                </div>
                <div class="flex justify-between">
                  <span>Corridor Width:</span>
                  <strong class="text-on-surface font-bold">115 km Eyewall Core</strong>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    `;

    // Attach View Mode Toggle Buttons
    container.querySelectorAll('.view-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentViewMode = btn.dataset.mode;
        renderContent();
      });
    });
  };

  renderContent();
}
