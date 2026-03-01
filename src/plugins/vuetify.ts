import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'arrabal',
    themes: {
      arrabal: {
        dark: true,
        colors: {
          background: '#0f0f0f',
          surface: '#1c1c1c',
          primary: '#b71c1c', 
          secondary: '#f5e6c8', 
        }
      }
    }
  }
});
