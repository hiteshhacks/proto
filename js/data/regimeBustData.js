/**
 * Synapse SIH 2026 - Multi-Type Meteorological Bust Events Dataset for Regime Gating (MoE)
 * Supports multiple bust types: Snow/Freeze, Heavy Rain, Tropical Cyclone, Heatwave, Severe Convection, Coastal Fog/Inversion
 */

export const REGIME_BUST_TYPES = [
  { id: 'all', label: 'All Bust Types', icon: 'apps' },
  { id: 'cyclone', label: '🌀 Cyclone & Depression', icon: 'cyclone', color: '#E11D48' },
  { id: 'snow', label: '❄️ Snow & Orographic Phase', icon: 'ac_unit', color: '#38BDF8' },
  { id: 'rain', label: '🌧️ Heavy Rain & Flooding', icon: 'rainy', color: '#3B82F6' },
  { id: 'heatwave', label: '☀️ Extreme Heatwave', icon: 'sunny', color: '#F59E0B' },
  { id: 'convection', label: '⚡ Severe Thunderstorm', icon: 'thunderstorm', color: '#9333EA' },
  { id: 'marine', label: '🌊 Coastal Inversion & Sea-Breeze', icon: 'waves', color: '#10B981' }
];

export const BUST_LOCATIONS = [
  {
    id: 'bust-cyclone-bay',
    type: 'cyclone',
    typeName: 'Tropical Cyclone & Depression',
    name: 'North Bay of Bengal & Odisha Coast',
    location: '19.8°N, 86.2°E (Gopalpur-Puri Corridor)',
    severity: 'Critical Bust Risk',
    severityBadge: 'bg-error-container text-on-error-container',
    color: '#E11D48',
    pinX: 400,
    pinY: 245,
    pBust: '78%',
    errorMagnitude: '±48 mm/day rainfall | ±165 km track spread',
    primaryExpert: 'Tropical Cyclone & Deep Depression Expert',
    expertWeight: '0.74',
    expertDistribution: [
      { name: 'Tropical Cyclone Expert', weight: 74, color: 'bg-error' },
      { name: 'Monsoon Trough Expert', weight: 14, color: 'bg-primary' },
      { name: 'Coastal Dynamics Expert', weight: 8, color: 'bg-secondary' },
      { name: 'Generic Background Net', weight: 4, color: 'bg-outline' }
    ],
    rootCause: 'Coupled vorticity-shear imbalance in lower troposphere causes sudden bifurcation in forecast steering flow at Lead D+4.',
    modelComparison: {
      ncmrwf: 'Over-deepening to 962 hPa with northward curvature',
      graphcast: 'Under-deepening to 988 hPa with westward tracking',
      gencast: '50-member dispersion spread exceeds 160 km at +96h',
      synapseCorrection: 'MoE gating re-centers track within ±38 km of Doppler radar truth'
    },
    verificationFix: 'S-Band Doppler Radar at Paradip + INSAT-3DR Rapid Scan',
    actionableRecommendation: 'Trigger Stage 5 Trajectory Fallback and enforce coastal evacuation protocol in Ganjam & Puri districts.'
  },
  {
    id: 'bust-snow-himalayas',
    type: 'snow',
    typeName: 'Orographic Snow / Blizzard Phase',
    name: 'Western Himalayas (Himachal & Uttarakhand)',
    location: '32.2°N, 77.1°E (Pir Panjal & Rohtang Pass)',
    severity: 'Severe Alert',
    severityBadge: 'bg-tertiary-fixed text-on-tertiary-fixed',
    color: '#38BDF8',
    pinX: 270,
    pinY: 85,
    pBust: '65%',
    errorMagnitude: '+350m Freezing Level | 45 cm Snowfall Overprediction',
    primaryExpert: 'Mountain Orography & Cryosphere Expert',
    expertWeight: '0.81',
    expertDistribution: [
      { name: 'Mountain Orography Expert', weight: 81, color: 'bg-[#38BDF8]' },
      { name: 'Western Disturbance Jet Expert', weight: 12, color: 'bg-primary' },
      { name: 'Convective Microphysics Expert', weight: 5, color: 'bg-secondary' },
      { name: 'Generic Background Net', weight: 2, color: 'bg-outline' }
    ],
    rootCause: 'Coarse NWP digital elevation grid fails to resolve steep valleys, misdiagnosing rain-to-snow phase boundary above 2,400m altitude.',
    modelComparison: {
      ncmrwf: 'Predicts catastrophic 60cm snow at valley floor (1,800m)',
      graphcast: 'Smooths out terrain wave, predicting only liquid rain',
      gencast: 'Freezing level spread ±420m across members',
      synapseCorrection: 'MoE Cryosphere gating elevates freezing line to 2,750m, matching mountain AWS'
    },
    verificationFix: 'Shimla & Srinagar Doppler Radar + Surface Cryo-AWS',
    actionableRecommendation: 'Issue targeted High-Altitude Snow Advisory while demoting lowland flood alert to moderate slush warning.'
  },
  {
    id: 'bust-rain-bengal',
    type: 'rain',
    typeName: 'Extreme Heavy Rain / Squall Line',
    name: 'Gangetic West Bengal & Kolkata Delta',
    location: '22.5°N, 88.3°E (Sundarbans to Kolkata)',
    severity: 'High Warning',
    severityBadge: 'bg-error-container text-on-error-container',
    color: '#3B82F6',
    pinX: 425,
    pinY: 200,
    pBust: '58%',
    errorMagnitude: '±85 mm/6h Deluge Underestimation',
    primaryExpert: 'Convective Microphysics & CAPE Burst Expert',
    expertWeight: '0.77',
    expertDistribution: [
      { name: 'Convective CAPE Burst Expert', weight: 77, color: 'bg-[#3B82F6]' },
      { name: 'Bay Inflow Moisture Expert', weight: 15, color: 'bg-primary' },
      { name: 'Monsoon Trough Expert', weight: 6, color: 'bg-secondary' },
      { name: 'Generic Background Net', weight: 2, color: 'bg-outline' }
    ],
    rootCause: 'Parametric convective trigger threshold set too high in raw NWP, missing localized high-CAPE (>3,200 J/kg) squall line flash initiation.',
    modelComparison: {
      ncmrwf: 'Forecasts mild drizzle (12 mm/day) due to suppressed trigger',
      graphcast: 'Underpredicts peak 1-hr cloud burst intensity by 70%',
      gencast: 'Convective burst timing lag of +3.5 hours',
      synapseCorrection: 'MoE Convective Gating triggers instantaneous squall flash alert (+85 mm/6h)'
    },
    verificationFix: 'Kolkata S-Band Radar Reflectivity Core (>55 dBZ)',
    actionableRecommendation: 'Issue Urban Waterlogging Alert for Kolkata Metropolitan area and activate drainage pump stations.'
  },
  {
    id: 'bust-heat-rajasthan',
    type: 'heatwave',
    typeName: 'Extreme Heatwave / Thermal Inversion',
    name: 'NW India & Thar Desert Core (Rajasthan)',
    location: '26.9°N, 70.9°E (Jaisalmer-Bikaner Zone)',
    severity: 'Severe Alert',
    severityBadge: 'bg-[#FEF08A] text-[#78350F]',
    color: '#F59E0B',
    pinX: 200,
    pinY: 165,
    pBust: '62%',
    errorMagnitude: '+3.8°C Max Temperature Overestimation (Forecast: 49.2°C vs Obs: 45.4°C)',
    primaryExpert: 'Arid Land-Atmosphere & Boundary Layer Expert',
    expertWeight: '0.84',
    expertDistribution: [
      { name: 'Arid Land-Atmosphere Expert', weight: 84, color: 'bg-[#F59E0B]' },
      { name: 'Western Ridge Subsidence Expert', weight: 10, color: 'bg-primary' },
      { name: 'Zonal Advection Expert', weight: 4, color: 'bg-secondary' },
      { name: 'Generic Background Net', weight: 2, color: 'bg-outline' }
    ],
    rootCause: 'Model assumes completely dry soil moisture albedo feedback, ignoring unseasonal dust-aerosol solar radiation attenuation.',
    modelComparison: {
      ncmrwf: 'Overheats surface boundary layer to 49.2°C (False Heatwave Red Alert)',
      graphcast: 'Accurately captures regional heat ridge (46.0°C)',
      gencast: 'Temperature anomaly variance ±2.8°C',
      synapseCorrection: 'MoE Arid Gating accounts for atmospheric aerosol optical depth, correcting max temp to 45.5°C'
    },
    verificationFix: 'INSAT-3DR Land Surface Temperature (LST) + Ground Agromet Stations',
    actionableRecommendation: 'Downgrade public Red Alert to Orange Alert, preventing unnecessary industrial grid load shedding.'
  },
  {
    id: 'bust-convection-assam',
    type: 'convection',
    typeName: 'Severe Thunderstorm & Lightning Flash',
    name: 'Brahmaputra Valley & Meghalaya Ridge (Assam)',
    location: '26.1°N, 91.7°E (Guwahati & Cherrapunji Incline)',
    severity: 'Critical Alert',
    severityBadge: 'bg-error-container text-on-error-container',
    color: '#9333EA',
    pinX: 490,
    pinY: 155,
    pBust: '72%',
    errorMagnitude: '±110 mm Flash Flood | 65 kt Downdraft Gusts',
    primaryExpert: 'Orographic Convective Inflow Expert',
    expertWeight: '0.79',
    expertDistribution: [
      { name: 'Orographic Convective Expert', weight: 79, color: 'bg-[#9333EA]' },
      { name: 'Brahmaputra Moisture Tunnel Expert', weight: 14, color: 'bg-primary' },
      { name: 'Upper Jet Divergence Expert', weight: 5, color: 'bg-secondary' },
      { name: 'Generic Background Net', weight: 2, color: 'bg-outline' }
    ],
    rootCause: 'Funneling moisture through Assam gorge hits Meghalaya plateau, creating violent localized updrafts under-resolved in 12km models.',
    modelComparison: {
      ncmrwf: 'Smooths out terrain funneling, missing extreme localized cell',
      graphcast: 'Misses micro-scale lightning downdraft gust factor (forecasts 25kt vs obs 65kt)',
      gencast: 'Ensemble detects high spread but misplaces landfall by 80km',
      synapseCorrection: 'MoE Orographic Convective Gating flags 92% flash flood risk in valley basin'
    },
    verificationFix: 'Guwahati Doppler Radar + GPM IMERG Microwave Downlink',
    actionableRecommendation: 'Dispatch immediate flash flood & lightning safety warnings for riverine communities.'
  },
  {
    id: 'bust-marine-gujarat',
    type: 'marine',
    typeName: 'Coastal Sea-Breeze Inversion & Fog',
    name: 'Saurashtra Coast & Gulf of Khambhat',
    location: '21.5°N, 70.0°E (Veraval-Porbandar Belt)',
    severity: 'Moderate Risk',
    severityBadge: 'bg-secondary-fixed text-on-secondary-fixed',
    color: '#10B981',
    pinX: 195,
    pinY: 235,
    pBust: '42%',
    errorMagnitude: '2.5 hr Sea-Breeze Influx Timing Lag | Dense Marine Fog',
    primaryExpert: 'Coastal Boundary Layer & Marine Inversion Expert',
    expertWeight: '0.68',
    expertDistribution: [
      { name: 'Marine Inversion Expert', weight: 68, color: 'bg-[#10B981]' },
      { name: 'Arabian Sea Thermal Expert', weight: 22, color: 'bg-primary' },
      { name: 'Land-Sea Gradient Expert', weight: 7, color: 'bg-secondary' },
      { name: 'Generic Background Net', weight: 3, color: 'bg-outline' }
    ],
    rootCause: 'Shallow thermal low inversion traps nocturnal marine moisture along coastline, causing unpredicted zero-visibility fog.',
    modelComparison: {
      ncmrwf: 'Forecasts clear skies and rapid afternoon sea breeze penetration',
      graphcast: 'Maintains uniform temperature across land-sea boundary',
      gencast: 'Fog dissipation timing uncertainty ±2 hours',
      synapseCorrection: 'MoE Marine Gating successfully predicts 4-hour dense coastal fog window'
    },
    verificationFix: 'INSAT-3DR Fog Product + Port Optical Visibility Sensors',
    actionableRecommendation: 'Issue Coastal Port Marine Navigation & Airport Visibility Advisory for Porbandar & Jamnagar.'
  }
];
