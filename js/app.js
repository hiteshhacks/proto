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
    renderFooter(document.getElementById('app-footer'));

    // 2. Setup theme listener
    appState.subscribe('themeChanged', (isDark) => {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });

    console.info('⚡ Synapse AI initialized successfully with Spatio-Temporal Cone & Track Trajectory.');
  }
}

// Bootstrap once DOM content is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
