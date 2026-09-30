/**
 * ForecastGuard AI - Utility Formatters
 */

export function getConfidenceBadgeClass(confidence) {
  const val = typeof confidence === 'number' ? confidence : parseInt(confidence, 10);
  if (val >= 80) {
    return 'bg-secondary-fixed text-on-secondary-fixed';
  } else if (val >= 50) {
    return 'bg-tertiary-fixed text-on-tertiary-fixed';
  } else {
    return 'bg-error-container text-on-error-container';
  }
}

export function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
