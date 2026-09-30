/**
 * ForecastGuard AI - Centralized Reactive State & Event Dispatcher
 */
import { SUBDIVISIONS_DATA, INITIAL_METRICS, LEAD_DAYS_DATA } from './data/mockData.js';

class StateManager {
  constructor() {
    this.state = {
      selectedModel: 'ncmrwf',
      selectedCycle: '2025-05-18 00Z',
      activeVariable: 'precipitation',
      activeSynopticRegime: 'monsoon-trough',
      selectedLeadDay: 'D+4',
      selectedSectorId: 'odisha',
      activeTab: 'matrix', // 'matrix' | 'alerts' | 'json'
      activeView: 'bust-targeting-map', // 'bust-targeting-map' | 'dual-model-learning' | etc.
      searchQuery: '',
      isSimulating: true,
      darkMode: false,
      gisLayers: {
        pastelConfidence: true,
        bustIsobars: true,
        pulsingPolygons: true,
        ensembleSpread: false
      },
      metrics: { ...INITIAL_METRICS },
      leadDays: [...LEAD_DAYS_DATA],
      subdivisions: [...SUBDIVISIONS_DATA]
    };

    this.listeners = new Map();
  }

  // Get current snapshot of state
  getState() {
    return this.state;
  }

  // Get active subdivision details
  getSelectedSector() {
    return this.state.subdivisions.find(s => s.id === this.state.selectedSectorId) || this.state.subdivisions[0];
  }

  // Subscribe to changes: returns unsubscribe function
  subscribe(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key).add(callback);
    return () => this.listeners.get(key).delete(callback);
  }

  // Emit event to subscribers
  notify(key, payload) {
    if (this.listeners.has(key)) {
      this.listeners.get(key).forEach(cb => cb(payload, this.state));
    }
    // Also notify global wildcard listeners
    if (this.listeners.has('*')) {
      this.listeners.get('*').forEach(cb => cb(key, payload, this.state));
    }
  }

  // Setters with targeted notifications
  setSelectedSector(sectorId) {
    this.state.selectedSectorId = sectorId;
    this.notify('sectorChanged', this.getSelectedSector());
  }

  setSelectedLeadDay(leadDay) {
    this.state.selectedLeadDay = leadDay;
    this.notify('leadDayChanged', leadDay);
  }

  setActiveVariable(variableId) {
    this.state.activeVariable = variableId;
    this.notify('variableChanged', variableId);
  }

  setActiveTab(tabId) {
    this.state.activeTab = tabId;
    this.notify('tabChanged', tabId);
  }

  setActiveView(viewId) {
    this.state.activeView = viewId;
    this.notify('viewChanged', viewId);
  }

  setSearchQuery(query) {
    this.state.searchQuery = query;
    this.notify('searchChanged', query);
  }

  toggleGisLayer(layerKey, isChecked) {
    this.state.gisLayers[layerKey] = isChecked;
    this.notify('layerToggled', { layerKey, isChecked });
  }

  toggleTheme() {
    this.state.darkMode = !this.state.darkMode;
    this.notify('themeChanged', this.state.darkMode);
  }
}

export const appState = new StateManager();
