/**
 * Synapse SIH 2026 - Timeline & Lead Horizon Controller Component
 */
import { appState } from '../state.js';
import { LEAD_DAYS_DATA } from '../data/mockData.js';

export function renderTimelineScrubber(container) {
  if (!container) return;

  let isPlaying = false;
  let playInterval = null;

  const renderContent = () => {
    const { selectedLeadDay } = appState.getState();
    const activeLeadObj = LEAD_DAYS_DATA.find(d => d.day === selectedLeadDay) || LEAD_DAYS_DATA[3];

    container.innerHTML = `
      <div class="mt-space-md pt-space-sm bg-surface rounded-xl p-space-md shadow-xs border border-outline-variant/20">
        <div class="flex flex-wrap items-center justify-between gap-space-sm mb-space-sm">
          <div class="flex items-center gap-space-sm">
            <button id="timeline-play-btn" class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xs hover:bg-primary-container transition-all active:scale-95" type="button" title="Play 10-day continuous evolution">
              <span class="material-symbols-outlined text-[18px]">${isPlaying ? 'pause' : 'play_arrow'}</span>
            </button>
            <div>
              <span class="font-headline-sm text-headline-sm text-on-surface font-semibold">Lead Horizon: <span id="current-lead-label" class="text-primary font-bold">${activeLeadObj.day} (+${parseInt(activeLeadObj.day.replace('D+', '')) * 24}h)</span></span>
              <span class="font-label-sm text-[10px] text-outline ml-2">P(Bust): <strong class="text-error">${activeLeadObj.pBust}</strong> | P(E &gt; P90): <strong class="text-tertiary">${activeLeadObj.pE90}</strong></span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-semibold">Inference: 1,000/hr</span>
            <span class="font-label-sm text-label-sm px-2 py-0.5 rounded bg-error-container text-on-error-container font-bold">Cliff Alert: D+4 (+96h)</span>
          </div>
        </div>

        <!-- 10 Clickable Day Pills with Continuous Risk Scores -->
        <div class="grid grid-cols-5 sm:grid-cols-10 gap-1.5 select-none" id="day-pills-container">
          ${LEAD_DAYS_DATA.map(d => {
            const isActive = d.day === selectedLeadDay;
            return `
              <button data-day="${d.day}" class="day-pill flex flex-col items-center p-1.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary text-on-primary shadow-sm font-semibold ring-2 ring-primary ring-offset-1'
                  : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface'
              }" type="button">
                <span class="text-[9px] font-bold font-label-sm ${isActive ? 'text-tertiary-fixed' : d.color}">${d.confidence}</span>
                <span class="font-label-sm text-label-sm font-semibold">${d.day}</span>
                <span class="text-[8px] opacity-75 font-mono">${d.pBust}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Attach click listeners to day pills
    container.querySelectorAll('.day-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const day = btn.dataset.day;
        appState.setSelectedLeadDay(day);
      });
    });

    // Play/Pause button
    const playBtn = container.querySelector('#timeline-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
          playInterval = setInterval(() => {
            const curr = appState.getState().selectedLeadDay;
            const idx = LEAD_DAYS_DATA.findIndex(d => d.day === curr);
            const nextIdx = (idx + 1) % LEAD_DAYS_DATA.length;
            appState.setSelectedLeadDay(LEAD_DAYS_DATA[nextIdx].day);
          }, 1500);
        } else {
          clearInterval(playInterval);
        }
        renderContent();
      });
    }
  };

  renderContent();

  // Re-render when lead day changes
  appState.subscribe('leadDayChanged', () => {
    renderContent();
  });
}
