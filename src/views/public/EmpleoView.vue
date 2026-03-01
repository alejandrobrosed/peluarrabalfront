<script setup lang="ts">
import { ref } from "vue";

const nombre = ref("");
const email = ref("");
const cv = ref<File | null>(null);

function handleFile(e: any) {
  cv.value = e.target.files[0];
}
</script>

<template>
  <v-container class="py-12">
    <h1 class="text-h4 mb-6">Trabaja con nosotros</h1>

    <v-text-field v-model="nombre" label="Nombre" />
    <v-text-field v-model="email" label="Email" />
    <v-file-input label="Adjuntar CV" @change="handleFile" />

    <v-btn color="primary" class="mt-4">
      Enviar solicitud
    </v-btn>
  </v-container>
</template>