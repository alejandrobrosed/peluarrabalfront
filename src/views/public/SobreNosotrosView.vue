<template>
  <v-container class="py-12">
    <!-- BLOQUE PRINCIPAL -->
    <v-row align="center">
      
      <v-col cols="12" md="6">
        <v-img
          src="/img/equipo.png"
          height="550"
          cover
          class="rounded-lg"
        />
      </v-col>

      <v-col cols="12" md="6">
        <h1 class="text-h4 mb-4">Sobre Nosotros</h1>

        <p>
          Somos un equipo de profesionales apasionados por el cuidado y la
          belleza del cabello. Con más de 10 años de experiencia en el sector,
          ofrecemos un servicio cercano, personalizado y adaptado a las
          necesidades de cada cliente.
        </p>

        <p>
          Trabajamos con técnicas modernas y productos de alta calidad para
          garantizar resultados duraderos y saludables. Nuestro objetivo es que
          cada persona que entra en nuestro salón se sienta escuchada, asesorada
          y totalmente satisfecha con su imagen.
        </p>

        <p>
          Nos especializamos en cortes actuales, coloración profesional,
          tratamientos capilares y servicios de barbería, siempre cuidando cada
          detalle y respetando el estilo único de cada cliente.
        </p>

        <p>
          Creemos que la peluquería no es solo estética, sino también bienestar.
          Por eso, buscamos crear un ambiente agradable y relajado donde puedas
          disfrutar de tu tiempo mientras cuidamos de tu cabello.
        </p>

        <p class="mt-4 font-weight-medium">
          Tu confianza es nuestro mayor compromiso.
        </p>
      </v-col>
    </v-row>

    <!-- SECCIÓN EQUIPO -->
    <v-container class="mt-12">
      <h2 class="text-h4 text-center mb-8">Nuestro Equipo</h2>

      <v-row>
        <!-- Empleado 1 -->
        <v-col cols="12" md="4">
          <v-card class="pa-4 text-center">
            <v-avatar size="100" class="mx-auto mb-3">
              <v-img src="/img/empleado1.jpg" />
            </v-avatar>
            <v-card-title class="justify-center">Laura García</v-card-title>
            <div class="text-subtitle-2 font-weight-medium mb-2">
              Especialista en Corte y Styling
            </div>
            <v-card-text>
              Apasionada por los cortes modernos y las últimas tendencias en peinados personalizados.
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Empleado 2 -->
        <v-col cols="12" md="4">
          <v-card class="pa-4 text-center">
            <v-avatar size="100" class="mx-auto mb-3">
              <v-img src="/img/empleado2.jpg" />
            </v-avatar>
            <v-card-title class="justify-center">Carlos López</v-card-title>
            <div class="text-subtitle-2 font-weight-medium mb-2">
              Barbería y Afeitado Profesional
            </div>
            <v-card-text>
              Experto en barbería clásica y moderna, cuidando cada detalle para un acabado perfecto.
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Empleado 3 -->
        <v-col cols="12" md="4">
          <v-card class="pa-4 text-center">
            <v-avatar size="100" class="mx-auto mb-3">
              <v-img src="/img/empleado3.jpg" />
            </v-avatar>
            <v-card-title class="justify-center">Marta Ruiz</v-card-title>
            <div class="text-subtitle-2 font-weight-medium mb-2">
              Coloración y Mechas
            </div>
            <v-card-text>
              Especialista en coloración, balayage y técnicas avanzadas para un look único y natural.
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Empleado 4 -->
        <v-col cols="12" md="4">
          <v-card class="pa-4 text-center">
            <v-avatar size="100" class="mx-auto mb-3">
              <v-img src="/img/empleado4.jpg" />
            </v-avatar>
            <v-card-title class="justify-center">Ana Fernández</v-card-title>
            <div class="text-subtitle-2 font-weight-medium mb-2">
              Tratamientos Capilares
            </div>
            <v-card-text>
              Experta en tratamientos de hidratación y reparación para mantener un cabello sano y brillante.
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Empleado 5 -->
        <v-col cols="12" md="4">
          <v-card class="pa-4 text-center">
            <v-avatar size="100" class="mx-auto mb-3">
              <v-img src="/img/empleado5.jpg" />
            </v-avatar>
            <v-card-title class="justify-center">David Moreno</v-card-title>
            <div class="text-subtitle-2 font-weight-medium mb-2">
              Estilista y Eventos
            </div>
            <v-card-text>
              Especializado en peinados para eventos y ocasiones especiales, cuidando cada detalle del look.
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Empleado 6 -->
        <v-col cols="12" md="4">
          <v-card class="pa-4 text-center">
            <v-avatar size="100" class="mx-auto mb-3">
              <v-img src="/img/empleado6.jpg" />
            </v-avatar>
            <v-card-title class="justify-center">Luís Torres</v-card-title>
            <div class="text-subtitle-2 font-weight-medium mb-2">
              Asesoría de Imagen
            </div>
            <v-card-text>
              Ayuda a cada cliente a encontrar el estilo que mejor se adapta a su personalidad y estilo de vida.
            </v-card-text>
          </v-card>
        </v-col>

      </v-row>
    </v-container>

  </v-container>
</template>