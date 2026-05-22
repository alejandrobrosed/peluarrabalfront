<script setup lang="ts">
const BASE = "https://images.unsplash.com/photo-";
const Q    = "?auto=format&fit=crop&w=720&h=480&q=82";

const precios = [
  {
    title:    "Corte Caballero",
    desc:     "Corte masculino moderno o clásico, con lavado y secado incluido. Acabado profesional adaptado a tu estilo.",
    price:    "18 €",
    img:      `${BASE}1503951914875-452162b0f3f1${Q}`,
    popular:  false,
    color:    "#6B9292",
    bg:       "rgba(107,146,146,0.08)",
    border:   "rgba(107,146,146,0.25)",
    tag:      "Barbería",
  },
  {
    title:    "Corte Mujer",
    desc:     "Corte personalizado con acabados profesionales y secado incluido. Asesoramiento de imagen gratuito.",
    price:    "25 €",
    img:      `${BASE}1560066984-138dadb4c035${Q}`,
    popular:  true,
    color:    "#C87B9E",
    bg:       "rgba(200,123,158,0.08)",
    border:   "rgba(200,123,158,0.30)",
    tag:      "Más popular",
  },
  {
    title:    "Barba",
    desc:     "Perfilado y arreglo profesional de barba con navajas de primera calidad y productos premium.",
    price:    "12 €",
    img:      `${BASE}1621605815971-fbc98d665033${Q}`,
    popular:  false,
    color:    "#8B9EC8",
    bg:       "rgba(139,158,200,0.08)",
    border:   "rgba(139,158,200,0.25)",
    tag:      "Barbería",
  },
  {
    title:    "Coloración",
    desc:     "Color completo, mechas o balayage con tintes de alta calidad. Incluye acondicionamiento y brillo.",
    price:    "35 €",
    img:      `${BASE}1617391654484-2894196c2cc9${Q}`,
    popular:  false,
    color:    "#C8A96E",
    bg:       "rgba(200,169,110,0.08)",
    border:   "rgba(200,169,110,0.25)",
    tag:      "Color",
  },
  {
    title:    "Tratamientos",
    desc:     "Hidratación, keratina y reparación intensiva. Devuelve el brillo y la vitalidad a tu cabello.",
    price:    "30 €",
    img:      `${BASE}1595476108010-b4d1f102b1b1${Q}`,
    popular:  false,
    color:    "#7BAA88",
    bg:       "rgba(123,170,136,0.08)",
    border:   "rgba(123,170,136,0.25)",
    tag:      "Cuidado",
  },
  {
    title:    "Peinado",
    desc:     "Peinados para eventos, bodas y ocasiones especiales. Acabados duraderos con fijación profesional.",
    price:    "20 €",
    img:      `${BASE}1519699047748-de8e457a634e${Q}`,
    popular:  false,
    color:    "#C87B9E",
    bg:       "rgba(200,123,158,0.08)",
    border:   "rgba(200,123,158,0.25)",
    tag:      "Styling",
  },
];
</script>

<template>
  <div>
    <!-- ─── HERO ─── -->
    <div class="page-hero">
      <div class="hero-inner">
        <div class="hero-label">Tarifas 2026</div>
        <h1 class="hero-title">Nuestros Precios</h1>
        <p class="hero-sub">Calidad profesional a precios justos · Sin sorpresas</p>

        <div class="hero-pills">
          <span class="pill">
            <v-icon size="14" color="success">mdi-check-circle</v-icon>
            Lavado incluido
          </span>
          <span class="pill">
            <v-icon size="14" color="success">mdi-check-circle</v-icon>
            Sin cargos ocultos
          </span>
          <span class="pill">
            <v-icon size="14" color="success">mdi-check-circle</v-icon>
            Pago seguro online
          </span>
        </div>
      </div>
    </div>

    <!-- ─── GRID ─── -->
    <v-container class="section-container py-14">
      <v-row>
        <v-col
          v-for="item in precios"
          :key="item.title"
          cols="12"
          sm="6"
          md="4"
          class="d-flex"
        >
          <article
            class="price-card"
            :class="{ 'price-card--popular': item.popular }"
            :style="{ '--card-color': item.color, '--card-bg': item.bg, '--card-border': item.border }"
          >
            <!-- Badge -->
            <div v-if="item.popular" class="popular-badge">
              <v-icon size="11">mdi-star-four-points</v-icon>
              {{ item.tag }}
            </div>
            <div v-else class="category-tag" :style="{ color: item.color, background: item.bg, borderColor: item.border }">
              {{ item.tag }}
            </div>

            <!-- Image with overlay -->
            <div class="card-img-wrap">
              <v-img
                :src="item.img"
                height="230"
                cover
                class="card-img"
              >
                <template #placeholder>
                  <div class="img-placeholder" :style="{ background: item.bg }" />
                </template>
              </v-img>
              <div class="card-img-gradient" :style="{ background: `linear-gradient(to top, ${item.color}22 0%, transparent 100%)` }" />
            </div>

            <!-- Body -->
            <div class="card-body">
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-desc">{{ item.desc }}</p>

              <div class="card-footer">
                <div class="price-display">
                  <span class="price-from">desde</span>
                  <span class="price-value" :style="{ color: item.color }">{{ item.price }}</span>
                </div>
                <v-btn
                  to="/reservar"
                  rounded="lg"
                  size="small"
                  elevation="0"
                  class="reserve-btn"
                  :style="{ background: item.bg, color: item.color, border: `1px solid ${item.border}` }"
                >
                  Reservar
                  <v-icon end size="15">mdi-arrow-right</v-icon>
                </v-btn>
              </div>
            </div>
          </article>
        </v-col>
      </v-row>
    </v-container>

    <!-- ─── INCLUDE STRIP ─── -->
    <div class="includes-strip">
      <div class="includes-inner">
        <div class="include-item">
          <v-icon size="20" color="primary" class="mr-2">mdi-water-check</v-icon>
          <span>Lavado incluido en todos los cortes</span>
        </div>
        <div class="include-divider" />
        <div class="include-item">
          <v-icon size="20" color="primary" class="mr-2">mdi-shield-check</v-icon>
          <span>Productos de primera calidad</span>
        </div>
        <div class="include-divider" />
        <div class="include-item">
          <v-icon size="20" color="primary" class="mr-2">mdi-clock-check</v-icon>
          <span>Puntualidad garantizada</span>
        </div>
      </div>
    </div>

    <!-- ─── CTA ─── -->
    <div class="cta-section">
      <div class="cta-inner">
        <div>
          <h2 class="cta-title">¿Tienes alguna pregunta?</h2>
          <p class="cta-sub">Contáctanos y te asesoramos sin compromiso</p>
        </div>
        <div class="cta-actions">
          <v-btn
            to="/reservar"
            color="primary"
            rounded="lg"
            elevation="0"
            size="large"
            prepend-icon="mdi-calendar-plus"
          >
            Reservar ahora
          </v-btn>
          <v-btn
            to="/como-reservar"
            variant="outlined"
            rounded="lg"
            size="large"
            class="cta-outline-btn"
            prepend-icon="mdi-help-circle-outline"
          >
            ¿Cómo reservar?
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ─── HERO ─── */
.page-hero {
  background: linear-gradient(160deg, #1E2318 0%, #232818 60%, #1A2020 100%);
  border-bottom: 1px solid var(--c-border);
  padding: 80px 24px 72px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.page-hero::before {
  content: "";
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 300px;
  background: radial-gradient(ellipse, rgba(107,146,146,0.12) 0%, transparent 70%);
  pointer-events: none;
}

.hero-inner {
  position: relative;
  max-width: 680px;
  margin: 0 auto;
}

.hero-label {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--c-gold);
  margin-bottom: 16px;
  background: rgba(200,169,110,0.08);
  border: 1px solid rgba(200,169,110,0.18);
  padding: 5px 14px;
  border-radius: 100px;
}

.hero-title {
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 800;
  color: var(--c-text);
  margin-bottom: 14px;
  letter-spacing: -0.02em;
}

.hero-sub {
  font-size: 1rem;
  color: var(--c-text-soft);
  margin-bottom: 28px;
}

.hero-pills {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: var(--c-text-soft);
  background: rgba(123,170,136,0.06);
  border: 1px solid rgba(123,170,136,0.16);
  padding: 5px 12px;
  border-radius: 100px;
}

/* ─── SECTION ─── */
.section-container {
  max-width: 1140px;
  margin: 0 auto;
}

/* ─── PRICE CARDS ─── */
.price-card {
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: transform 0.30s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease, border-color 0.28s ease;
}

.price-card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 24px 64px rgba(0,0,0,0.40);
  border-color: var(--card-border);
}

.price-card--popular {
  border-color: rgba(200,123,158,0.30);
  box-shadow: 0 0 0 1px rgba(200,123,158,0.12);
}

/* Tags */
.popular-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  background: #C87B9E;
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 100px;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 4px 14px rgba(200,123,158,0.35);
}

.category-tag {
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 11px;
  border-radius: 100px;
  border: 1px solid;
  z-index: 3;
}

/* Image */
.card-img-wrap {
  position: relative;
  flex-shrink: 0;
}

.card-img {
  display: block;
}

.card-img-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  pointer-events: none;
}

.img-placeholder {
  width: 100%;
  height: 100%;
}

/* Body */
.card-body {
  padding: 22px 22px 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--c-text);
  margin-bottom: 9px;
  letter-spacing: -0.01em;
}

.card-desc {
  font-size: 0.85rem;
  color: var(--c-text-soft);
  line-height: 1.65;
  flex: 1;
  margin-bottom: 20px;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.price-display {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.price-from {
  font-size: 0.72rem;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.price-value {
  font-size: 1.9rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
}

.reserve-btn {
  font-size: 0.82rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em !important;
  transition: all 0.2s !important;
}

.reserve-btn:hover {
  opacity: 0.85;
  transform: translateX(2px);
}

/* ─── INCLUDES STRIP ─── */
.includes-strip {
  background: var(--c-bg-card);
  border-top: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
  padding: 24px;
}

.includes-inner {
  max-width: 860px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.include-item {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: var(--c-text-soft);
}

.include-divider {
  width: 1px;
  height: 28px;
  background: var(--c-border);
}

/* ─── CTA ─── */
.cta-section {
  padding: 52px 28px;
  background: linear-gradient(135deg, rgba(26,46,46,0.55) 0%, var(--c-bg-card) 100%);
}

.cta-inner {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.cta-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--c-text);
  margin-bottom: 5px;
}

.cta-sub {
  font-size: 0.88rem;
  color: var(--c-text-soft);
}

.cta-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.cta-outline-btn {
  border-color: var(--c-border-strong) !important;
  color: var(--c-text-soft) !important;
}

@media (max-width: 640px) {
  .include-divider { display: none; }
}
</style>
