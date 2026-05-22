import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  components,
  directives,
  defaults: {
    VBtn: {
      style: "letter-spacing: 0.025em; font-weight: 500;",
    },
  },
  theme: {
    defaultTheme: "arrabal",
    themes: {
      arrabal: {
        dark: true,
        colors: {
          background: "#1A1D12",
          surface: "#232818",
          "surface-variant": "#2B3020",
          primary: "#6B9292",
          secondary: "#5A7D7D",
          accent: "#C8A96E",
          error: "#C97878",
          info: "#6B9292",
          success: "#6B9070",
          warning: "#C8A96E",
          "on-background": "#F2E3BC",
          "on-surface": "#F2E3BC",
          "on-primary": "#ffffff",
          "on-secondary": "#ffffff",
        },
      },
    },
  },
});
