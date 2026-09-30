/**
 * Synapse SIH 2026 - Trajectory Fallback & Verification Engine View
 * Features:
 * 1. Stage 5 Verification & Fail-Safe Status Header
 * 2. Trajectory Cross-Check & Fallback Deviation Canvas (NWP vs Synapse vs Ground Truth)
 * 3. Dynamic Fallback Threshold & Coastal Port Risk Assessment
 * 4. 3 Error Vector Diagnostic Cards (Cross-Track, Along-Track Phase, Intensity/MSLP)
 * 5. Live Fallback Fail-Safe Execution Log & Audit Table
 */
import { appState } from '../state.js';

export function renderTrajectoryFallbackView(container) {
  if (!container) return;

  let activeThresholdLevel = 'operational'; // 'operational' | 'strict' | 'relaxed'

  const renderContent = () => {
    container.innerHTML = `
      <div class="flex flex-col gap-space-lg w-full animate-fadeIn">
        
        <!-- 1. Top Trajectory Fallback & Verification Header Banner -->
        <div class="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border-t-4 border-secondary">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            <div class="flex items-start gap-space-md">
              <div class="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-on-secondary shrink-0 shadow-md">
                <span class="material-symbols-outlined text-[28px]">route</span>
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h2 class="font-headline-md text-headline-md text-on-surface font-bold">Trajectory-Based Verification &amp; Fallback Engine</h2>
                  <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold uppercase">Stage 5 Architecture</span>
                  <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-bold uppercase">Fail-Safe Armed</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-4xl">
                  Cross-checks the Dual-Model continuous risk output in real-time against IMD S-Band Doppler radar &amp; satellite fixes. Automatically triggers trajectory fallback correction when track deviation exceeds operational tolerance.
                </p>
              </div>
            </div>

            <!-- Verification System Metrics -->
            <div class="flex items-center gap-space-sm shrink-0 bg-surface-container-low p-space-sm rounded-xl border border-outline-variant/30">
              <div class="px-3 py-1 text-center border-r border-outline-variant/30">
                <span class="font-label-sm text-[10px] uppercase text-outline block font-bold">Fallback Status</span>
                <span class="font-headline-sm text-headline-sm text-secondary font-bold">Armed &amp; Ready</span>
              </div>
              <div class="px-3 py-1 text-center border-r border-outline-variant/30">
                <span class="font-label-sm text-[10px] uppercase text-outline block font-bold">Execution Latency</span>
                <span class="font-headline-sm text-headline-sm text-primary font-bold">42 ms</span>
              </div>
              <div class="px-3 py-1 text-center">
                <span class="font-label-sm text-[10px] uppercase text-outline block font-bold">Confidence Calibration</span>
                <span class="font-headline-sm text-headline-sm text-on-surface font-bold">84.6%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. MAIN DUAL VERIFICATION & THRESHOLD VISUALS -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          
          <!-- Visual A: Real-Time Trajectory Cross-Check & Fallback Deviation Canvas (Col 1-7) -->
          <div class="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-space-sm mb-space-sm border-b border-outline-variant/20">
                <div>
                  <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Multi-Model Trajectory Cross-Verification Canvas</h3>
                  <span class="font-label-sm text-label-sm text-outline">Deterministic NWP vs Synapse AI vs Ground-Truth Observed Doppler</span>
                </div>
                <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold">Live Doppler Sync</span>
              </div>

              <!-- SVG Trajectory Verification Canvas -->
              <div class="relative w-full aspect-[16/10] bg-[#e8f1f7] rounded-xl overflow-hidden border border-outline-variant/30 mb-space-md">
                <svg class="w-full h-full select-none" viewBox="0 0 540 340">
                  <defs>
                    <!-- Fallback Safe Corridor Gradient -->
                    <linearGradient id="fallbackCorridorGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#A7F3D0" stop-opacity="0.45"></stop>
                      <stop offset="50%" stop-color="#FDE68A" stop-opacity="0.5"></stop>
                      <stop offset="100%" stop-color="#FECDD3" stop-opacity="0.55"></stop>
                    </linearGradient>
                  </defs>

                  <!-- Water Background & Grid -->
                  <rect width="540" height="340" fill="#e8f1f7"></rect>
                  <g stroke="#d4e3ed" stroke-width="0.75" stroke-dasharray="2 3">
                    <line x1="0" y1="85" x2="540" y2="85"></line>
                    <line x1="0" y1="170" x2="540" y2="170"></line>
                    <line x1="0" y1="255" x2="540" y2="255"></line>
                    <line x1="135" y1="0" x2="135" y2="340"></line>
                    <line x1="270" y1="0" x2="270" y2="340"></line>
                    <line x1="405" y1="0" x2="405" y2="340"></line>
                  </g>

                  <!-- Accurate East Coastline of India & Myanmar -->
                  <path d="M 0,0 L 210,0 C 190,40 180,85 160,130 C 145,170 135,215 110,260 C 85,300 50,330 0,340 Z" fill="#d9e5ec" stroke="#9bb6c7" stroke-width="1.6"></path>
                  <path d="M 370,0 C 400,60 440,135 480,195 L 540,240 L 540,0 Z" fill="#d9e5ec" stroke="#9bb6c7" stroke-width="1.6"></path>

                  <!-- Coastal Labels -->
                  <text x="50" y="90" class="fill-[#708a99] font-label-md text-[10px] font-bold uppercase">West Bengal</text>
                  <text x="40" y="180" class="fill-[#708a99] font-label-md text-[10px] font-bold uppercase">Odisha Coast</text>
                  <text x="20" y="270" class="fill-[#708a99] font-label-md text-[9px] font-bold uppercase">Andhra Coast</text>

                  <!-- Fallback Verification Uncertainty Corridor -->
                  <path d="M 160,290 C 200,260 250,200 310,140 C 360,95 420,55 470,40 C 430,75 360,140 290,210 C 230,270 180,310 160,290 Z" fill="url(#fallbackCorridorGrad)"></path>

                  <!-- Path 1: Baseline Raw NWP Track (Black Dashed) -->
                  <path d="M 160,290 Q 240,230 350,130 T 460,50" fill="none" stroke="#707881" stroke-width="2" stroke-dasharray="4 3"></path>

                  <!-- Path 2: Synapse Dual-Model AI Corrected Track (Solid Blue) -->
                  <path d="M 160,290 Q 230,210 310,120 T 410,35" fill="none" stroke="#006194" stroke-width="3" stroke-linecap="round"></path>

                  <!-- Path 3: IMD Ground Truth Observed Doppler Path (Green Dots & Line) -->
                  <path d="M 160,290 L 205,250 L 255,205 L 305,155" fill="none" stroke="#006c49" stroke-width="2.5"></path>
                  <circle cx="160" cy="290" r="4" fill="#006c49"></circle>
                  <circle cx="205" cy="250" r="4" fill="#006c49"></circle>
                  <circle cx="255" cy="205" r="4" fill="#006c49"></circle>
                  <circle cx="305" cy="155" r="5" fill="#006c49" stroke="#ffffff" stroke-width="1.5"></circle>

                  <!-- Waypoint Callout: +66h Fallback Trigger Point -->
                  <g transform="translate(305, 120)">
                    <circle cx="0" cy="0" r="9" fill="#ba1a1a" fill-opacity="0.25" class="animate-ping"></circle>
                    <circle cx="0" cy="0" r="5" fill="#ba1a1a"></circle>
                    <rect x="12" y="-18" width="132" height="38" rx="6" fill="#0f172a" stroke="#00714d" stroke-width="1.2" filter="drop-shadow(0 2px 5px rgba(0,0,0,0.2))"></rect>
                    <text x="18" y="-6" class="fill-[#6cf8bb] font-label-sm text-[8px] font-bold uppercase">Fallback Verified Fix</text>
                    <text x="18" y="5" class="fill-[#ffffff] font-label-sm text-[9px] font-bold">+66h Landfall: Gopalpur</text>
                    <text x="18" y="14" class="fill-[#fca5a5] font-label-sm text-[8px]">Delta Track: ±38km vs Raw 165km</text>
                  </g>

                  <!-- Scale Bar -->
                  <g transform="translate(25, 305)">
                    <line x1="0" y1="0" x2="50" y2="0" stroke="#131b2e" stroke-width="2"></line>
                    <line x1="0" y1="-3" x2="0" y2="3" stroke="#131b2e" stroke-width="2"></line>
                    <line x1="50" y1="-3" x2="50" y2="3" stroke="#131b2e" stroke-width="2"></line>
                    <text x="10" y="-5" class="fill-on-surface font-label-sm text-[8px] font-bold">100 km</text>
                  </g>
                </svg>

                <!-- Floating Legend -->
                <div class="absolute bottom-2 right-2 bg-surface-container-lowest/95 backdrop-blur-sm p-2 rounded-lg shadow-md border border-outline-variant/30 text-[10px] space-y-1">
                  <div class="flex items-center gap-1.5 font-medium">
                    <span class="w-4 h-0.5 bg-[#006c49]"></span>
                    <span>Observed Doppler Fix (Truth)</span>
                  </div>
                  <div class="flex items-center gap-1.5 font-medium">
                    <span class="w-4 h-0.5 bg-[#006194]"></span>
                    <span class="font-bold text-primary">Synapse AI Fallback Track</span>
                  </div>
                  <div class="flex items-center gap-1.5 font-medium">
                    <span class="w-4 h-0.5 border-t-2 border-dashed border-[#707881]"></span>
                    <span>Raw Uncalibrated NWP Baseline</span>
                  </div>
                </div>
              </div>

              <!-- Canvas Diagnostic Badges -->
              <div class="flex flex-wrap items-center justify-between gap-2 font-label-sm text-[11px] text-on-surface-variant bg-surface-container-low p-space-sm rounded-lg border border-outline-variant/20">
                <span>Observed Fix Latency: <strong class="text-on-surface font-bold">6m ago (IMD Radar)</strong></span>
                <span>Track Correction Factor: <strong class="text-secondary font-bold">-76.4% Error Reduction</strong></span>
                <span>Fallback Mode: <strong class="text-primary font-bold">Deterministic Locked</strong></span>
              </div>
            </div>
          </div>

          <!-- Visual B: Dynamic Fallback Threshold & Coastal Port Risk Assessment (Col 8-12) -->
          <div class="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-space-sm mb-space-sm border-b border-outline-variant/20">
                <div>
                  <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Threshold-Based Risk Calibration</h3>
                  <span class="font-label-sm text-label-sm text-outline">Raw Probability to Location Confidence</span>
                </div>
                <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">Calibrated</span>
              </div>

              <!-- Probability Threshold Controller -->
              <div class="p-space-sm bg-surface-container-low rounded-xl border border-outline-variant/20 mb-space-md">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="font-label-sm text-[11px] font-bold text-on-surface">Fallback Trigger Sensitivity</span>
                  <span class="font-label-sm text-[10px] px-2 py-0.2 rounded bg-primary text-on-primary font-bold">Threshold: 65% P(Bust)</span>
                </div>
                <!-- Probability Range Bar -->
                <div class="w-full h-3 rounded-full bg-gradient-to-r from-[#A7F3D0] via-[#FDE68A] via-[#FB923C] to-[#E11D48] relative mb-1">
                  <div class="absolute top-1/2 -translate-y-1/2 left-[65%] w-3.5 h-3.5 rounded-full bg-[#0f172a] border-2 border-[#ffffff] shadow-sm"></div>
                </div>
                <div class="flex justify-between font-label-sm text-[9px] text-outline font-medium">
                  <span>0% Safe</span>
                  <span>35% Alert</span>
                  <span>65% Trigger</span>
                  <span>100% Critical</span>
                </div>
              </div>

              <!-- Coastal Ports Continuous Risk Ranking -->
              <div class="space-y-2">
                <span class="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider block">Coastal Critical Infrastructure Risk</span>
                
                <!-- Port 1: Gopalpur Port (92% - Critical) -->
                <div class="p-2.5 bg-surface-container-low rounded-lg border border-error/30 flex items-center justify-between">
                  <div>
                    <div class="flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-error"></span>
                      <strong class="font-label-sm text-label-sm text-on-surface">Gopalpur Port (Odisha)</strong>
                    </div>
                    <span class="font-label-sm text-[10px] text-outline">Direct Eyewall Corridor • +66h Landfall</span>
                  </div>
                  <div class="text-right">
                    <span class="font-headline-sm text-headline-sm font-bold text-error">92%</span>
                    <span class="font-label-sm text-[9px] text-error font-bold block uppercase">Critical Evac</span>
                  </div>
                </div>

                <!-- Port 2: Paradip Port (88% - Critical) -->
                <div class="p-2.5 bg-surface-container-low rounded-lg border border-error/30 flex items-center justify-between">
                  <div>
                    <div class="flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-error"></span>
                      <strong class="font-label-sm text-label-sm text-on-surface">Paradip Deepwater Port</strong>
                    </div>
                    <span class="font-label-sm text-[10px] text-outline">High Storm Surge Hazard (+3.8m)</span>
                  </div>
                  <div class="text-right">
                    <span class="font-headline-sm text-headline-sm font-bold text-error">88%</span>
                    <span class="font-label-sm text-[9px] text-error font-bold block uppercase">High Bust Risk</span>
                  </div>
                </div>

                <!-- Port 3: Haldia Port (71% - Severe) -->
                <div class="p-2.5 bg-surface-container-low rounded-lg border border-tertiary/30 flex items-center justify-between">
                  <div>
                    <div class="flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-tertiary"></span>
                      <strong class="font-label-sm text-label-sm text-on-surface">Haldia Port (West Bengal)</strong>
                    </div>
                    <span class="font-label-sm text-[10px] text-outline">Outer Wind Swath &amp; Heavy Rain</span>
                  </div>
                  <div class="text-right">
                    <span class="font-headline-sm text-headline-sm font-bold text-tertiary">71%</span>
                    <span class="font-label-sm text-[9px] text-tertiary font-bold block uppercase">Severe Warning</span>
                  </div>
                </div>

                <!-- Port 4: Visakhapatnam Port (34% - Low) -->
                <div class="p-2.5 bg-surface-container-low rounded-lg border border-secondary/30 flex items-center justify-between">
                  <div>
                    <div class="flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-secondary"></span>
                      <strong class="font-label-sm text-label-sm text-on-surface">Visakhapatnam Port (AP)</strong>
                    </div>
                    <span class="font-label-sm text-[10px] text-outline">South Flank • Low Swath Risk</span>
                  </div>
                  <div class="text-right">
                    <span class="font-headline-sm text-headline-sm font-bold text-secondary">34%</span>
                    <span class="font-label-sm text-[9px] text-secondary font-bold block uppercase">Safe Corridor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- 3. THREE DIAGNOSTIC ERROR VECTOR CARDS -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          
          <!-- Card 1: Cross-Track Error Vector -->
          <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="font-label-sm text-[10px] font-bold uppercase tracking-wider text-outline">Error Metric 1</span>
                <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold">Cross-Track ΔX</span>
              </div>
              <h4 class="font-headline-sm text-headline-sm text-on-surface font-bold">Cross-Track Dispersion</h4>
              <p class="font-body-sm text-[11px] text-on-surface-variant mt-1">Perpendicular distance deviation between NWP forecast centerline and verified Doppler track.</p>
            </div>
            <div class="mt-space-md pt-space-xs border-t border-outline-variant/20 flex justify-between items-center">
              <div>
                <span class="font-display-lg text-display-lg text-primary font-bold">38 km</span>
                <span class="font-label-sm text-[10px] text-outline block">vs Raw Baseline: 165 km</span>
              </div>
              <span class="font-label-sm text-[10px] px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">Within Tolerance</span>
            </div>
          </div>

          <!-- Card 2: Along-Track Phase Timing Lag -->
          <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="font-label-sm text-[10px] font-bold uppercase tracking-wider text-outline">Error Metric 2</span>
                <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold">Phase Lag Δt</span>
              </div>
              <h4 class="font-headline-sm text-headline-sm text-on-surface font-bold">Translation Phase Lag</h4>
              <p class="font-body-sm text-[11px] text-on-surface-variant mt-1">Speed and forward acceleration discrepancy along steering ridge flow.</p>
            </div>
            <div class="mt-space-md pt-space-xs border-t border-outline-variant/20 flex justify-between items-center">
              <div>
                <span class="font-display-lg text-display-lg text-tertiary font-bold">+2.4 hrs</span>
                <span class="font-label-sm text-[10px] text-outline block">Translation: 18 km/h</span>
              </div>
              <span class="font-label-sm text-[10px] px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold">Phase Shifted</span>
            </div>
          </div>

          <!-- Card 3: Intensity & Eyewall Pressure Error -->
          <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="font-label-sm text-[10px] font-bold uppercase tracking-wider text-outline">Error Metric 3</span>
                <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-error-container text-on-error-container font-bold">Intensity ΔP</span>
              </div>
              <h4 class="font-headline-sm text-headline-sm text-on-surface font-bold">Pressure &amp; Wind Delta</h4>
              <p class="font-body-sm text-[11px] text-on-surface-variant mt-1">Central minimum pressure error comparing NCUM parameterized convection to observed core.</p>
            </div>
            <div class="mt-space-md pt-space-xs border-t border-outline-variant/20 flex justify-between items-center">
              <div>
                <span class="font-display-lg text-display-lg text-error font-bold">±8.4 kt</span>
                <span class="font-label-sm text-[10px] text-outline block">ΔP: 6.2 hPa Error</span>
              </div>
              <span class="font-label-sm text-[10px] px-2 py-0.5 rounded bg-error-container text-on-error-container font-bold">Bust Protected</span>
            </div>
          </div>

        </div>

        <!-- 4. LIVE FALLBACK EXECUTION & AUDIT LOG TABLE -->
        <div class="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30">
          <div class="flex items-center justify-between pb-space-sm mb-space-md border-b border-outline-variant/20">
            <div>
              <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Real-Time Fallback Execution Log &amp; Verification Audit</h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Automated fail-safe interventions triggered by the Synapse Stage 5 verification layer</p>
            </div>
            <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold">Audit Trail Active</span>
          </div>

          <div class="w-full overflow-x-auto">
            <table class="w-full text-left font-body-sm text-body-sm">
              <thead>
                <tr class="text-outline uppercase font-label-sm text-[10px] tracking-wider border-b border-outline-variant/30">
                  <th class="py-2.5 px-3">Timestamp</th>
                  <th class="py-2.5 px-3">Trigger Condition</th>
                  <th class="py-2.5 px-3">Observed Delta</th>
                  <th class="py-2.5 px-3">Fallback Action Taken</th>
                  <th class="py-2.5 px-3 text-center">Confidence Post-Fix</th>
                  <th class="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-outline-variant/20">
                <tr class="hover:bg-surface-container-low/60 transition-colors">
                  <td class="py-3 px-3 font-mono text-outline text-[11px]">10:42 UTC</td>
                  <td class="py-3 px-3 font-semibold text-on-surface">Cross-Track Divergence &gt; 120km</td>
                  <td class="py-3 px-3 text-error font-semibold">+165 km Northward Shift (NCUM Baseline)</td>
                  <td class="py-3 px-3 text-on-surface-variant">Re-centered trajectory using Coupled Vorticity Center</td>
                  <td class="py-3 px-3 text-center font-bold text-secondary">91.4%</td>
                  <td class="py-3 px-3 text-center"><span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">Executed</span></td>
                </tr>
                <tr class="hover:bg-surface-container-low/60 transition-colors">
                  <td class="py-3 px-3 font-mono text-outline text-[11px]">09:15 UTC</td>
                  <td class="py-3 px-3 font-semibold text-on-surface">Orographic Snow-Rain Boundary Variance</td>
                  <td class="py-3 px-3 text-tertiary font-semibold">+350m Freezing Level Error</td>
                  <td class="py-3 px-3 text-on-surface-variant">Applied Mountain Orography MoE Expert Weighting (0.81)</td>
                  <td class="py-3 px-3 text-center font-bold text-secondary">86.2%</td>
                  <td class="py-3 px-3 text-center"><span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">Executed</span></td>
                </tr>
                <tr class="hover:bg-surface-container-low/60 transition-colors">
                  <td class="py-3 px-3 font-mono text-outline text-[11px]">08:30 UTC</td>
                  <td class="py-3 px-3 font-semibold text-on-surface">Rapid Deepening Anomaly Discrepancy</td>
                  <td class="py-3 px-3 text-tertiary font-semibold">-14 hPa/12h Deepening Error</td>
                  <td class="py-3 px-3 text-on-surface-variant">Blended SST Thermal Influx Boundary with Doppler Radiosonde</td>
                  <td class="py-3 px-3 text-center font-bold text-secondary">88.5%</td>
                  <td class="py-3 px-3 text-center"><span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">Executed</span></td>
                </tr>
                <tr class="hover:bg-surface-container-low/60 transition-colors">
                  <td class="py-3 px-3 font-mono text-outline text-[11px]">06:00 UTC</td>
                  <td class="py-3 px-3 font-semibold text-on-surface">Sea-Breeze Convergence Timing</td>
                  <td class="py-3 px-3 text-on-surface font-semibold">1.2 hr Influx Timing Lag</td>
                  <td class="py-3 px-3 text-on-surface-variant">Calibrated Coastal Surface Pressure Inversion Profile</td>
                  <td class="py-3 px-3 text-center font-bold text-secondary">94.8%</td>
                  <td class="py-3 px-3 text-center"><span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">Executed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  };

  renderContent();
}
