/**
 * ForecastGuard AI - Main Application Bootstrap & Orchestrator
 */
import { appState } from './state.js';
import { renderHeader } from './components/Header.js';
import { renderSidebar } from './components/Sidebar.js';
import { renderAlertBanner } from './components/AlertBanner.js';
import { renderKpiCards } from './components/KpiCards.js';
import { renderVariableFilters } from './components/VariableFilters.js';
import { renderTelemetryMap } from './components/TelemetryMap.js';
import { renderSpatioTemporalCone } from './components/SpatioTemporalCone.js';
import { renderDualModelNowNextView } from './components/DualModelNowNextView.js';
import { renderRegimeGatingView } from './components/RegimeGatingView.js';
import { renderTrajectoryFallbackView } from './components/TrajectoryFallbackView.js';
import { renderRegionInsights } from './components/RegionInsights.js';
import { renderDataMatrixTable } from './components/DataMatrixTable.js';
import { renderFooter } from './components/Footer.js';

class App {
  constructor() {
    this.init();
  }

  init() {
    // 1. Mount all core components
    renderHeader(document.getElementById('app-header'));
    renderSidebar(document.getElementById('app-sidebar'));
    renderAlertBanner(document.getElementById('app-alert-banner'));
    renderKpiCards(document.getElementById('app-kpi-cards'));
    renderVariableFilters(document.getElementById('app-variable-filters'));
    renderTelemetryMap(document.getElementById('app-telemetry-map'));
    renderSpatioTemporalCone(document.getElementById('app-spatio-temporal-track'));
    renderRegionInsights(document.getElementById('app-region-insights'));
    renderDataMatrixTable(document.getElementById('app-data-matrix'));
    renderDualModelNowNextView(document.getElementById('view-dual-model'));
    renderRegimeGatingView(document.getElementById('view-regime-gating'));
    renderTrajectoryFallbackView(document.getElementById('view-trajectory-fallback'));
    renderFooter(document.getElementById('app-footer'));

    // 2. View Switching Handler
    const viewBustTargeting = document.getElementById('view-bust-targeting');
    const viewDualModel = document.getElementById('view-dual-model');
    const viewRegimeGating = document.getElementById('view-regime-gating');
    const viewTrajectoryFallback = document.getElementById('view-trajectory-fallback');

    appState.subscribe('viewChanged', (viewId) => {
      // Hide all dynamic views first
      if (viewBustTargeting) viewBustTargeting.classList.add('hidden');
      if (viewDualModel) {
        viewDualModel.classList.add('hidden');
        viewDualModel.classList.remove('flex');
      }
      if (viewRegimeGating) {
        viewRegimeGating.classList.add('hidden');
        viewRegimeGating.classList.remove('flex');
      }
      if (viewTrajectoryFallback) {
        viewTrajectoryFallback.classList.add('hidden');
        viewTrajectoryFallback.classList.remove('flex');
      }

      // Show selected view
      if (viewId === 'dual-model-learning') {
        if (viewDualModel) {
          viewDualModel.classList.remove('hidden');
          viewDualModel.classList.add('flex');
          viewDualModel.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (viewId === 'regime-aware-fusion') {
        if (viewRegimeGating) {
          viewRegimeGating.classList.remove('hidden');
          viewRegimeGating.classList.add('flex');
          viewRegimeGating.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (viewId === 'trajectory-verification') {
        if (viewTrajectoryFallback) {
          viewTrajectoryFallback.classList.remove('hidden');
          viewTrajectoryFallback.classList.add('flex');
          viewTrajectoryFallback.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        if (viewBustTargeting) {
          viewBustTargeting.classList.remove('hidden');
          viewBustTargeting.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    // 3. Setup theme listener
    appState.subscribe('themeChanged', (isDark) => {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });

    console.info('⚡ Synapse AI initialized successfully with Dual-Model "Now" & "Next" View.');
  }
}

// Bootstrap once DOM content is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
