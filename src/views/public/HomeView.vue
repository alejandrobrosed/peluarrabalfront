<script setup lang="ts">
import { ref } from "vue";

// Intersection animation
const featuresVisible = ref(false);
const reviewsVisible = ref(false);
const servicesVisible = ref(false);

function onFeaturesIntersect(isIntersecting: boolean) {
  if (isIntersecting) featuresVisible.value = true;
}
function onReviewsIntersect(isIntersecting: boolean) {
  if (isIntersecting) reviewsVisible.value = true;
}
function onServicesIntersect(isIntersecting: boolean) {
  if (isIntersecting) servicesVisible.value = true;
}

const features = [
  {
    icon: "mdi-account-star",
    title: "Profesionales con experiencia",
    desc: "Un equipo especializado en tendencias, corte y asesoramiento personalizado.",
    color: "#6B9292",
    bg: "rgba(107,146,146,0.10)",
    border: "rgba(107,146,146,0.20)",
  },
  {
    icon: "mdi-bottle-tonic-plus",
    title: "Productos premium",
    desc: "Trabajamos con productos de alta calidad para cuidar tu cabello y tu piel.",
    color: "#C8A96E",
    bg: "rgba(200,169,110,0.10)",
    border: "rgba(200,169,110,0.22)",
  },
  {
    icon: "mdi-calendar-check",
    title: "Reserva online 24/7",
    desc: "Reserva tu cita cómodamente en menos de un minuto desde cualquier dispositivo.",
    color: "#7BAA88",
    bg: "rgba(123,170,136,0.10)",
    border: "rgba(123,170,136,0.22)",
  },
  {
    icon: "mdi-account-heart",
    title: "Atención personalizada",
    desc: "Cada cliente recibe un servicio adaptado a su estilo y necesidades.",
    color: "#C87B9E",
    bg: "rgba(200,123,158,0.10)",
    border: "rgba(200,123,158,0.22)",
  },
  {
    icon: "mdi-razor-double-edge",
    title: "Zona barbería",
    desc: "Cortes clásicos, modernos y arreglo de barba con acabado profesional.",
    color: "#8B9EC8",
    bg: "rgba(139,158,200,0.10)",
    border: "rgba(139,158,200,0.22)",
  },
  {
    icon: "mdi-palette",
    title: "Especialistas en color",
    desc: "Coloración, mechas y tratamientos para conseguir el look que buscas.",
    color: "#C8A96E",
    bg: "rgba(200,169,110,0.10)",
    border: "rgba(200,169,110,0.22)",
  },
];

const services = [
  {
    icon: "mdi-content-cut",
    title: "Corte Caballero",
    desc: "Corte masculino moderno o clásico adaptado a tu estilo.",
    price: "Desde 18 €",
    gradient: "linear-gradient(135deg, rgba(107,146,146,0.15) 0%, rgba(107,146,146,0.05) 100%)",
    iconColor: "#6B9292",
  },
  {
    icon: "mdi-content-cut",
    title: "Corte Mujer",
    desc: "Corte personalizado para mujer con acabados profesionales.",
    price: "Desde 25 €",
    gradient: "linear-gradient(135deg, rgba(200,123,158,0.12) 0%, rgba(200,123,158,0.04) 100%)",
    iconColor: "#C87B9E",
  },
  {
    icon: "mdi-face-man",
    title: "Barba",
    desc: "Perfilado y cuidado profesional de barba.",
    price: "Desde 12 €",
    gradient: "linear-gradient(135deg, rgba(139,158,200,0.12) 0%, rgba(139,158,200,0.04) 100%)",
    iconColor: "#8B9EC8",
  },
  {
    icon: "mdi-palette",
    title: "Coloración",
    desc: "Color, mechas y balayage con técnicas profesionales.",
    price: "Desde 35 €",
    gradient: "linear-gradient(135deg, rgba(200,169,110,0.12) 0%, rgba(200,169,110,0.04) 100%)",
    iconColor: "#C8A96E",
  },
  {
    icon: "mdi-water",
    title: "Tratamientos",
    desc: "Hidratación, keratina y reparación capilar intensiva.",
    price: "Desde 30 €",
    gradient: "linear-gradient(135deg, rgba(123,170,136,0.12) 0%, rgba(123,170,136,0.04) 100%)",
    iconColor: "#7BAA88",
  },
  {
    icon: "mdi-star-circle",
    title: "Peinado",
    desc: "Peinados para eventos, bodas y ocasiones especiales.",
    price: "Desde 20 €",
    gradient: "linear-gradient(135deg, rgba(200,169,110,0.12) 0%, rgba(200,169,110,0.04) 100%)",
    iconColor: "#C8A96E",
  },
];

const reviews = [
  {
    text: "¡El mejor corte que me han hecho en años! Trato excelente, muy atentos y puntuales. Sin duda volvería.",
    author: "María G.",
    color: "#6B9292",
    bg: "rgba(107,146,146,0.06)",
    border: "rgba(107,146,146,0.20)",
  },
  {
    text: "Fui para un balayage y quedé encantada. El resultado fue exactamente lo que buscaba. Profesionales de verdad.",
    author: "Lucía M.",
    color: "#C87B9E",
    bg: "rgba(200,123,158,0.06)",
    border: "rgba(200,123,158,0.20)",
  },
  {
    text: "Llevo años viniendo y siempre salgo feliz. Carlos es un crack con la barba. Totalmente recomendado.",
    author: "Javier R.",
    color: "#8B9EC8",
    bg: "rgba(139,158,200,0.06)",
    border: "rgba(139,158,200,0.20)",
  },
  {
    text: "Muy buen ambiente, precios justos y calidad impecable. La reserva online es súper cómoda.",
    author: "Elena P.",
    color: "#C8A96E",
    bg: "rgba(200,169,110,0.06)",
    border: "rgba(200,169,110,0.20)",
  },
];
</script>

<template>
  <div>
    <!-- ─── HERO: texto fijo sobre el carousel ─── -->
    <div class="hero-wrapper">
      <!-- Texto que permanece en todas las slides -->
      <div class="hero-text-layer">
        <div class="hero-content">
          <div class="hero-badge">
            <v-icon size="13">mdi-star</v-icon>
            <span>Más de 500 clientes satisfechos</span>
          </div>
          <h1 class="hero-title">
            Tu peluquería<br />de confianza<br />en el Arrabal
          </h1>
          <p class="hero-subtitle">
            Cortes, coloración, barbería y tratamientos profesionales<br />con atención personalizada.
          </p>
          <div class="hero-actions">
            <v-btn
              to="/reservar"
              color="primary"
              size="large"
              rounded="lg"
              elevation="0"
              class="hero-btn-primary"
            >
              <v-icon start>mdi-calendar-plus</v-icon>
              Reservar ahora
            </v-btn>
            <v-btn
              to="/precios"
              variant="outlined"
              size="large"
              rounded="lg"
              class="hero-btn-secondary"
            >
              Ver precios
            </v-btn>
          </div>
        </div>
      </div>

      <!-- Carousel solo con imágenes -->
      <v-carousel
        height="620"
        show-arrows="hover"
        hide-delimiter-background
        cycle
        :interval="5000"
        class="hero-carousel"
      >
        <v-carousel-item src="/img/pelu1.jpg" cover />
        <v-carousel-item src="/img/pelu2.jpg" cover />
      </v-carousel>
    </div>

    <!-- ─── STATS BAR ─── -->
    <div class="stats-bar">
      <div class="stats-inner">
        <div class="stat">
          <span class="stat-number">+10</span>
          <span class="stat-label">Años de experiencia</span>
        </div>
        <div class="stat-divider" />
        <div class="stat">
          <span class="stat-number">+500</span>
          <span class="stat-label">Clientes satisfechos</span>
        </div>
        <div class="stat-divider" />
        <div class="stat">
          <span class="stat-number">6</span>
          <span class="stat-label">Profesionales</span>
        </div>
        <div class="stat-divider" />
        <div class="stat">
          <span class="stat-number">4.9★</span>
          <span class="stat-label">Valoración media</span>
        </div>
      </div>
    </div>

    <!-- ─── FEATURES ─── -->
    <section
      class="section"
      v-intersect="onFeaturesIntersect"
    >
      <v-container class="section-container">
        <div class="section-label">Nuestras ventajas</div>
        <h2 class="section-title">¿Por qué elegir<br />La Pelu del Arrabal?</h2>

        <v-row class="mt-10">
          <v-col
            v-for="(f, i) in features"
            :key="f.title"
            cols="12"
            sm="6"
            md="4"
            class="d-flex"
          >
            <div
              class="feature-card"
              :class="{ 'card-visible': featuresVisible }"
              :style="{
                transitionDelay: `${i * 90}ms`,
                borderColor: featuresVisible ? f.border : 'transparent',
              }"
            >
              <div
                class="feature-icon-wrap"
                :style="{ background: f.bg, borderColor: f.border }"
              >
                <v-icon :icon="f.icon" size="26" :color="f.color" />
              </div>
              <h3 class="feature-title">{{ f.title }}</h3>
              <p class="feature-text">{{ f.desc }}</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ─── SERVICES ─── -->
    <section
      class="section section--alt"
      v-intersect="onServicesIntersect"
    >
      <v-container class="section-container">
        <div class="section-label">Lo que hacemos</div>
        <h2 class="section-title">Nuestros Servicios</h2>

        <v-row class="mt-10">
          <v-col
            v-for="(s, i) in services"
            :key="s.title"
            cols="12"
            sm="6"
            md="4"
            class="d-flex"
          >
            <div
              class="service-card"
              :class="{ 'card-visible': servicesVisible }"
              :style="{ transitionDelay: `${i * 80}ms`, background: s.gradient }"
            >
              <div class="service-icon-wrap">
                <v-icon :icon="s.icon" size="36" :color="s.iconColor" />
              </div>
              <h3 class="service-title" :style="{ color: s.iconColor }">{{ s.title }}</h3>
              <p class="service-text">{{ s.desc }}</p>
              <div class="service-price">{{ s.price }}</div>
              <v-btn
                to="/reservar"
                variant="tonal"
                size="small"
                rounded="lg"
                class="mt-4"
                :style="{ color: s.iconColor }"
              >
                Reservar
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ─── REVIEWS ─── -->
    <section
      class="section"
      v-intersect="onReviewsIntersect"
    >
      <v-container class="section-container">
        <div class="section-label">Opiniones</div>
        <h2 class="section-title">Nuestros Clientes Hablan</h2>

        <v-row class="mt-10">
          <v-col
            v-for="(r, i) in reviews"
            :key="r.author"
            cols="12"
            md="6"
            class="d-flex"
          >
            <div
              class="review-card"
              :class="{ 'card-visible': reviewsVisible }"
              :style="{
                transitionDelay: `${i * 100}ms`,
                background: r.bg,
                borderColor: r.border,
                borderLeftColor: r.color,
              }"
            >
              <v-icon size="28" class="quote-icon" :color="r.color">mdi-format-quote-open</v-icon>
              <p class="review-text">{{ r.text }}</p>
              <div class="review-author">
                <div
                  class="author-avatar"
                  :style="{ background: r.bg, borderColor: r.border, color: r.color }"
                >
                  {{ r.author[0] }}
                </div>
                <div>
                  <div class="author-name">{{ r.author }}</div>
                  <div class="review-stars">
                    <v-icon v-for="i in 5" :key="i" size="13" :color="r.color">mdi-star</v-icon>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ─── CTA ─── -->
    <section class="cta-section">
      <v-container class="text-center">
        <h2 class="cta-title">¿Listo para tu nuevo look?</h2>
        <p class="cta-sub">Reserva tu cita en menos de un minuto</p>
        <div class="cta-actions">
          <v-btn
            to="/reservar"
            color="primary"
            size="x-large"
            rounded="lg"
            elevation="0"
            class="cta-btn"
          >
            <v-icon start>mdi-calendar-plus</v-icon>
            Reservar cita
          </v-btn>
          <v-btn
            to="/como-reservar"
            variant="outlined"
            size="x-large"
            rounded="lg"
            class="cta-btn-outline"
          >
            <v-icon start>mdi-help-circle-outline</v-icon>
            ¿Cómo reservar?
          </v-btn>
        </div>
      </v-container>
    </section>
  </div>
</template>

<style scoped>
/* ─── HERO ─── */
.hero-wrapper {
  position: relative;
  overflow: hidden;
}

/* El texto se posiciona sobre el carousel */
.hero-text-layer {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
  background: linear-gradient(
    to right,
    rgba(20, 23, 16, 0.92) 0%,
    rgba(20, 23, 16, 0.62) 45%,
    rgba(20, 23, 16, 0.10) 100%
  );
  display: flex;
  align-items: center;
}

.hero-text-layer > * {
  pointer-events: auto;
}

.hero-carousel {
  position: relative;
  z-index: 1;
}

.hero-content {
  padding: 0 80px;
  max-width: 640px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(200, 169, 110, 0.14);
  border: 1px solid rgba(200, 169, 110, 0.30);
  color: #C8A96E;
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  margin-bottom: 24px;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.4rem);
  font-weight: 700;
  color: #F2E3BC;
  line-height: 1.15;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 1.05rem;
  color: rgba(242, 227, 188, 0.72);
  margin-bottom: 36px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-btn-primary {
  font-weight: 500;
}

.hero-btn-secondary {
  border-color: rgba(242, 227, 188, 0.35) !important;
  color: #F2E3BC !important;
}

.hero-btn-secondary:hover {
  background: rgba(242, 227, 188, 0.08) !important;
}

/* ─── STATS BAR ─── */
.stats-bar {
  background: var(--c-bg-card);
  border-bottom: 1px solid var(--c-border);
}

.stats-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
}

.stat {
  text-align: center;
  flex: 1;
  min-width: 110px;
}

.stat-number {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--c-gold);
  line-height: 1;
  margin-bottom: 6px;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--c-border);
}

/* ─── SECTIONS ─── */
.section {
  padding: 88px 0;
}

.section--alt {
  background: var(--c-bg-card);
  border-top: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
}

.section-container {
  max-width: 1100px;
  margin: 0 auto;
}

.section-label {
  text-align: center;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-gold);
  margin-bottom: 14px;
}

.section-title {
  text-align: center;
  font-size: clamp(1.7rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--c-text);
  line-height: 1.2;
}

/* ─── FEATURE CARDS ─── */
.feature-card {
  background: var(--c-bg-card);
  border: 1px solid transparent;
  border-radius: 16px;
  padding: 32px 26px;
  width: 100%;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.55s ease, transform 0.55s ease, border-color 0.55s ease, box-shadow 0.28s ease;
}

.feature-card.card-visible {
  opacity: 1;
  transform: translateY(0);
}

.feature-card:hover {
  transform: translateY(-6px) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.32);
}

.feature-icon-wrap {
  width: 54px;
  height: 54px;
  border-radius: 14px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: transform 0.25s ease;
}

.feature-card:hover .feature-icon-wrap {
  transform: scale(1.08) rotate(-4deg);
}

.feature-title {
  font-size: 0.97rem;
  font-weight: 600;
  color: var(--c-text);
  margin-bottom: 10px;
}

.feature-text {
  font-size: 0.87rem;
  color: var(--c-text-soft);
  line-height: 1.65;
}

/* ─── SERVICE CARDS ─── */
.service-card {
  border: 1px solid var(--c-border);
  border-radius: 16px;
  padding: 36px 26px;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.55s ease, transform 0.55s ease, box-shadow 0.28s ease, border-color 0.28s ease;
}

.service-card.card-visible {
  opacity: 1;
  transform: translateY(0);
}

.service-card:hover {
  transform: translateY(-6px) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.32);
  border-color: rgba(242, 227, 188, 0.15) !important;
}

.service-icon-wrap {
  width: 70px;
  height: 70px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  transition: transform 0.25s ease;
}

.service-card:hover .service-icon-wrap {
  transform: scale(1.1);
}

.service-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.service-text {
  font-size: 0.87rem;
  color: var(--c-text-soft);
  line-height: 1.65;
  margin-bottom: 14px;
  flex: 1;
}

.service-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--c-gold);
  letter-spacing: -0.01em;
}

/* ─── REVIEWS ─── */
.review-card {
  border: 1px solid;
  border-left-width: 3px;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.55s ease, transform 0.55s ease, box-shadow 0.28s ease;
}

.review-card.card-visible {
  opacity: 1;
  transform: translateY(0);
}

.review-card:hover {
  transform: translateY(-4px) !important;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.28);
}

.quote-icon {
  margin-bottom: 12px;
  opacity: 0.7;
}

.review-text {
  font-size: 0.95rem;
  color: var(--c-text-soft);
  line-height: 1.78;
  font-style: italic;
  margin-bottom: 24px;
}

.review-author {
  display: flex;
  align-items: center;
  gap: 14px;
}

.author-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.95rem;
  flex-shrink: 0;
}

.author-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--c-text);
  margin-bottom: 3px;
}

.review-stars {
  display: flex;
  gap: 1px;
}

/* ─── CTA ─── */
.cta-section {
  padding: 96px 24px;
  background: linear-gradient(135deg, rgba(26, 46, 46, 0.6) 0%, var(--c-bg-card) 100%);
  border-top: 1px solid var(--c-border);
  text-align: center;
}

.cta-title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
  color: var(--c-text);
}

.cta-sub {
  font-size: 1rem;
  color: var(--c-text-soft);
  margin-top: 12px;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
  flex-wrap: wrap;
}

.cta-btn {
  font-weight: 500;
  padding: 0 40px !important;
}

.cta-btn-outline {
  border-color: var(--c-border-strong) !important;
  color: var(--c-text-soft) !important;
  font-weight: 500;
  padding: 0 32px !important;
}

/* ─── RESPONSIVE ─── */
@media (max-width: 768px) {
  .hero-content {
    padding: 0 28px;
  }
  .hero-title {
    font-size: 2rem;
  }
  .section {
    padding: 64px 0;
  }
  .stat-divider {
    display: none;
  }
  .stats-inner {
    justify-content: center;
  }
}
</style>
