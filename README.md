# Synapse AI - Dual-Model NWP Bust Prediction & Continuous Risk System
### Smart India Hackathon (SIH 2026) | Team: OAA-Synapse

---

## 🌟 Proposed Solution Highlights

1. **Dual-Model Behaviour Learning**:
   - Co-trains two separate neural networks: one evaluates the cyclone's **present state** (*"Now"*), while the other projects its **evolutionary trajectory** (*"Next"*).
2. **Unified Atmospheric Coupling**:
   - Rather than stacking variables independently, a single coupled encoder learns the interaction of **Air Pressure, Vorticity, Humidity, and Sea Pressure** as an interconnected atmospheric system.
3. **Continuous Risk Over Binary Labels**:
   - Computes continuous probability scores: `P(Bust)`, `P(E > P50)`, `P(E > P90)`, and `E[Error] (mm/day)`.
4. **Trajectory-Based Verification & Fallback**:
   - Cross-checks risk outputs using a dedicated trajectory engine that serves as a real-time verification and fallback layer.
5. **Regime-Aware Mixture of Experts (MoE Gating)**:
   - Gating network dynamically routes features to specialized expert encoders (Tropical Cyclone, Monsoon Trough, Western Disturbance, Orography).
6. **Input-Level Ensembling (1,000 runs/hr)**:
   - Shifting ensembling to the input stage achieves near-hourly inference without excessive compute overhead.
7. **Blockchain-Backed Forecast Provenance**:
   - Every issued forecast bust certificate is hashed (`SHA-256`) and recorded to guarantee an immutable, tamper-evident audit trail.

---

## 📁 Modular Directory Structure

```
SynapseSIH/
├── index.html                   # Semantic HTML entry point & dashboard layout
├── README.md                    # Project documentation & SIH architecture roadmap
├── css/
│   ├── main.css                 # Custom keyframe animations, pulse effects & scrollbars
│   └── tailwind-theme.js        # Design system tokens (colors, typography, spacing)
└── js/
    ├── app.js                   # Application bootstrap & component mounting
    ├── state.js                 # Centralized reactive state manager & event bus
    ├── data/
    │   ├── mockData.js          # Subdivisions, Dual-Model states, coupled weights & KPIs
    │   └── alertFeedData.js     # Trajectory fallback alerts & Blockchain certificate ledger
    ├── components/
    │   ├── Header.js            # Top bar (Base models: GraphCast/GenCast/NCUM, Certificate export)
    │   ├── Sidebar.js           # 6-Stage Pipeline navigation (Encoder, MoE, Fallback, Ledger)
    │   ├── AlertBanner.js       # Dual-Model Divergence & Continuous Risk Alert banner
    │   ├── KpiCards.js          # 4 Metric cards (Continuous Trust, Dual-Model Risk, MoE, Cliff)
    │   ├── VariableFilters.js   # Coupled atmospheric net & MoE regime gating controls
    │   ├── TelemetryMap.js      # Interactive SVG canvas with continuous probability gradient & pins
    │   ├── TimelineScrubber.js  # Day 1-10 continuous horizon scrubber & simulation player
    │   ├── RegionInsights.js    # Dual-Model 'Now/Next' split, coupled weights & Blockchain cert
    │   ├── DataMatrixTable.js   # Sub-division matrix, Trajectory alerts, Blockchain ledger & JSON API
    │   └── Footer.js            # Operational status & engine metadata
    └── utils/
        ├── formatters.js        # Badge & risk color formatting helpers
        └── exportHelper.js      # CSV & Blockchain JSON Certificate exporters
```

---

## 🚀 Running Locally

Open [index.html](file:///c:/Users/Dell/Desktop/SynapseSIH/index.html) directly in your browser or run any static server:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```
