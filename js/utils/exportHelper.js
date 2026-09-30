/**
 * Synapse SIH 2026 - Export Helpers for CSV Reports & Blockchain Certificates
 */
import { SUBDIVISIONS_DATA } from '../data/mockData.js';
import { API_ENDPOINT_PREVIEW, BLOCKCHAIN_PROVENANCE_LEDGER } from '../data/alertFeedData.js';

export function exportTableToCSV(filename = 'Synapse_Subdivisions_Continuous_Risk.csv') {
  const headers = ['Sub-Division', 'D1', 'D2', 'D3', 'D4 (Now)', 'D5', 'D6', 'D7', 'D8-10', 'Coupled Atmospheric Driver', 'P(Bust)', 'Expected Error'];
  const rows = SUBDIVISIONS_DATA.map(item => [
    `"${item.name}"`,
    `"${item.scores.d1}"`,
    `"${item.scores.d2}"`,
    `"${item.scores.d3}"`,
    `"${item.scores.d4}"`,
    `"${item.scores.d5}"`,
    `"${item.scores.d6}"`,
    `"${item.scores.d7}"`,
    `"${item.scores.d8_10}"`,
    `"${item.dominantDriver}"`,
    `"${item.bustProb}"`,
    `"${item.expectedError}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportBlockchainCertificateJSON(filename = 'Synapse_Forecast_Bust_Certificate.json') {
  const payload = {
    team: "OAA-Synapse",
    hackathon: "Smart India Hackathon 2026",
    export_type: "Blockchain Provenance Certificate",
    generated_at: new Date().toISOString(),
    api_summary: API_ENDPOINT_PREVIEW,
    ledger_records: BLOCKCHAIN_PROVENANCE_LEDGER
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
