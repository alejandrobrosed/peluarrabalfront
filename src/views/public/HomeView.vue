<script setup lang="ts">
</script>

<template>
  <v-container fluid class="pa-0">

    <v-carousel height="450" show-arrows="hover">
      <v-carousel-item src="/img/pelu1.jpg" cover />
      <v-carousel-item src="/img/pelu2.jpg" cover />
    </v-carousel>

    <v-container class="text-center py-12">
      <h1 class="text-h3 font-weight-bold mb-4">
  Tu peluquería de confianza en el Arrabal
</h1>

<p class="text-subtitle-1 mb-6">
  Aquí se viene a salir con estilo.
</p>

      <v-btn size="large" color="primary" to="/reservar">
        Reservar ahora
      </v-btn>
    </v-container>

    <v-container class="py-12">
      <h2 class="text-h4 text-center mb-8">Nuestros Servicios</h2>

      <v-row>
        <!-- Corte Caballero -->
        <v-col cols="12" md="4">
          <v-card>
            <v-img src="/img/corte_caballero.jpeg" height="200" cover />
            <v-card-title>Corte Caballero</v-card-title>
            <v-card-text>
              Corte masculino moderno o clásico adaptado a tu estilo y forma de rostro.
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Corte Mujer -->
        <v-col cols="12" md="4">
          <v-card>
            <v-img src="/img/corte_mujer.jpeg" height="200" cover />
            <v-card-title>Corte Mujer</v-card-title>
            <v-card-text>
              Cortes personalizados para mujer, desde estilos actuales hasta looks elegantes.
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Barba -->
        <v-col cols="12" md="4">
          <v-card>
            <v-img src="/img/barba.jpg" height="200" cover />
            <v-card-title>Barba</v-card-title>
            <v-card-text>
              Arreglo y perfilado de barba con acabado profesional y cuidado de la piel.
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Color -->
        <v-col cols="12" md="4">
          <v-card>
            <v-img src="/img/color.jpeg" height="200" cover />
            <v-card-title>Color</v-card-title>
            <v-card-text>
              Servicios de coloración, mechas y balayage con productos de alta calidad.
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Tratamientos -->
        <v-col cols="12" md="4">
          <v-card>
            <v-img src="/img/tratamientos.jpg" height="200" cover />
            <v-card-title>Tratamientos</v-card-title>
            <v-card-text>
              Tratamientos capilares para hidratación, reparación y cuidado profundo del cabello.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-img src="/img/peinado.jpg" height="200" cover />
            <v-card-title>Peinado</v-card-title>
            <v-card-text>
              Peinados y styling profesional para eventos, ocasiones especiales o tu día a día.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </v-container>
</template>