<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();

const items = [
  { title: "Inicio", to: "/" },
  { title: "Login", to: "/auth/login" },
  { title: "Admin", to: "/admin" },
];
</script>

<template>
  <v-app-bar flat>
    <v-container class="d-flex align-center">
      <v-img
      src="/img/logo_arrabal.png"
      alt="La Pelu de Arrabal"
      max-height="40"
      max-width="180"
      contain
      class="mr-4"
    />

    <v-spacer />
      <v-btn
        v-for="it in items"
        :key="it.to"
        :to="it.to"
        variant="text"
        :color="route.path === it.to ? 'primary' : undefined"
      >
        {{ it.title }}
      </v-btn>
    </v-container>
  </v-app-bar>
</template>
