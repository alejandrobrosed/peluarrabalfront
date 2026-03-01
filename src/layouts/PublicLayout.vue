<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
</script>

<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-img
      src="/img/peluarrabal.png"
      alt="La Pelu de Arrabal"
      max-height="80"
      max-width="180"
      contain
      class="mr-4"
    />

    <v-spacer />

      <v-btn to="/" variant="text">Inicio</v-btn>
      <v-btn to="/precios" variant="text">Precios</v-btn>
      <v-btn to="/sobre-nosotros" variant="text">Sobre Nosotros</v-btn>
      <v-btn to="/empleo" variant="text">Empleo</v-btn>


      <v-divider vertical class="mx-3"></v-divider>

      <v-btn v-if="!auth.isLogged" to="/auth/login" variant="outlined">
        Login
      </v-btn>

      <template v-else>
        <v-btn to="/mis-citas" variant="text">
          Mis citas
        </v-btn>

        <v-btn to="/reservar" color="secondary">
          Reservar
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer class="bg-grey-lighten-3 pa-6 text-center">
      <v-container class="text-center py-8">
        <h2 class="text-h5 mb-4">Síguenos en redes</h2>

        <v-btn icon class="mx-2" href="/">
          <v-icon size="30">mdi-instagram</v-icon>
        </v-btn>

        <v-btn icon class="mx-2" href="/">
          <v-icon size="30">mdi-facebook</v-icon>
        </v-btn>

        <v-btn icon class="mx-2" href="/">
          <v-icon size="30">mdi-twitter</v-icon>
        </v-btn>
      </v-container>
      <div class="w-100">

        © 2026 La Pelu del Arrabal – Todos los derechos reservados
      </div>
    </v-footer>
  </v-app>
</template>