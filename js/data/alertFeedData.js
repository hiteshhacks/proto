/**
 * Synapse SIH 2026 - Operational Alert Feed & Blockchain Ledger Data
 */

export const OPERATIONAL_ALERTS = [
  {
    id: "SYN-ALT-2026-091",
    time: "10:42 UTC",
    severity: "Critical",
    badgeColor: "bg-error-container text-on-error-container",
    region: "Bay of Bengal (Depression Branch)",
    message: "Dual-Model divergence: 'Now' model confirms intense vortex while 'Next' evolutionary projection splits with >160km spread. Trajectory verification fallback triggered.",
    lead: "D+4",
    pBust: "78%",
    status: "Fallback Active"
  },
  {
    id: "SYN-ALT-2026-088",
    time: "09:15 UTC",
    severity: "Warning",
    badgeColor: "bg-tertiary-fixed text-on-tertiary-fixed",
    region: "Western Himalayas (HP/UK)",
    message: "Regime-aware gating network shifted weight (0.81) to Mountain Orography expert. Freezing boundary layer variance ±350m.",
    lead: "D+3",
    pBust: "65%",
    status: "Verified MoE"
  },
  {
    id: "SYN-ALT-2026-085",
    time: "08:30 UTC",
    severity: "Warning",
    badgeColor: "bg-tertiary-fixed text-on-tertiary-fixed",
    region: "Gangetic West Bengal",
    message: "Coupled atmospheric encoder flags CAPE-moisture coupling mismatch. Continuous bust risk elevated to 58%.",
    lead: "D+4",
    pBust: "58%",
    status: "Monitoring"
  },
  {
    id: "SYN-ALT-2026-079",
    time: "06:00 UTC",
    severity: "Info",
    badgeColor: "bg-surface-container-high text-on-surface-variant",
    region: "Saurashtra Coast",
    message: "Sea-breeze thermal front successfully captured by coastal dynamics encoder. Low bust probability.",
    lead: "D+1",
    pBust: "42%",
    status: "Nominal"
  }
];

export const BLOCKCHAIN_PROVENANCE_LEDGER = [
  {
    certificateId: "SYN-CERT-2026-B8842",
    sector: "Odisha & Coastal AP",
    leadHorizon: "D+4 (+96h)",
    pBust: "78%",
    sha256Hash: "0x7f8a92b0c1e8432a9d4e5f67b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7",
    timestamp: "2025-05-18T00:00:00Z",
    modelVersion: "Synapse-DualModel-v2.6 (Coupled)",
    status: "Immutable On-Chain"
  },
  {
    certificateId: "SYN-CERT-2026-H3102",
    sector: "Western Himalayas",
    leadHorizon: "D+3 (+72h)",
    pBust: "65%",
    sha256Hash: "0x3e1f8b4a2c9d0e5a6f7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9",
    timestamp: "2025-05-18T00:00:00Z",
    modelVersion: "Synapse-DualModel-v2.6 (Coupled)",
    status: "Immutable On-Chain"
  },
  {
    certificateId: "SYN-CERT-2026-G7719",
    sector: "Gujarat & Saurashtra",
    leadHorizon: "D+4 (+96h)",
    pBust: "42%",
    sha256Hash: "0x8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9",
    timestamp: "2025-05-18T00:00:00Z",
    modelVersion: "Synapse-DualModel-v2.6 (Coupled)",
    status: "Immutable On-Chain"
  },
  {
    certificateId: "SYN-CERT-2026-W4490",
    sector: "Gangetic West Bengal",
    leadHorizon: "D+4 (+96h)",
    pBust: "58%",
    sha256Hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2",
    timestamp: "2025-05-18T00:00:00Z",
    modelVersion: "Synapse-DualModel-v2.6 (Coupled)",
    status: "Immutable On-Chain"
  }
];

export const API_ENDPOINT_PREVIEW = {
  endpoint: "/api/v1/synapse/continuous-bust-prediction",
  method: "POST",
  status: 200,
  solution: "Synapse SIH 2026 - Dual-Model NWP Bust System",
  architecture: {
    model_type: "Dual-Model Behaviour Co-Training ('Now' State + 'Next' Evolution)",
    atmospheric_coupling: "Unified 4-Variable Coupling (Pressure, Vorticity, Humidity, Sea Pressure)",
    fusion_engine: "Regime-Aware Mixture of Experts (MoE Gating)",
    verification_layer: "Trajectory-Based Fallback & Verification Engine",
    provenance: "SHA-256 Blockchain Immutable Certificate Ledger"
  },
  inference_metrics: {
    throughput: "1,000 runs/hour (Input-Stage Ensembling)",
    lead_time_coverage: "Day 1 - Day 10 (Continuous Horizon)",
    overall_basin_reliability_pct: 68.4,
    delta_vs_d1_cycle: -4.2
  },
  active_prediction: {
    sector_id: "odisha-coastal-ap",
    lead_day: "D+4",
    continuous_risk: {
      p_bust_pct: 78.0,
      p_error_exceeds_p50_pct: 84.0,
      p_error_exceeds_p90_pct: 65.0,
      expected_error_mm_day: 48.0
    },
    dual_model_status: {
      now_model: "Intense Tropical Vortex (996 hPa, 45 kts)",
      next_model: "Track Bifurcation divergence at +96h"
    },
    blockchain_provenance: {
      certificate_id: "SYN-CERT-2026-B8842",
      sha256: "0x7f8a92b0c1e8432a9d4e5f67b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7",
      timestamp: "2025-05-18T00:00:00Z"
    }
  }
};
