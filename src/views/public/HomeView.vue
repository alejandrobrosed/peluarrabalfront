<script setup lang="ts">
</script>

<template>
  <v-container fluid class="pa-0">

    <v-carousel height="450" show-arrows="hover">
      <v-carousel-item src="/img/pelu1.jpg" cover />
      <v-carousel-item src="/img/pelu2.jpg" cover />
    </v-carousel>

    <v-container class="text-center py-16 hero-section">
      <div class="mb-4">
        <span>
          ⭐⭐⭐⭐⭐ Más de 500 clientes satisfechos
        </span>
      </div>
      <h1 class="text-h2 font-weight-bold mb-4">
        Tu peluquería de confianza en el Arrabal
      </h1>

      <p class="text-h6 mb-8 hero-subtitle">
        Cortes, coloración, barbería y tratamientos profesionales con atención personalizada.
      </p>

      <v-btn size="large" color="primary" to="/reservar">
        Reservar ahora
      </v-btn>
      <v-btn size="large" color="primary" to="/precios">
        Ver precios
      </v-btn>
    </v-container>

    <v-container class="py-16">
      <h2 class="text-h3 text-center font-weight-bold mb-10">
        ¿Por qué elegir La Pelu del Arrabal?
      </h2>

      <v-row>
        <v-col cols="12" md="4">
          <v-card class="feature-card pa-6 text-center">
            <div class="feature-icon">

            </div>
            <h3>Profesionales con esperiencia</h3>
            <p>Un equipo especializado en tendencias, corte y asesoramiento personalizado</p>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="feature-card pa-6 text-center">
            <div class="feature-icon">

            </div>
            <h3>Productos premium</h3>
            <p>Trabajamos con productos de alta calidad para cuidar tu cabello y tu piel.</p>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="feature-card pa-6 text-center">
            <div class="feature-icon">

            </div>
            <h3>Reserva online</h3>
            <p>Reserva tu cita cómodamente en menos de un minuto desde cualquier dispositivo</p>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="feature-card pa-6 text-center">
            <div class="feature-icon">

            </div>
            <h3>Atención personalizada</h3>
            <p>Cada cliente recibe un servicio adaptado a su estilo y necesidades</p>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="feature-card pa-6 text-center">
            <div class="feature-icon">

            </div>
            <h3>Zona barbería</h3>
            <p>Cortes clásicos, modernos y arreglo de barba con acabado profesional</p>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="feature-card pa-6 text-center">
            <div class="feature-icon">

            </div>
            <h3>Especialistas en color</h3>
            <p>Coloración, mechas y tratamiento para conseguir el look que buscas</p>
          </v-card>
        </v-col>


      </v-row>
    </v-container>
    <v-container class="py-16">
      <h2 class="text-h3 text-center font-weight-bold mb-10">
        Nuestros servicios
      </h2>

      <v-row>
        <v-col cols="12" md="4">
          <v-card class="feature-card pa-6 text-center">
            <div class="feature-icon">

            </div>
            <h3>Corte caballero</h3>
            <p>Corte masculino moderno o clásico adaptado a tu estilo</p>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="feature-card pa-6 text-center">
            <div class="feature-icon">

            </div>
            <h3>Corte mujer</h3>
            <p>Corte personalizado para mujer con acabados profesionales</p>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="feature-card pa-6 text-center">
            <div class="feature-icon">

            </div>
            <h3>Barba</h3>
            <p>Perfilado y cuidado profesional de barba</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="py-16">
      <h2 class="text-h3 text-center font-weight-bold mb-10">
        Reseñas
      </h2>

      <v-row>
        <v-col cols="12" md="4">
          <v-card class="review-card p6">
            <div class="text-h6 mb-2">⭐⭐⭐⭐⭐</div>
            <p>
              "El mejor corte que me han hecho en años. Trato excelente y puntualidad."
            </p>
            <strong>María G.</strong>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="review-card p6">
            <div class="text-h6 mb-2">⭐⭐⭐⭐⭐</div>
            <p>
              "El mejor corte que me han hecho en años. Trato excelente y puntualidad."
            </p>
            <strong>María G.</strong>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  
  </v-container>

</template>