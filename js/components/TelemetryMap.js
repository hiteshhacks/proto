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
          <text x="240" y="500" class="fill-outline/50 font-label-md text-label-md tracking-widest uppercase font-semibold">Indian Ocean</text>

          <!-- Stylized Indian Subcontinent Landmass Polygon -->
          <path d="M 230,50 L 260,35 L 290,45 L 320,65 L 350,90 L 375,100 L 440,115 L 480,125 L 530,130 L 540,165 L 505,185 L 470,180 L 450,210 L 410,230 L 400,280 L 370,335 L 335,395 L 310,430 L 295,445 L 285,430 L 275,370 L 250,330 L 210,300 L 195,255 L 180,245 L 170,225 L 215,205 L 205,170 L 190,135 L 205,100 Z" fill="#ffffff" stroke="#bfc7d2" stroke-width="1.5" stroke-linejoin="round"></path>
          
          <!-- Sri Lanka -->
          <path d="M 320,445 C 330,440 338,455 330,470 C 322,468 318,455 320,445 Z" fill="#ffffff" stroke="#bfc7d2" stroke-width="1.2"></path>
          
          <!-- State Subdivision Internal Boundaries (Soft Slate) -->
          <path d="M 230,50 Q 280,80 320,110" fill="none" stroke="#dae2fd" stroke-width="1"></path>
          <path d="M 240,130 Q 320,150 410,175" fill="none" stroke="#dae2fd" stroke-width="1"></path>
          <path d="M 220,220 Q 280,260 300,380" fill="none" stroke="#dae2fd" stroke-width="1"></path>
          <path d="M 310,230 Q 360,280 350,370" fill="none" stroke="#dae2fd" stroke-width="1"></path>
          <path d="M 220,220 L 370,220" fill="none" stroke="#dae2fd" stroke-width="1"></path>

          <!-- Heatmap Layer Group -->
          <g id="layer-group-pastel">
            <!-- Stable Green Zone (Peninsula) -->
            <circle cx="280" cy="340" r="65" fill="#A7F3D0" opacity="0.45"></circle>
            <!-- Stable Green Zone (Central/MP) -->
            <circle cx="290" cy="190" r="55" fill="#A7F3D0" opacity="0.4"></circle>
            <!-- Zone 3: Gujarat / Saurashtra -->
            <circle cx="205" cy="225" r="48" fill="url(#bustGradientGujarat)"></circle>
            <!-- Zone 2: Western Himalayas (65% Continuous Risk) -->
            <ellipse cx="270" cy="85" rx="55" ry="35" fill="url(#bustGradientHimalaya)"></ellipse>
            <!-- Zone 1: Odisha & North Bay (78% Continuous Risk) -->
            <ellipse cx="400" cy="245" rx="75" ry="60" fill="url(#bustGradientOdisha)"></ellipse>
          </g>

          <!-- Trajectory Fallback Hazard Polygons Group -->
          <g id="layer-group-polygons">
            <polygon points="365,210 435,225 450,270 395,285 360,250" fill="none" stroke="#ba1a1a" stroke-width="2" stroke-dasharray="4 4" class="hazard-polygon-pulse"></polygon>
            <polygon points="240,75 305,65 315,100 250,110" fill="none" stroke="#825100" stroke-width="1.8" stroke-dasharray="3 3"></polygon>
          </g>

          <!-- Coupled Atmospheric Isobars Group -->
          <g id="layer-group-isobars">
            <path d="M 170,260 Q 280,275 460,230" fill="none" stroke="#707881" stroke-width="0.8" stroke-dasharray="2 3" opacity="0.6"></path>
            <path d="M 180,290 Q 290,305 450,260" fill="none" stroke="#707881" stroke-width="0.8" stroke-dasharray="2 3" opacity="0.6"></path>
          </g>

          <!-- Interactive Callout Pins -->
          <!-- Pin: Odisha & Bay (Dual-Model Highlight) -->
          <g class="cursor-pointer map-callout-pin" data-sector="odisha" transform="translate(390, 220)">
            <circle cx="0" cy="0" r="10" fill="#ba1a1a" fill-opacity="0.25" class="animate-ping"></circle>
            <circle cx="0" cy="0" r="5" fill="#ba1a1a"></circle>
            <rect x="12" y="-22" width="176" height="42" rx="6" fill="#ffffff" stroke="#bfc7d2" stroke-width="0.8" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))"></rect>
            <text x="20" y="-8" class="fill-on-surface font-headline-sm text-[11px] font-bold">Bay &amp; Odisha Coast</text>
            <text x="20" y="8" class="fill-error font-label-sm text-[10px] font-bold">P(Bust) 78% • 'Next' Divergence</text>
          </g>

          <!-- Pin: Western Himalayas (Sector 2) -->
          <g class="cursor-pointer map-callout-pin" data-sector="himalayas" transform="translate(270, 75)">
            <circle cx="0" cy="0" r="4" fill="#825100"></circle>
            <rect x="12" y="-18" width="150" height="34" rx="6" fill="#ffffff" stroke="#bfc7d2" stroke-width="0.8"></rect>
            <text x="18" y="-6" class="fill-on-surface font-headline-sm text-[10px] font-bold">Western Himalayas</text>
            <text x="18" y="8" class="fill-tertiary font-label-sm text-[9px] font-bold">P(Bust) 65% • MoE Orography</text>
          </g>

          <!-- Pin: Gujarat (Sector 3) -->
          <g class="cursor-pointer map-callout-pin" data-sector="gujarat" transform="translate(195, 235)">
            <circle cx="0" cy="0" r="3.5" fill="#00714d"></circle>
            <rect x="-132" y="10" width="142" height="28" rx="6" fill="#ffffff" stroke="#bfc7d2" stroke-width="0.8"></rect>
            <text x="-126" y="22" class="fill-on-surface font-headline-sm text-[10px] font-bold">Gujarat Coastal</text>
            <text x="-126" y="32" class="fill-secondary font-label-sm text-[9px] font-bold">P(Bust) 42% • Coupled Inversion</text>
          </g>

          <!-- Pin: Andhra Coast / Peninsula -->
          <g class="cursor-pointer map-callout-pin" data-sector="peninsula" transform="translate(340, 310)">
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
