/**
 * Synapse SIH 2026 - Sub-continental Telemetry Canvas & SVG Map Component
 */
import { appState } from '../state.js';

export function renderTelemetryMap(container) {
  if (!container) return;

  container.innerHTML = `
    <div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm relative overflow-hidden flex flex-col">
      <!-- Map Canvas Header & Floating Controls -->
      <div class="flex items-center justify-between pb-space-sm mb-space-sm">
        <div class="flex items-center gap-space-sm">
          <span class="font-headline-sm text-headline-sm text-on-surface font-semibold">Continuous Bust Risk Map</span>
          <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-outline">Stage 6: Target Priority</span>
        </div>
        <div class="flex items-center gap-1 bg-surface-container-high p-1 rounded-lg">
          <button id="map-zoom-in" class="w-7 h-7 rounded bg-surface-container-lowest text-on-surface hover:bg-surface flex items-center justify-center shadow-xs transition-transform active:scale-95" title="Zoom in" type="button">
            <span class="material-symbols-outlined text-[16px]">add</span>
          </button>
          <button id="map-zoom-out" class="w-7 h-7 rounded bg-surface-container-lowest text-on-surface hover:bg-surface flex items-center justify-center shadow-xs transition-transform active:scale-95" title="Zoom out" type="button">
            <span class="material-symbols-outlined text-[16px]">remove</span>
          </button>
          <button id="map-reset-view" class="w-7 h-7 rounded bg-surface-container-lowest text-on-surface hover:bg-surface flex items-center justify-center shadow-xs transition-transform active:scale-95" title="Reset View" type="button">
            <span class="material-symbols-outlined text-[16px]">restart_alt</span>
          </button>
          <button id="map-toggle-layers" class="w-7 h-7 rounded bg-surface-container-lowest text-on-surface hover:bg-surface flex items-center justify-center shadow-xs transition-transform active:scale-95" title="Layers" type="button">
            <span class="material-symbols-outlined text-[16px]">layers</span>
          </button>
        </div>
      </div>

      <!-- Geospatial Canvas Simulation (SVG Continuous Risk Overlay) -->
      <div class="relative w-full aspect-[4/3] rounded-lg bg-surface-container-low overflow-hidden flex items-center justify-center" id="map-viewport">
        <!-- Base Map Vector SVG of Indian Subcontinent & Ocean Basins -->
        <svg id="subcontinent-svg" class="w-full h-full select-none transition-transform duration-300" viewBox="0 0 600 520">
          <defs>
            <!-- Continuous Heatmap Gradients (Soft Greens, Butter Yellows, Soft Rose) -->
            <radialGradient id="bustGradientOdisha" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FECDD3" stop-opacity="0.85"></stop>
              <stop offset="60%" stop-color="#FDE68A" stop-opacity="0.5"></stop>
              <stop offset="100%" stop-color="#A7F3D0" stop-opacity="0"></stop>
            </radialGradient>
            <radialGradient id="bustGradientHimalaya" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FECDD3" stop-opacity="0.75"></stop>
              <stop offset="50%" stop-color="#FDE68A" stop-opacity="0.4"></stop>
              <stop offset="100%" stop-color="#A7F3D0" stop-opacity="0"></stop>
            </radialGradient>
            <radialGradient id="bustGradientGujarat" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FDE68A" stop-opacity="0.6"></stop>
              <stop offset="70%" stop-color="#A7F3D0" stop-opacity="0.3"></stop>
              <stop offset="100%" stop-color="#A7F3D0" stop-opacity="0"></stop>
            </radialGradient>
            <pattern id="gridOverlay" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#dae2fd" stroke-width="0.75" stroke-dasharray="2 2"></path>
            </pattern>
          </defs>

          <!-- Ocean Basins Background Water -->
          <rect width="600" height="520" fill="#f2f3ff"></rect>
          
          <!-- Lat/Long Coordinate Grid Lines -->
          <rect width="600" height="520" fill="url(#gridOverlay)"></rect>
          
          <!-- Ocean Basin Annotations -->
          <text x="70" y="380" class="fill-outline/50 font-label-md text-label-md tracking-widest uppercase font-semibold">Arabian Sea</text>
          <text x="440" y="380" class="fill-outline/50 font-label-md text-label-md tracking-widest uppercase font-semibold">Bay of Bengal</text>
          <text x="240" y="525" class="fill-outline/50 font-label-md text-label-md tracking-widest uppercase font-semibold">Indian Ocean</text>

          <!-- High-Precision Geographically Accurate Map of India (Official Survey Alignment) -->
          <g id="india-landmass-group">
            <!-- India Mainland -->
            <path id="india-mainland" d="M 280,24 C 292,22 308,26 320,38 C 328,46 335,62 334,78 C 333,88 325,98 324,110 C 328,120 345,130 365,140 C 385,150 405,160 425,170 C 438,175 448,182 458,188 C 460,184 462,170 468,170 C 474,170 476,184 480,188 C 488,188 500,186 512,184 C 520,178 532,158 548,152 C 560,148 574,158 572,172 C 570,184 558,198 548,210 C 542,222 538,236 532,252 C 528,264 524,282 516,294 C 510,300 504,298 502,286 C 498,272 492,260 484,260 C 476,260 472,270 466,276 C 472,255 484,250 494,244 C 496,236 478,232 466,234 C 454,242 444,262 438,284 C 435,298 428,312 422,320 C 412,332 396,352 380,374 C 370,388 358,408 346,430 C 336,446 322,468 310,488 C 304,500 296,508 290,508 C 284,508 280,500 276,482 C 270,462 264,432 256,396 C 250,364 242,330 232,298 C 225,272 218,248 210,230 C 212,222 214,212 204,210 C 192,210 172,212 155,222 C 142,232 135,248 144,258 C 156,266 178,266 190,256 C 196,248 200,240 204,236 C 182,232 162,230 146,235 C 134,238 126,232 132,220 C 118,222 106,212 108,200 C 112,188 132,182 152,185 C 164,188 174,180 180,170 C 188,155 194,140 204,122 C 214,108 226,92 236,75 C 244,62 250,50 260,40 C 266,32 274,26 280,24 Z" fill="#ffffff" stroke="#bfc7d2" stroke-width="1.6" stroke-linejoin="round"></path>
            
            <!-- Andaman and Nicobar Islands Archipelago -->
            <path id="andaman-islands" d="M 495,392 C 498,388 501,396 499,414 C 497,424 494,435 496,444 C 498,450 494,453 492,446 C 490,436 493,414 495,392 Z M 493,458 C 496,458 496,464 493,464 C 490,464 490,458 493,458 Z M 500,476 C 503,476 503,482 500,482 C 497,482 497,476 500,476 Z M 504,488 C 507,488 507,494 504,494 C 501,494 501,488 504,488 Z M 508,502 C 512,499 515,508 512,516 C 509,519 506,510 508,502 Z" fill="#ffffff" stroke="#bfc7d2" stroke-width="1.2"></path>
            
            <!-- Lakshadweep Islands Archipelago -->
            <path id="lakshadweep-islands" d="M 212,426 C 215,426 215,432 212,432 C 209,432 209,426 212,426 Z M 208,444 C 211,444 211,450 208,450 C 205,450 205,444 208,444 Z M 214,462 C 217,462 217,468 214,468 C 211,468 211,462 214,462 Z" fill="#ffffff" stroke="#bfc7d2" stroke-width="1.2"></path>
          </g>
          
          <!-- Sri Lanka -->
          <path d="M 314,488 C 322,482 328,495 325,508 C 320,514 313,506 314,488 Z" fill="#ffffff" stroke="#bfc7d2" stroke-width="1.2"></path>
          
          <!-- Internal Regional Boundaries & Synoptic Lineaments -->
          <path d="M 280,24 Q 288,65 330,95" fill="none" stroke="#dae2fd" stroke-width="1"></path>
          <path d="M 204,122 Q 280,140 425,170" fill="none" stroke="#dae2fd" stroke-width="1"></path>
          <path d="M 180,170 Q 250,185 365,220" fill="none" stroke="#dae2fd" stroke-width="1"></path>
          <path d="M 210,230 Q 290,245 422,320" fill="none" stroke="#dae2fd" stroke-width="1"></path>
          <path d="M 232,298 Q 285,320 380,374" fill="none" stroke="#dae2fd" stroke-width="1"></path>
          <path d="M 256,396 Q 285,420 322,468" fill="none" stroke="#dae2fd" stroke-width="1"></path>
          <path d="M 458,188 Q 480,215 512,240" fill="none" stroke="#dae2fd" stroke-width="1"></path>

          <!-- Heatmap Layer Group -->
          <g id="layer-group-pastel">
            <!-- Stable Green Zone (Peninsula) -->
            <circle cx="275" cy="420" r="55" fill="#A7F3D0" opacity="0.45"></circle>
            <!-- Stable Green Zone (Central) -->
            <circle cx="290" cy="220" r="50" fill="#A7F3D0" opacity="0.4"></circle>
            <!-- Zone 3: Gujarat / Saurashtra -->
            <circle cx="165" cy="220" r="42" fill="url(#bustGradientGujarat)"></circle>
            <!-- Zone 2: Western Himalayas (65% Continuous Risk) -->
            <ellipse cx="285" cy="90" rx="48" ry="30" fill="url(#bustGradientHimalaya)"></ellipse>
            <!-- Zone 1: Odisha & North Bay (78% Continuous Risk) -->
            <ellipse cx="385" cy="300" rx="65" ry="50" fill="url(#bustGradientOdisha)"></ellipse>
          </g>

          <!-- Trajectory Fallback Hazard Polygons Group -->
          <g id="layer-group-polygons">
            <polygon points="350,270 420,285 435,330 380,345 345,310" fill="none" stroke="#ba1a1a" stroke-width="2" stroke-dasharray="4 4" class="hazard-polygon-pulse"></polygon>
            <polygon points="255,80 320,70 330,105 265,115" fill="none" stroke="#825100" stroke-width="1.8" stroke-dasharray="3 3"></polygon>
          </g>

          <!-- Coupled Atmospheric Isobars Group -->
          <g id="layer-group-isobars">
            <path d="M 160,260 Q 270,275 450,230" fill="none" stroke="#707881" stroke-width="0.8" stroke-dasharray="2 3" opacity="0.6"></path>
            <path d="M 170,290 Q 280,305 440,260" fill="none" stroke="#707881" stroke-width="0.8" stroke-dasharray="2 3" opacity="0.6"></path>
          </g>

          <!-- Interactive Callout Pins -->
          <!-- Pin: Odisha & Bay (Dual-Model Highlight) -->
          <g class="cursor-pointer map-callout-pin" data-sector="odisha" transform="translate(385, 300)">
            <circle cx="0" cy="0" r="10" fill="#ba1a1a" fill-opacity="0.25" class="animate-ping"></circle>
            <circle cx="0" cy="0" r="5" fill="#ba1a1a"></circle>
            <rect x="12" y="-22" width="176" height="42" rx="6" fill="#ffffff" stroke="#bfc7d2" stroke-width="0.8" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))"></rect>
            <text x="20" y="-8" class="fill-on-surface font-headline-sm text-[11px] font-bold">Bay &amp; Odisha Coast</text>
            <text x="20" y="8" class="fill-error font-label-sm text-[10px] font-bold">P(Bust) 78% • 'Next' Divergence</text>
          </g>

          <!-- Pin: Western Himalayas (Sector 2) -->
          <g class="cursor-pointer map-callout-pin" data-sector="himalayas" transform="translate(285, 90)">
            <circle cx="0" cy="0" r="4" fill="#825100"></circle>
            <rect x="12" y="-18" width="150" height="34" rx="6" fill="#ffffff" stroke="#bfc7d2" stroke-width="0.8"></rect>
            <text x="18" y="-6" class="fill-on-surface font-headline-sm text-[10px] font-bold">Western Himalayas</text>
            <text x="18" y="8" class="fill-tertiary font-label-sm text-[9px] font-bold">P(Bust) 65% • MoE Orography</text>
          </g>

          <!-- Pin: Gujarat (Sector 3) -->
          <g class="cursor-pointer map-callout-pin" data-sector="gujarat" transform="translate(165, 220)">
            <circle cx="0" cy="0" r="3.5" fill="#00714d"></circle>
            <rect x="-132" y="10" width="142" height="28" rx="6" fill="#ffffff" stroke="#bfc7d2" stroke-width="0.8"></rect>
            <text x="-126" y="22" class="fill-on-surface font-headline-sm text-[10px] font-bold">Gujarat Coastal</text>
            <text x="-126" y="32" class="fill-secondary font-label-sm text-[9px] font-bold">P(Bust) 42% • Coupled Inversion</text>
          </g>

          <!-- Pin: Andhra Coast / Peninsula -->
          <g class="cursor-pointer map-callout-pin" data-sector="peninsula" transform="translate(275, 420)">
            <circle cx="0" cy="0" r="3" fill="#006194"></circle>
            <rect x="8" y="-16" width="128" height="30" rx="5" fill="#131b2e" opacity="0.9"></rect>
            <text x="14" y="-4" class="font-label-sm text-[9px] font-bold" fill="#ffffff">Peninsular Interior</text>
            <text x="14" y="8" class="font-label-sm text-[9px] font-bold" fill="#6cf8bb">Trust: 84% (Low Continuous Risk)</text>
          </g>
        </svg>

        <!-- Floating Map Legend (Bottom-Right) -->
        <div class="absolute bottom-3 right-3 bg-surface-container-lowest/95 backdrop-blur-sm p-space-sm rounded-lg shadow-md max-w-xs border border-outline-variant/30">
          <div class="flex items-center justify-between mb-1">
            <span class="font-label-sm text-[10px] text-on-surface font-bold uppercase tracking-wider">Continuous Risk P(Bust)</span>
            <span class="font-label-sm text-[9px] text-primary font-bold">0.0 – 1.0</span>
          </div>
          <div class="w-48 h-2.5 rounded-full bg-gradient-to-r from-[#A7F3D0] via-[#FDE68A] to-[#FECDD3] mb-1"></div>
          <div class="flex justify-between font-label-sm text-[9px] text-outline font-medium">
            <span>0% High Trust</span>
            <span>50% Spread</span>
            <span>100% Critical Bust</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach interactive click on pins to select sector
  container.querySelectorAll('.map-callout-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      const sectorId = pin.dataset.sector;
      if (sectorId) {
        appState.setSelectedSector(sectorId);
      }
    });
  });

  // Layer toggle listener
  appState.subscribe('layerToggled', ({ layerKey, isChecked }) => {
    if (layerKey === 'pastelConfidence') {
      const g = container.querySelector('#layer-group-pastel');
      if (g) g.style.display = isChecked ? 'block' : 'none';
    } else if (layerKey === 'bustIsobars') {
      const g = container.querySelector('#layer-group-isobars');
      if (g) g.style.display = isChecked ? 'block' : 'none';
    } else if (layerKey === 'pulsingPolygons') {
      const g = container.querySelector('#layer-group-polygons');
      if (g) g.style.display = isChecked ? 'block' : 'none';
    }
  });

  // Zoom controls
  let currentZoom = 1;
  const svg = container.querySelector('#subcontinent-svg');
  container.querySelector('#map-zoom-in')?.addEventListener('click', () => {
    if (currentZoom < 1.6) {
      currentZoom += 0.15;
      svg.style.transform = `scale(${currentZoom})`;
    }
  });
  container.querySelector('#map-zoom-out')?.addEventListener('click', () => {
    if (currentZoom > 0.85) {
      currentZoom -= 0.15;
      svg.style.transform = `scale(${currentZoom})`;
    }
  });
  container.querySelector('#map-reset-view')?.addEventListener('click', () => {
    currentZoom = 1;
    svg.style.transform = `scale(1)`;
  });
}
