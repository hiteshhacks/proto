/**
 * ForecastGuard AI - Tailwind Design System Configuration
 * Defines design tokens, custom palette, typography, and spacing scales.
 */
window.tailwindConfig = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-primary": "#ffffff",
        "surface-container-low": "#f2f3ff",
        "surface-container-high": "#e2e7ff",
        "primary": "#006194",
        "surface-variant": "#dae2fd",
        "primary-container": "#007bb9",
        "on-surface-variant": "#3f4850",
        "on-secondary-fixed-variant": "#005236",
        "on-primary-container": "#fdfcff",
        "secondary-container": "#6cf8bb",
        "tertiary-fixed": "#ffddb8",
        "outline-variant": "#bfc7d2",
        "on-tertiary-container": "#fffbff",
        "secondary-fixed": "#6ffbbe",
        "secondary-fixed-dim": "#4edea3",
        "error": "#ba1a1a",
        "on-tertiary-fixed": "#2a1700",
        "on-background": "#131b2e",
        "error-container": "#ffdad6",
        "on-surface": "#131b2e",
        "primary-fixed": "#cce5ff",
        "surface-tint": "#006398",
        "surface-dim": "#d2d9f4",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        "background": "#faf8ff",
        "primary-fixed-dim": "#93ccff",
        "surface-container-highest": "#dae2fd",
        "on-tertiary-fixed-variant": "#653e00",
        "on-secondary": "#ffffff",
        "secondary": "#006c49",
        "tertiary-container": "#a36700",
        "tertiary": "#825100",
        "on-primary-fixed-variant": "#004b73",
        "surface": "#faf8ff",
        "on-tertiary": "#ffffff",
        "inverse-on-surface": "#eef0ff",
        "surface-container-lowest": "#ffffff",
        "surface-container": "#eaedff",
        "outline": "#707881",
        "surface-bright": "#faf8ff",
        "inverse-surface": "#283044",
        "inverse-primary": "#93ccff",
        "tertiary-fixed-dim": "#ffb95f",
        "on-primary-fixed": "#001d31",
        "on-secondary-container": "#00714d",
        "on-secondary-fixed": "#002113"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "space-xl": "1.5rem",
        "space-sm": "0.5rem",
        "space-lg": "1rem",
        "space-md": "0.75rem",
        "margin-mobile": "1rem",
        "gutter": "1rem",
        "gutter-lg": "1.5rem",
        "margin": "1.5rem",
        "space-xs": "0.25rem"
      },
      fontFamily: {
        "display-lg-mobile": ["Plus Jakarta Sans", "sans-serif"],
        "headline-lg": ["Plus Jakarta Sans", "sans-serif"],
        "display-lg": ["Plus Jakarta Sans", "sans-serif"],
        "headline-md": ["Plus Jakarta Sans", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "body-md": ["Plus Jakarta Sans", "sans-serif"],
        "body-sm": ["Plus Jakarta Sans", "sans-serif"],
        "label-lg": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "body-lg": ["Plus Jakarta Sans", "sans-serif"],
        "headline-sm": ["Plus Jakarta Sans", "sans-serif"]
      },
      fontSize: {
        "display-lg-mobile": ["28px", { "lineHeight": "36px", "fontWeight": "700" }],
        "headline-lg": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
        "display-lg": ["36px", { "lineHeight": "44px", "fontWeight": "700" }],
        "headline-md": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
        "label-md": ["11px", { "lineHeight": "16px", "fontWeight": "500" }],
        "body-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
        "body-sm": ["12px", { "lineHeight": "18px", "fontWeight": "400" }],
        "label-lg": ["13px", { "lineHeight": "18px", "fontWeight": "600" }],
        "label-sm": ["10px", { "lineHeight": "14px", "fontWeight": "600" }],
        "body-lg": ["15px", { "lineHeight": "22px", "fontWeight": "400" }],
        "headline-sm": ["16px", { "lineHeight": "24px", "fontWeight": "600" }]
      }
    }
  }
};
