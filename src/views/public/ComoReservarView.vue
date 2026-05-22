<script setup lang="ts">
const steps = [
  {
    number: "01",
    icon: "mdi-account-plus-outline",
    title: "Crea tu cuenta o inicia sesión",
    desc: "Regístrate con tu nombre, email y contraseña. Si ya tienes cuenta, accede directamente desde el botón «Entrar» en la esquina superior derecha. El registro es completamente gratuito.",
    tip: "¿Ya tienes cuenta? Haz clic en «Entrar» en la cabecera.",
    color: "#6B9292",
    bg: "rgba(107,146,146,0.07)",
    border: "rgba(107,146,146,0.22)",
    glow: "rgba(107,146,146,0.15)",
  },
  {
    number: "02",
    icon: "mdi-content-cut",
    title: "Elige tu servicio",
    desc: "Selecciona entre corte, coloración, barba, tratamientos o peinado. Consulta nuestra sección de Precios para ver las tarifas actualizadas antes de confirmar.",
    tip: "Visita nuestra página de Precios para conocer todos los servicios disponibles.",
    color: "#C8A96E",
    bg: "rgba(200,169,110,0.07)",
    border: "rgba(200,169,110,0.22)",
    glow: "rgba(200,169,110,0.15)",
  },
  {
    number: "03",
    icon: "mdi-calendar-month-outline",
    title: "Selecciona fecha y hora",
    desc: "Usa el calendario interactivo para elegir el día que prefieras. Escoge entre las franjas disponibles de mañana o tarde según tu conveniencia.",
    tip: "Horario: L–V 9:00–20:00 · Sábados 9:00–14:00 · Domingos cerrado.",
    color: "#7BAA88",
    bg: "rgba(123,170,136,0.07)",
    border: "rgba(123,170,136,0.22)",
    glow: "rgba(123,170,136,0.15)",
  },
  {
    number: "04",
    icon: "mdi-account-star-outline",
    title: "Elige tu profesional",
    desc: "Selecciona el profesional de tu confianza o deja que nuestro equipo asigne el más adecuado. Cada especialista está formado en su área.",
    tip: "Conoce a todo nuestro equipo en la página «Sobre Nosotros».",
    color: "#C87B9E",
    bg: "rgba(200,123,158,0.07)",
    border: "rgba(200,123,158,0.22)",
    glow: "rgba(200,123,158,0.15)",
  },
  {
    number: "05",
    icon: "mdi-shield-lock-outline",
    title: "Confirma y paga de forma segura",
    desc: "Introduce los datos de tu tarjeta en nuestro formulario cifrado y confirma la reserva. Recibirás confirmación inmediata. Sin sorpresas ni cargos ocultos.",
    tip: "Tu pago está protegido por cifrado SSL. No almacenamos datos completos de tarjeta.",
    color: "#8B9EC8",
    bg: "rgba(139,158,200,0.07)",
    border: "rgba(139,158,200,0.22)",
    glow: "rgba(139,158,200,0.15)",
  },
];

const faqs = [
  {
    q: "¿Puedo cancelar o modificar mi cita?",
    a: "Sí. Desde «Mis Citas» puedes cancelar o gestionar cualquier reserva. Te recomendamos hacerlo con al menos 24 horas de antelación para evitar penalizaciones.",
  },
  {
    q: "¿Necesito crear una cuenta para reservar?",
    a: "Sí, necesitas una cuenta para gestionar tus reservas y consultar el historial de citas. El registro es gratuito y te lleva menos de un minuto.",
  },
  {
    q: "¿Puedo reservar para el mismo día?",
    a: "Sí, siempre que haya disponibilidad. Te recomendamos reservar con antelación para asegurar la franja horaria que más te convenga.",
  },
  {
    q: "¿Qué ocurre si llego tarde a mi cita?",
    a: "Intenta llegar 5 minutos antes. Si llegas tarde, el servicio puede reducirse para no afectar a los clientes siguientes. Nuestro equipo hará todo lo posible por atenderte.",
  },
  {
    q: "¿Cómo sé que mi reserva se ha confirmado?",
    a: "Recibirás una confirmación inmediata en pantalla tras finalizar el pago. También puedes consultar el estado en todo momento desde «Mis Citas».",
  },
];
</script>

<template>
  <div class="page-wrapper">

    <!-- ─── HERO ─── -->
    <section class="hero-section">
      <div class="hero-bg-glow hero-glow-1" />
      <div class="hero-bg-glow hero-glow-2" />
      <!-- Animated icon scene -->
      <div class="hero-icon-scene" aria-hidden="true">

        <!-- Outer rotating dashed ring -->
        <svg class="scene-ring" width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" stroke="rgba(107,146,146,0.18)" stroke-width="1" fill="none" stroke-dasharray="6 5"/>
        </svg>

        <!-- Inner glow ring -->
        <div class="scene-glow" />

        <!-- Central scissors SVG -->
        <div class="scene-scissors">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Pivot -->
            <circle cx="40" cy="40" r="4" fill="#6B9292" opacity="0.9"/>
            <!-- Blade top -->
            <g class="blade-top">
              <path d="M40 40 L14 14" stroke="#6B9292" stroke-width="2.8" stroke-linecap="round"/>
              <circle cx="11" cy="11" r="6.5" stroke="#6B9292" stroke-width="2" fill="rgba(107,146,146,0.12)"/>
              <circle cx="11" cy="11" r="2.5" fill="#6B9292" opacity="0.5"/>
            </g>
            <!-- Blade bottom -->
            <g class="blade-bottom">
              <path d="M40 40 L14 66" stroke="#6B9292" stroke-width="2.8" stroke-linecap="round"/>
              <circle cx="11" cy="69" r="6.5" stroke="#6B9292" stroke-width="2" fill="rgba(107,146,146,0.12)"/>
              <circle cx="11" cy="69" r="2.5" fill="#6B9292" opacity="0.5"/>
            </g>
            <!-- Handle -->
            <path d="M40 40 L68 40" stroke="#C8A96E" stroke-width="2" stroke-linecap="round"/>
            <path d="M62 34 L68 40 L62 46" stroke="#C8A96E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- Cut line dashes -->
            <line x1="40" y1="40" x2="68" y2="12" stroke="rgba(200,169,110,0.30)" stroke-width="1.2" stroke-dasharray="3 4" stroke-linecap="round"/>
          </svg>
        </div>

        <!-- Orbit items - positioned on the ring -->
        <div class="orbit-item o-top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 10h12M4 14h8" stroke="#6B9292" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="orbit-item o-right">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 3l-5 9h4l-1 9 9-11h-5l3-7H9z" stroke="#C8A96E" stroke-width="1.8" stroke-linejoin="round" fill="rgba(200,169,110,0.1)"/>
          </svg>
        </div>
        <div class="orbit-item o-bottom">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#6B9292" stroke-width="1.8"/>
            <path d="M8 12h8M12 8v8" stroke="#6B9292" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="orbit-item o-left">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M7 4l2 2-2 14 2 2M17 4l-2 2 2 14-2 2" stroke="#C8A96E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 8h10M7 16h10" stroke="#C8A96E" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>

      </div>

      <div class="hero-content">
        <div class="hero-chip">
          <v-icon size="12">mdi-map-marker-path</v-icon>
          Guía de reserva
        </div>
        <h1 class="hero-title">Reserva en&nbsp;<span class="hero-highlight">2&nbsp;minutos</span></h1>
        <p class="hero-sub">
          Sigue estos sencillos pasos y asegura tu cita en La&nbsp;Pelu del&nbsp;Arrabal desde cualquier dispositivo.
        </p>
        <div class="hero-actions">
          <v-btn
            to="/reservar"
            color="primary"
            size="large"
            rounded="xl"
            elevation="0"
            class="hero-cta"
            prepend-icon="mdi-calendar-plus"
          >
            Reservar ahora
          </v-btn>
          <v-btn
            to="/precios"
            variant="outlined"
            size="large"
            rounded="xl"
            class="hero-outline"
            prepend-icon="mdi-tag-outline"
          >
            Ver precios
          </v-btn>
        </div>

        <!-- quick stats -->
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="stat-value">2 min</span>
            <span class="stat-label">para reservar</span>
          </div>
          <div class="stat-sep" />
          <div class="hero-stat">
            <span class="stat-value">5 pasos</span>
            <span class="stat-label">sencillos</span>
          </div>
          <div class="stat-sep" />
          <div class="hero-stat">
            <span class="stat-value">100 %</span>
            <span class="stat-label">online y seguro</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── STEPS ─── -->
    <section class="steps-section">
      <div class="steps-container">
        <div class="steps-header">
          <span class="section-chip">Paso a paso</span>
          <h2 class="steps-title">¿Cómo funciona?</h2>
          <p class="steps-sub">Cinco pasos claros y sin complicaciones</p>
        </div>

        <div class="steps-list">
          <article
            v-for="step in steps"
            :key="step.number"
            class="step-card"
            :style="{
              '--sc': step.color,
              '--sb': step.bg,
              '--sborder': step.border,
            }"
          >
            <!-- Left: number badge -->
            <div class="sc-badge" :style="{ background: step.bg, borderColor: step.border, color: step.color }">
              {{ step.number }}
            </div>

            <!-- Right: content -->
            <div class="sc-content">
              <div class="sc-head">
                <div class="sc-icon" :style="{ background: step.bg, borderColor: step.border }">
                  <v-icon :icon="step.icon" size="20" :color="step.color" />
                </div>
                <h3 class="sc-title">{{ step.title }}</h3>
              </div>
              <p class="sc-desc">{{ step.desc }}</p>
              <div class="sc-tip">
                <v-icon size="14" color="warning">mdi-lightbulb-on-outline</v-icon>
                <span>{{ step.tip }}</span>
              </div>
            </div>

            <div class="sc-accent-bar" />
          </article>
        </div>
      </div>
    </section>

    <!-- ─── CTA STRIP ─── -->
    <div class="cta-strip">
      <div class="cta-strip-bg" />
      <div class="cta-strip-inner">
        <div class="cta-text">
          <h2 class="cta-title">¿Todo claro? Empieza ahora</h2>
          <p class="cta-sub">Solo necesitas un par de minutos para reservar tu próxima cita</p>
        </div>
        <div class="cta-btns">
          <v-btn
            to="/reservar"
            color="primary"
            size="large"
            rounded="xl"
            elevation="0"
            prepend-icon="mdi-calendar-plus"
            class="cta-primary-btn"
          >
            Reservar cita
          </v-btn>
          <v-btn
            to="/auth/login"
            variant="outlined"
            size="large"
            rounded="xl"
            prepend-icon="mdi-account-plus-outline"
            class="cta-outline-btn"
          >
            Crear cuenta
          </v-btn>
        </div>
      </div>
    </div>

    <!-- ─── FAQ ─── -->
    <section class="faq-section">
      <div class="faq-container">
        <div class="faq-header">
          <span class="section-chip">FAQ</span>
          <h2 class="faq-title">Preguntas frecuentes</h2>
          <p class="faq-sub">Resolvemos las dudas más habituales</p>
        </div>

        <div class="faq-grid">
          <v-expansion-panels variant="accordion" class="faq-panels">
            <v-expansion-panel
              v-for="faq in faqs"
              :key="faq.q"
              class="faq-panel"
            >
              <v-expansion-panel-title class="faq-q">
                <div class="faq-q-inner">
                  <div class="faq-q-dot" />
                  {{ faq.q }}
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text class="faq-a">
                {{ faq.a }}
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>

        <!-- bottom cta -->
        <div class="faq-bottom">
          <p class="faq-bottom-text">¿Tienes más dudas? Escríbenos y te ayudamos.</p>
          <v-btn
            href="mailto:hola@peluarrabal.es"
            variant="outlined"
            rounded="xl"
            prepend-icon="mdi-email-outline"
            class="faq-contact-btn"
          >
            Contactar
          </v-btn>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.page-wrapper {
  background: var(--c-bg-main);
}

/* ─── ANIMATED ICON SCENE ─── */
.hero-icon-scene {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 8px;
}

/* Rotating outer ring */
.scene-ring {
  position: absolute;
  top: 0; left: 0;
  animation: ring-spin 18s linear infinite;
  transform-origin: 100px 100px;
}

@keyframes ring-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Glow behind scissors */
.scene-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(107,146,146,0.18) 0%, transparent 70%);
  animation: glow-pulse 3s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.7; transform: translate(-50%,-50%) scale(1); }
  50%       { opacity: 1;   transform: translate(-50%,-50%) scale(1.2); }
}

/* Central scissors */
.scene-scissors {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 0 14px rgba(107,146,146,0.40));
}

.blade-top {
  transform-origin: 40px 40px;
  animation: blade-t 3s ease-in-out infinite;
}
.blade-bottom {
  transform-origin: 40px 40px;
  animation: blade-b 3s ease-in-out infinite;
}

@keyframes blade-t {
  0%, 55%, 100% { transform: rotate(0deg); }
  25%            { transform: rotate(-16deg); }
}
@keyframes blade-b {
  0%, 55%, 100% { transform: rotate(0deg); }
  25%            { transform: rotate(16deg); }
}

/* Orbit items at the 4 cardinal points of the ring */
.orbit-item {
  position: absolute;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(20,23,16,0.85);
  border: 1px solid rgba(107,146,146,0.28);
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 12px rgba(0,0,0,0.35);
}

.o-top    { top: 8px;  left: 50%; transform: translateX(-50%); animation: float-v 4s ease-in-out infinite; }
.o-right  { top: 50%;  right: 4px; transform: translateY(-50%); animation: float-h 5s ease-in-out infinite 0.5s; border-color: rgba(200,169,110,0.28); }
.o-bottom { bottom: 8px; left: 50%; transform: translateX(-50%); animation: float-v 4.5s ease-in-out infinite 1s; }
.o-left   { top: 50%;  left: 4px; transform: translateY(-50%); animation: float-h 3.8s ease-in-out infinite 0.3s; border-color: rgba(200,169,110,0.28); }

@keyframes float-v {
  0%, 100% { transform: translateX(-50%) translateY(0px); }
  50%       { transform: translateX(-50%) translateY(-6px); }
}
@keyframes float-h {
  0%, 100% { transform: translateY(-50%) translateX(0px); }
  50%       { transform: translateY(-50%) translateX(-5px); }
}

/* ─── HERO ─── */
.hero-section {
  position: relative;
  overflow: hidden;
  background: linear-gradient(170deg, #1E2318 0%, #232818 55%, #1A2020 100%);
  border-bottom: 1px solid var(--c-border);
  padding: 100px 28px 80px;
  text-align: center;
}

.hero-bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.hero-glow-1 {
  width: 500px;
  height: 300px;
  background: radial-gradient(ellipse, rgba(107,146,146,0.11) 0%, transparent 70%);
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
}

.hero-glow-2 {
  width: 300px;
  height: 200px;
  background: radial-gradient(ellipse, rgba(200,169,110,0.07) 0%, transparent 70%);
  bottom: 0;
  right: 20%;
}

.hero-content {
  position: relative;
  max-width: 720px;
  margin: 0 auto;
}

.hero-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(107,146,146,0.09);
  border: 1px solid rgba(107,146,146,0.24);
  color: var(--c-teal);
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 26px;
}

.hero-title {
  font-size: clamp(2.4rem, 6vw, 3.8rem);
  font-weight: 800;
  color: var(--c-text);
  letter-spacing: -0.025em;
  line-height: 1.1;
  margin-bottom: 18px;
}

.hero-highlight {
  color: var(--c-teal);
  position: relative;
}

.hero-sub {
  font-size: 1.05rem;
  color: var(--c-text-soft);
  line-height: 1.7;
  max-width: 540px;
  margin: 0 auto 36px;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.hero-cta {
  font-weight: 600 !important;
  letter-spacing: 0.02em !important;
  padding: 0 28px !important;
}

.hero-outline {
  border-color: var(--c-border-strong) !important;
  color: var(--c-text-soft) !important;
  font-weight: 500 !important;
}

.hero-outline:hover {
  border-color: var(--c-teal) !important;
  color: var(--c-text) !important;
}

.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.hero-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--c-gold);
  letter-spacing: -0.01em;
}

.stat-label {
  font-size: 0.74rem;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.07em;
}

.stat-sep {
  width: 1px;
  height: 32px;
  background: var(--c-border);
}

/* ─── STEPS ─── */
.steps-section {
  padding: 90px 28px;
}

.steps-container {
  max-width: 680px;
  margin: 0 auto;
}

.steps-header {
  text-align: center;
  margin-bottom: 56px;
}

.section-chip {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-gold);
  background: rgba(200,169,110,0.07);
  border: 1px solid rgba(200,169,110,0.18);
  padding: 5px 14px;
  border-radius: 100px;
  margin-bottom: 16px;
}

.steps-title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  color: var(--c-text);
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.steps-sub,
.faq-sub {
  font-size: 0.95rem;
  color: var(--c-text-soft);
}

/* steps list */
.steps-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* step card */
.step-card {
  position: relative;
  overflow: hidden;
  background: var(--c-bg-card);
  border: 1px solid var(--sborder, var(--c-border));
  border-radius: 18px;
  padding: 26px 26px 24px 24px;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, border-color 0.25s ease;
}

.step-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 40px rgba(0,0,0,0.32);
  border-color: var(--sc);
}

/* number badge */
.sc-badge {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  margin-top: 2px;
}

/* content */
.sc-content {
  flex: 1;
  min-width: 0;
}

.sc-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.sc-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sc-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--c-text);
  letter-spacing: -0.01em;
}

.sc-desc {
  font-size: 0.875rem;
  color: var(--c-text-soft);
  line-height: 1.78;
  margin-bottom: 14px;
}

.sc-tip {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.8rem;
  color: var(--c-text-muted);
  line-height: 1.55;
  background: rgba(200,169,110,0.05);
  border: 1px solid rgba(200,169,110,0.12);
  border-radius: 9px;
  padding: 8px 12px;
}

.sc-accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: var(--sc);
  opacity: 0.5;
  transition: opacity 0.22s;
}

.step-card:hover .sc-accent-bar {
  opacity: 1;
}

/* ─── CTA STRIP ─── */
.cta-strip {
  position: relative;
  overflow: hidden;
  border-top: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
  padding: 52px 28px;
}

.cta-strip-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(107,146,146,0.06) 0%, var(--c-bg-card) 60%, rgba(200,169,110,0.04) 100%);
  pointer-events: none;
}

.cta-strip-inner {
  position: relative;
  max-width: 680px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  flex-wrap: wrap;
}

.cta-text {}

.cta-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--c-text);
  letter-spacing: -0.015em;
  margin-bottom: 6px;
}

.cta-sub {
  font-size: 0.9rem;
  color: var(--c-text-soft);
}

.cta-btns {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.cta-primary-btn {
  font-weight: 600 !important;
  letter-spacing: 0.02em !important;
}

.cta-outline-btn {
  border-color: var(--c-border-strong) !important;
  color: var(--c-text-soft) !important;
  font-weight: 500 !important;
}

.cta-outline-btn:hover {
  border-color: var(--c-teal) !important;
  color: var(--c-text) !important;
}

/* ─── FAQ ─── */
.faq-section {
  padding: 90px 28px;
}

.faq-container {
  max-width: 680px;
  margin: 0 auto;
}

.faq-header {
  text-align: center;
  margin-bottom: 52px;
}

.faq-title {
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 800;
  color: var(--c-text);
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.faq-grid {
  margin-bottom: 40px;
}

.faq-panels {
  background: transparent !important;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.faq-panel {
  background: var(--c-bg-card) !important;
  border: 1px solid var(--c-border) !important;
  border-radius: 14px !important;
  overflow: hidden;
  transition: border-color 0.22s, box-shadow 0.22s;
}

.faq-panel:hover {
  border-color: var(--c-border-strong) !important;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.faq-q {
  font-size: 0.94rem !important;
  font-weight: 500 !important;
  color: var(--c-text) !important;
  padding: 18px 20px !important;
}

.faq-q-inner {
  display: flex;
  align-items: center;
  gap: 12px;
}

.faq-q-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--c-teal);
  flex-shrink: 0;
}

.faq-a {
  font-size: 0.875rem !important;
  color: var(--c-text-soft) !important;
  line-height: 1.8 !important;
  padding-bottom: 4px !important;
}

/* bottom contact */
.faq-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  padding-top: 12px;
}

.faq-bottom-text {
  font-size: 0.88rem;
  color: var(--c-text-muted);
}

.faq-contact-btn {
  border-color: var(--c-border-strong) !important;
  color: var(--c-text-soft) !important;
  font-size: 0.84rem !important;
}

.faq-contact-btn:hover {
  border-color: var(--c-teal) !important;
  color: var(--c-teal) !important;
}

/* ─── RESPONSIVE ─── */
@media (max-width: 600px) {
  .step-card {
    flex-direction: column;
    gap: 14px;
    padding: 20px 16px 18px;
  }

  .sc-badge {
    width: 38px;
    height: 38px;
    font-size: 0.76rem;
  }

  .hero-stats {
    gap: 20px;
  }

  .stat-sep {
    display: none;
  }

  .cta-strip-inner {
    flex-direction: column;
    text-align: center;
  }

  .cta-btns {
    justify-content: center;
  }
}
</style>
