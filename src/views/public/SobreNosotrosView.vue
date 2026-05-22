<script setup lang="ts">
const BASE = "https://images.unsplash.com/photo-";

const team = [
  {
    name:  "Laura García",
    role:  "Especialista en Corte y Styling",
    bio:   "Apasionada por los cortes modernos y las últimas tendencias. 8 años dando forma a los mejores looks de nuestros clientes.",
    color: "#C87B9E",
    icon:  "mdi-content-cut",
    initials: "LG",
  },
  {
    name:  "Carlos López",
    role:  "Maestro Barbero",
    bio:   "Experto en barbería clásica y moderna. Domina desde el corte clásico hasta las técnicas más contemporáneas de arreglo de barba.",
    color: "#6B9292",
    icon:  "mdi-razor-double-edge",
    initials: "CL",
  },
  {
    name:  "Marta Ruiz",
    role:  "Colorista Profesional",
    bio:   "Especialista en coloración, balayage y técnicas avanzadas de mechas. Transforma cada cabello en una obra de arte.",
    color: "#C8A96E",
    icon:  "mdi-palette",
    initials: "MR",
  },
  {
    name:  "Ana Fernández",
    role:  "Experta en Tratamientos Capilares",
    bio:   "Especializada en diagnóstico capilar y tratamientos de reparación profunda. Devuelve la vida y el brillo a cualquier tipo de cabello.",
    color: "#7BAA88",
    icon:  "mdi-water",
    initials: "AF",
  },
  {
    name:  "David Moreno",
    role:  "Estilista de Eventos",
    bio:   "El responsable de los peinados más especiales. Bodas, eventos y ocasiones únicas: transforma cada momento en un recuerdo perfecto.",
    color: "#8B9EC8",
    icon:  "mdi-star-circle",
    initials: "DM",
  },
  {
    name:  "Luís Torres",
    role:  "Asesor de Imagen",
    bio:   "Con una visión única del estilo personal, Luís ayuda a cada cliente a descubrir su imagen más auténtica y potenciar su confianza.",
    color: "#C8A96E",
    icon:  "mdi-account-star",
    initials: "LT",
  },
];

const values = [
  {
    icon:  "mdi-heart-outline",
    title: "Pasión",
    desc:  "Amamos lo que hacemos. Cada corte, color o tratamiento es el resultado de años de dedicación al arte de la peluquería.",
    color: "#C87B9E",
    bg:    "rgba(200,123,158,0.08)",
  },
  {
    icon:  "mdi-leaf",
    title: "Sostenibilidad",
    desc:  "Trabajamos con marcas comprometidas con el medio ambiente. Productos libres de ingredientes nocivos para ti y el planeta.",
    color: "#7BAA88",
    bg:    "rgba(123,170,136,0.08)",
  },
  {
    icon:  "mdi-school-outline",
    title: "Formación continua",
    desc:  "Nuestro equipo se forma constantemente en las últimas tendencias y técnicas para ofrecerte siempre lo mejor.",
    color: "#8B9EC8",
    bg:    "rgba(139,158,200,0.08)",
  },
];

const stats = [
  { value: "+10", label: "Años de experiencia", icon: "mdi-calendar-star" },
  { value: "+500", label: "Clientes satisfechos", icon: "mdi-account-group" },
  { value: "6",   label: "Profesionales", icon: "mdi-account-star" },
  { value: "4.9★", label: "Valoración media", icon: "mdi-star" },
];
</script>

<template>
  <div>
    <!-- ─── HERO con imagen de fondo ─── -->
    <div class="page-hero">
      <div
        class="hero-bg"
        :style="{
          backgroundImage: `url(https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=70)`
        }"
      />
      <div class="hero-overlay" />
      <div class="hero-content">
        <div class="hero-label">Quiénes somos</div>
        <h1 class="hero-title">La historia detrás<br />del mejor salón del Arrabal</h1>
        <p class="hero-sub">
          Más de una década transformando looks y creando experiencias únicas en Zaragoza
        </p>
      </div>
    </div>

    <!-- ─── STATS BAR ─── -->
    <div class="stats-bar">
      <div class="stats-inner">
        <div v-for="s in stats" :key="s.label" class="stat-item">
          <v-icon :icon="s.icon" size="18" color="primary" class="mb-1" />
          <div class="stat-number">{{ s.value }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </div>

    <!-- ─── ABOUT SECTION ─── -->
    <v-container class="section-container py-16">
      <v-row align="center" class="about-row">
        <!-- Image col -->
        <v-col cols="12" md="5">
          <div class="about-img-wrapper">
            <v-img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&h=900&q=82"
              cover
              class="about-main-img"
              height="480"
            />
            <!-- Floating card -->
            <div class="floating-card">
              <v-icon size="22" color="warning" class="mb-1">mdi-star</v-icon>
              <div class="fc-number">4.9 / 5</div>
              <div class="fc-label">Valoración Google</div>
            </div>
          </div>
        </v-col>

        <!-- Text col -->
        <v-col cols="12" md="7" class="pl-md-12">
          <div class="section-label mb-3">Nuestra historia</div>
          <h2 class="about-title mb-5">
            Una peluquería con<br />
            <span class="title-accent">alma y tradición</span>
          </h2>

          <p class="about-text mb-4">
            La Pelu del Arrabal nació en 2014 con una idea clara: crear un espacio donde cada cliente se sintiera como en casa, recibiendo un servicio a la altura de los mejores salones de la ciudad. Hoy, más de una década después, esa filosofía sigue guiando cada uno de nuestros servicios.
          </p>
          <p class="about-text mb-6">
            Somos un equipo de seis profesionales apasionados, en constante formación, trabajando con los mejores productos del mercado. Nos especializamos en corte, coloración, barbería y tratamientos capilares, siempre con un asesoramiento personalizado y honesto.
          </p>

          <!-- Values -->
          <div class="values-grid mb-8">
            <div
              v-for="v in values"
              :key="v.title"
              class="value-chip"
              :style="{ background: v.bg, borderColor: v.color + '30' }"
            >
              <v-icon :icon="v.icon" size="16" :color="v.color" class="mr-2" />
              <span :style="{ color: v.color }">{{ v.title }}</span>
            </div>
          </div>

          <v-btn
            to="/reservar"
            color="primary"
            rounded="lg"
            elevation="0"
            size="large"
            class="mt-2"
            prepend-icon="mdi-calendar-plus"
          >
            Reserva con nosotros
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- ─── VALUES DETAILED ─── -->
    <div class="values-section">
      <v-container class="section-container py-14">
        <div class="section-label text-center mb-3">Lo que nos define</div>
        <h2 class="section-title text-center mb-12">Nuestros valores</h2>

        <v-row>
          <v-col v-for="v in values" :key="v.title" cols="12" md="4" class="d-flex">
            <div class="value-card" :style="{ '--v-color': v.color, '--v-bg': v.bg }">
              <div class="value-icon" :style="{ background: v.bg }">
                <v-icon :icon="v.icon" size="30" :color="v.color" />
              </div>
              <h3 class="value-title" :style="{ color: v.color }">{{ v.title }}</h3>
              <p class="value-desc">{{ v.desc }}</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- ─── TEAM ─── -->
    <v-container class="section-container py-16">
      <div class="section-label text-center mb-3">El equipo</div>
      <h2 class="section-title text-center mb-2">Conoce a nuestros<br />profesionales</h2>
      <p class="section-sub text-center mb-12">El talento detrás de cada corte, color y tratamiento</p>

      <v-row>
        <v-col
          v-for="member in team"
          :key="member.name"
          cols="12"
          sm="6"
          md="4"
          class="d-flex"
        >
          <article
            class="team-card"
            :style="{ '--m-color': member.color }"
          >
            <!-- Avatar -->
            <div class="member-photo-wrap">
              <div
                class="member-avatar"
                :style="{
                  background: `${member.color}15`,
                  borderColor: `${member.color}50`,
                }"
              >
                <v-icon icon="mdi-account" size="48" :color="member.color" />
              </div>
              <div class="member-icon-badge" :style="{ background: member.color }">
                <v-icon :icon="member.icon" size="13" color="white" />
              </div>
            </div>

            <!-- Info -->
            <h3 class="member-name">{{ member.name }}</h3>
            <div class="member-role" :style="{ color: member.color }">{{ member.role }}</div>
            <p class="member-bio">{{ member.bio }}</p>

            <!-- Decorative bottom accent -->
            <div class="card-accent" :style="{ background: member.color }" />
          </article>
        </v-col>
      </v-row>
    </v-container>

    <!-- ─── CTA ─── -->
    <div class="cta-section">
      <div class="cta-inner">
        <v-img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&h=300&q=70"
          cover
          class="cta-bg-img"
        />
        <div class="cta-overlay" />
        <div class="cta-content">
          <h2 class="cta-title">¿Preparado para conocernos?</h2>
          <p class="cta-sub">Reserva tu cita y descubre la diferencia de un salón que te cuida de verdad</p>
          <div class="cta-btns">
            <v-btn
              to="/reservar"
              color="primary"
              size="x-large"
              rounded="lg"
              elevation="0"
              prepend-icon="mdi-calendar-plus"
            >
              Reservar cita
            </v-btn>
            <v-btn
              to="/precios"
              variant="outlined"
              size="x-large"
              rounded="lg"
              class="cta-outline"
              prepend-icon="mdi-tag-outline"
            >
              Ver precios
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ─── HERO ─── */
.page-hero {
  position: relative;
  height: 480px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.03);
  transition: transform 8s ease;
}

.hero-bg:hover {
  transform: scale(1);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(20,23,16,0.96) 0%,
    rgba(20,23,16,0.65) 40%,
    rgba(20,23,16,0.20) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 0 48px 56px;
  max-width: 780px;
}

.hero-label {
  display: inline-flex;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-gold);
  background: rgba(200,169,110,0.10);
  border: 1px solid rgba(200,169,110,0.22);
  padding: 5px 14px;
  border-radius: 100px;
  margin-bottom: 18px;
}

.hero-title {
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--c-text);
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}

.hero-sub {
  font-size: 1rem;
  color: rgba(242,227,188,0.72);
  max-width: 560px;
}

/* ─── STATS BAR ─── */
.stats-bar {
  background: var(--c-bg-card);
  border-bottom: 1px solid var(--c-border);
}

.stats-inner {
  max-width: 860px;
  margin: 0 auto;
  padding: 28px 24px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 24px;
}

.stat-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.7rem;
  font-weight: 800;
  color: var(--c-gold);
  line-height: 1;
  margin: 4px 0;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 0.74rem;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* ─── ABOUT ─── */
.section-container {
  max-width: 1100px;
  margin: 0 auto;
}

.section-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-gold);
  margin-bottom: 12px;
}

.section-title {
  font-size: clamp(1.7rem, 4vw, 2.4rem);
  font-weight: 800;
  color: var(--c-text);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.section-sub {
  font-size: 0.95rem;
  color: var(--c-text-soft);
}

.about-img-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.about-main-img {
  border-radius: 20px;
  width: 100%;
}

.floating-card {
  position: absolute;
  bottom: -16px;
  right: -8px;
  background: var(--c-bg-main);
  border: 1px solid var(--c-border-strong);
  border-radius: 16px;
  padding: 16px 22px;
  text-align: center;
  box-shadow: 0 12px 40px rgba(0,0,0,0.40);
}

.fc-number {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--c-gold);
  letter-spacing: -0.02em;
}

.fc-label {
  font-size: 0.72rem;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.about-title {
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  font-weight: 800;
  color: var(--c-text);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.title-accent {
  color: var(--c-gold);
}

.about-text {
  font-size: 0.95rem;
  color: var(--c-text-soft);
  line-height: 1.78;
}

.values-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.value-chip {
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid;
  font-size: 0.84rem;
  font-weight: 600;
}

/* ─── VALUES DETAILED ─── */
.values-section {
  background: var(--c-bg-card);
  border-top: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
}

.value-card {
  background: var(--c-bg-main);
  border: 1px solid var(--c-border);
  border-radius: 18px;
  padding: 36px 28px;
  text-align: center;
  transition: all 0.28s ease;
  width: 100%;
}

.value-card:hover {
  border-color: var(--v-color, var(--c-teal));
  transform: translateY(-5px);
  box-shadow: 0 14px 42px rgba(0,0,0,0.28);
}

.value-icon {
  width: 68px;
  height: 68px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.value-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
}

.value-desc {
  font-size: 0.88rem;
  color: var(--c-text-soft);
  line-height: 1.7;
}

/* ─── TEAM ─── */
.team-card {
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: 20px;
  padding: 32px 24px 28px;
  text-align: center;
  transition: all 0.30s cubic-bezier(0.34,1.56,0.64,1);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.team-card:hover {
  border-color: var(--m-color, var(--c-teal));
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 18px 52px rgba(0,0,0,0.32);
}

.member-photo-wrap {
  position: relative;
  display: inline-block;
  margin-bottom: 18px;
}

.member-avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.28s ease;
}

.team-card:hover .member-avatar {
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--m-color, var(--c-teal)) 18%, transparent);
}

.member-icon-badge {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--c-bg-card);
}

.member-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--c-text);
  margin-bottom: 4px;
  letter-spacing: -0.01em;
}

.member-role {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 14px;
}

.member-bio {
  font-size: 0.86rem;
  color: var(--c-text-soft);
  line-height: 1.68;
}

.card-accent {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  opacity: 0;
  transition: opacity 0.25s;
}

.team-card:hover .card-accent {
  opacity: 1;
}

/* ─── CTA ─── */
.cta-section {
  position: relative;
  height: 340px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.cta-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.cta-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(20,23,16,0.94) 0%,
    rgba(20,23,16,0.75) 50%,
    rgba(20,23,16,0.30) 100%
  );
}

.cta-inner {
  width: 100%;
  height: 100%;
  position: relative;
}

.cta-content {
  position: relative;
  z-index: 2;
  padding: 0 56px;
  max-width: 680px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cta-title {
  font-size: clamp(1.5rem, 3.5vw, 2.2rem);
  font-weight: 800;
  color: var(--c-text);
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.cta-sub {
  font-size: 0.95rem;
  color: rgba(242,227,188,0.72);
  margin-bottom: 28px;
  max-width: 480px;
  line-height: 1.65;
}

.cta-btns {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.cta-outline {
  border-color: rgba(242,227,188,0.35) !important;
  color: var(--c-text) !important;
}

@media (max-width: 768px) {
  .hero-content { padding: 0 24px 40px; }
  .cta-content { padding: 0 24px; }
  .floating-card { right: 8px; }
}
</style>
