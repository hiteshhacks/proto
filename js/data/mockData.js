/**
 * Synapse SIH 2026 - NWP Continuous Bust Prediction & Dual-Model Surveillance System
 * Realistic datasets reflecting:
 * - Dual-Model Behaviour Learning ('Now' vs 'Next')
 * - Unified Atmospheric Coupling (Pressure, Vorticity, Humidity, Sea Pressure)
 * - Continuous Risk Probability (P(Bust), P(E > P50), P(E > P90), E[E])
 * - Trajectory-Based Verification & Fallback
 * - Regime-Aware Mixture of Experts Gating
 * - Blockchain-Backed Provenance Certificates
 */

export const INITIAL_METRICS = {
  basinConfidence: {
    value: "68.4%",
    delta: "-4.2%",
    status: "Continuous Reliability",
    subtext: "Input-level ensembling • 1,000 inf/hr",
    syncTime: "Synced 2m ago",
    sparkline: [18, 10, 22, 14, 26]
  },
  highestRiskSector: {
    name: "Bay Depression & Odisha Coast",
    bustProb: "78%",
    leadHorizon: "Lead D+4 (+96h)",
    driver: "Dual-Model 'Now'/'Next' Track Divergence",
    trackSpread: "±165 km | Coupled Vorticity",
    alertLevel: "Continuous Risk Alert"
  },
  errorRegimes: {
    count: 3,
    title: "4 Active Experts",
    monitored: "MoE Gating Active",
    tags: ["Tropical Cyclone", "Monsoon Trough", "Western Disturbance"],
    subtext: "Coupled Atmospheric Encoder",
    subDivisionsCount: "9 Sub-divisions"
  },
  predictabilityCliff: {
    cliffDay: "Day 4",
    leadTime: "(+96h)",
    leadWindow: "Lead Window D+4-D+6",
    drop: "P(E > P90) = 78%",
    horizon: "Trajectory Verification Trigger",
    note: "Fallback Verification Layer Active",
    badge: "Continuous Cliff"
  }
};

export const LEAD_DAYS_DATA = [
  { day: "D+1", label: "D+1", confidence: "94%", risk: "low", color: "text-secondary", pBust: "6%", pE90: "4%" },
  { day: "D+2", label: "D+2", confidence: "91%", risk: "low", color: "text-secondary", pBust: "9%", pE90: "7%" },
  { day: "D+3", label: "D+3", confidence: "82%", risk: "low", color: "text-secondary", pBust: "18%", pE90: "14%" },
  { day: "D+4", label: "D+4", confidence: "68%", risk: "medium", color: "text-tertiary-fixed", pBust: "78%", pE90: "65%", active: true },
  { day: "D+5", label: "D+5", confidence: "54%", risk: "medium", color: "text-tertiary", pBust: "62%", pE90: "58%" },
  { day: "D+6", label: "D+6", confidence: "48%", risk: "medium", color: "text-tertiary", pBust: "54%", pE90: "50%" },
  { day: "D+7", label: "D+7", confidence: "38%", risk: "high", color: "text-error", pBust: "72%", pE90: "69%" },
  { day: "D+8", label: "D+8", confidence: "32%", risk: "high", color: "text-error", pBust: "81%", pE90: "77%" },
  { day: "D+9", label: "D+9", confidence: "27%", risk: "high", color: "text-error", pBust: "86%", pE90: "82%" },
  { day: "D+10", label: "D+10", confidence: "22%", risk: "high", color: "text-error", pBust: "91%", pE90: "88%" }
];

export const SUBDIVISIONS_DATA = [
  {
    id: "odisha",
    name: "Odisha & Coastal AP",
    radarType: "Dual-Model Co-Trained",
    statusColor: "bg-error",
    scores: {
      d1: "96%", d2: "92%", d3: "81%", d4: "38%", d5: "29%",
      d6: "22%", d7: "19%", d8_10: "14%"
    },
    dominantDriver: "Coupled Vorticity & MSLP Deepening Bias",
    bustProb: "78%",
    pE50: "84%",
    pE90: "65%",
    expectedError: "±48 mm/day",
    bustProbColor: "text-error",
    confidence: 38,
    riskLevel: "High Continuous Bust Risk",
    probDelta: "▲ +14% vs D-1",
    spreadSigma: "2.4 m/s",
    trackError: "±165 km",
    dualModelSplit: {
      nowState: "Present State: Deep Depression (996 hPa, 45 kts, High Vorticity)",
      nextEvolution: "Evolutionary Projection: Rapid Track Bifurcation at D+4 towards Coastal Landfall"
    },
    coupledVariables: [
      { name: "Coupled Vorticity & 850hPa Shear", value: 84, color: "bg-error", textColor: "text-error" },
      { name: "Sea Pressure & MSLP Influx Bias", value: 68, color: "bg-tertiary", textColor: "text-tertiary" },
      { name: "Atmospheric Moisture Flux Coupling", value: 52, color: "bg-primary", textColor: "text-primary" },
      { name: "Spatio-Temporal Error Field", value: 41, color: "bg-outline", textColor: "text-outline" }
    ],
    regimeGating: {
      activeExpert: "Tropical Cyclone & Bay Depression Expert (Weight: 0.74)",
      fallbackStatus: "Trajectory Verification Active • Fallback Ready"
    },
    blockchainCertificate: {
      certificateId: "SYN-CERT-2026-B8842",
      sha256Hash: "0x7f8a92b0c1e8432a9d4e5f67b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7",
      timestamp: "2025-05-18T00:00:00Z",
      status: "Verified & Immutable on Ledger"
    },
    diagnosis: "Unified atmospheric coupling detects rapid shear-vorticity imbalance over North Bay. Dual-model architecture isolates 'now' central vortex and projects divergent 'next' trajectories across GraphCast / NCUM ensemble baselines.",
    historicalMatches: [
      { event: "2020 Cyclone Amphan", note: "+160 km Northward Track Bias", tag: "Continuous Bust (82%)", tagColor: "bg-error-container text-on-error-container" },
      { event: "2019 Cyclone Fani", note: "Deterministic Lock at D-3", tag: "Verified High Trust", tagColor: "bg-secondary-fixed text-on-secondary-fixed" }
    ]
  },
  {
    id: "himalayas",
    name: "Western Himalayas (HP/UK)",
    radarType: "Orographic Spatio-Temporal",
    statusColor: "bg-tertiary",
    scores: {
      d1: "94%", d2: "88%", d3: "71%", d4: "44%", d5: "36%",
      d6: "31%", d7: "25%", d8_10: "18%"
    },
    dominantDriver: "Coupled Orographic Lifting & Freezing Boundary",
    bustProb: "65%",
    pE50: "72%",
    pE90: "54%",
    expectedError: "±32 mm/day",
    bustProbColor: "text-tertiary",
    confidence: 44,
    riskLevel: "Moderate-High Continuous Risk",
    probDelta: "▲ +8% vs D-1",
    spreadSigma: "1.9 m/s",
    trackError: "±95 km",
    dualModelSplit: {
      nowState: "Present State: Western Disturbance Inflow with +350m Freezing Line",
      nextEvolution: "Evolutionary Projection: Snow-to-Rain Phase Bust in Windward Ridges"
    },
    coupledVariables: [
      { name: "Coupled Orographic Cloud Microphysics", value: 76, color: "bg-tertiary", textColor: "text-tertiary" },
      { name: "Boundary Layer Temperature-Pressure Coupling", value: 64, color: "bg-tertiary", textColor: "text-tertiary" },
      { name: "Upper Tropospheric Jet Streak Alignment", value: 48, color: "bg-primary", textColor: "text-primary" },
      { name: "Surface Albedo-Moisture Feedback", value: 35, color: "bg-outline", textColor: "text-outline" }
    ],
    regimeGating: {
      activeExpert: "Western Disturbance & Mountain Orography Expert (Weight: 0.81)",
      fallbackStatus: "Trajectory Verification Active"
    },
    blockchainCertificate: {
      certificateId: "SYN-CERT-2026-H3102",
      sha256Hash: "0x3e1f8b4a2c9d0e5a6f7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9",
      timestamp: "2025-05-18T00:00:00Z",
      status: "Verified & Immutable on Ledger"
    },
    diagnosis: "Unresolved steep terrain gradients cause sub-grid parameterized orographic precipitation over-estimation in windward slopes.",
    historicalMatches: [
      { event: "2023 North India Deluge", note: "Orographic Wave Amplification", tag: "Continuous Bust (74%)", tagColor: "bg-error-container text-on-error-container" },
      { event: "2021 Winter Western Disturbance", note: "Snow line matched within 200m", tag: "Verified High Trust", tagColor: "bg-secondary-fixed text-on-secondary-fixed" }
    ]
  },
  {
    id: "gujarat",
    name: "Gujarat & Saurashtra",
    radarType: "Coupled Coastal Dynamics",
    statusColor: "bg-secondary",
    scores: {
      d1: "98%", d2: "93%", d3: "85%", d4: "66%", d5: "58%",
      d6: "47%", d7: "39%", d8_10: "30%"
    },
    dominantDriver: "Coupled Sea-Breeze & Thermal Influx",
    bustProb: "42%",
    pE50: "48%",
    pE90: "28%",
    expectedError: "±18 mm/day",
    bustProbColor: "text-on-surface",
    confidence: 66,
    riskLevel: "Moderate Graded Risk",
    probDelta: "▼ -3% vs D-1",
    spreadSigma: "1.2 m/s",
    trackError: "±60 km",
    dualModelSplit: {
      nowState: "Present State: Stable Thermal Low with Coastal Inversion",
      nextEvolution: "Evolutionary Projection: Sea-Breeze Penetration Timing within 2hr Window"
    },
    coupledVariables: [
      { name: "Coupled Sea Surface Pressure & Thermal Front", value: 58, color: "bg-primary", textColor: "text-primary" },
      { name: "Arabian Sea Inversion Boundary Layer", value: 46, color: "bg-primary", textColor: "text-primary" },
      { name: "Low-Level Jet Stream Velocity", value: 39, color: "bg-outline", textColor: "text-outline" },
      { name: "Land-Atmosphere Soil Moisture Coupling", value: 24, color: "bg-outline", textColor: "text-outline" }
    ],
    regimeGating: {
      activeExpert: "Coastal Dynamics & Arabian Sea Expert (Weight: 0.68)",
      fallbackStatus: "Trajectory Verification Verified"
    },
    blockchainCertificate: {
      certificateId: "SYN-CERT-2026-G7719",
      sha256Hash: "0x8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9",
      timestamp: "2025-05-18T00:00:00Z",
      status: "Verified & Immutable on Ledger"
    },
    diagnosis: "Moderate uncertainty regarding timing of evening sea-breeze front penetration across Saurashtra peninsula.",
    historicalMatches: [
      { event: "2021 Cyclone Tauktae", note: "Landfall timing within 2 hours", tag: "Verified High Trust", tagColor: "bg-secondary-fixed text-on-secondary-fixed" }
    ]
  },
  {
    id: "gangetic",
    name: "Gangetic West Bengal",
    radarType: "Convective Microphysics",
    statusColor: "bg-tertiary",
    scores: {
      d1: "95%", d2: "89%", d3: "74%", d4: "52%", d5: "42%",
      d6: "34%", d7: "28%", d8_10: "21%"
    },
    dominantDriver: "Coupled CAPE Moisture Advection",
    bustProb: "58%",
    pE50: "66%",
    pE90: "45%",
    expectedError: "±28 mm/day",
    bustProbColor: "text-tertiary",
    confidence: 52,
    riskLevel: "Moderate Graded Risk",
    probDelta: "▲ +6% vs D-1",
    spreadSigma: "1.7 m/s",
    trackError: "±110 km",
    dualModelSplit: {
      nowState: "Present State: High Convective Available Potential Energy (CAPE > 2800 J/kg)",
      nextEvolution: "Evolutionary Projection: Pre-Monsoon Squall Line Trigger Timing"
    },
    coupledVariables: [
      { name: "Coupled CAPE-CIN Thermodynamic Matrix", value: 72, color: "bg-tertiary", textColor: "text-tertiary" },
      { name: "Nor'wester Squall Line Trigger Coupling", value: 61, color: "bg-tertiary", textColor: "text-tertiary" },
      { name: "Bay of Bengal Moisture Influx Rate", value: 50, color: "bg-primary", textColor: "text-primary" },
      { name: "Upper Tropospheric Divergence Field", value: 33, color: "bg-outline", textColor: "text-outline" }
    ],
    regimeGating: {
      activeExpert: "Convective & Squall Line Expert (Weight: 0.77)",
      fallbackStatus: "Trajectory Verification Active"
    },
    blockchainCertificate: {
      certificateId: "SYN-CERT-2026-W4490",
      sha256Hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2",
      timestamp: "2025-05-18T00:00:00Z",
      status: "Verified & Immutable on Ledger"
    },
    diagnosis: "Localized boundary layer moisture convergence trigger timing has high sensitivity across microphysics schemes.",
    historicalMatches: [
      { event: "2022 Pre-Monsoon Squalls", note: "Underpredicted Gust Factor", tag: "Continuous Bust (64%)", tagColor: "bg-error-container text-on-error-container" }
    ]
  },
  {
    id: "peninsula",
    name: "South Peninsular Interior",
    radarType: "Synoptic Ridge Coherence",
    statusColor: "bg-secondary",
    scores: {
      d1: "99%", d2: "97%", d3: "92%", d4: "84%", d5: "78%",
      d6: "69%", d7: "57%", d8_10: "42%"
    },
    dominantDriver: "Coupled High Synoptic Ridge Agreement",
    bustProb: "18%",
    pE50: "14%",
    pE90: "8%",
    expectedError: "±6 mm/day",
    bustProbColor: "text-secondary",
    confidence: 84,
    riskLevel: "Low Continuous Risk (High Trust)",
    probDelta: "▼ -7% vs D-1",
    spreadSigma: "0.8 m/s",
    trackError: "±35 km",
    dualModelSplit: {
      nowState: "Present State: Stable Sub-tropical Ridge with Zonal Uniformity",
      nextEvolution: "Evolutionary Projection: Minimal Evolution Uncertainty across 10-Day Window"
    },
    coupledVariables: [
      { name: "Coupled Sub-tropical Ridge Stability", value: 88, color: "bg-secondary", textColor: "text-secondary" },
      { name: "Zonal Wind & Pressure Uniformity", value: 74, color: "bg-secondary", textColor: "text-secondary" },
      { name: "Dry Mid-Level Subsidence Field", value: 65, color: "bg-secondary", textColor: "text-secondary" },
      { name: "Multi-Model Forecast Coherence", value: 20, color: "bg-outline", textColor: "text-outline" }
    ],
    regimeGating: {
      activeExpert: "Synoptic Ridge & Peninsular Expert (Weight: 0.89)",
      fallbackStatus: "Trajectory Verification Locked"
    },
    blockchainCertificate: {
      certificateId: "SYN-CERT-2026-P1104",
      sha256Hash: "0x5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
      timestamp: "2025-05-18T00:00:00Z",
      status: "Verified & Immutable on Ledger"
    },
    diagnosis: "High synoptic coherence across GraphCast, GenCast, ECMWF and NCMRWF ensembles with minimal divergence.",
    historicalMatches: [
      { event: "2024 Drought Period", note: "Suppressed Convection Lock", tag: "Verified High Trust", tagColor: "bg-secondary-fixed text-on-secondary-fixed" }
    ]
  }
];
