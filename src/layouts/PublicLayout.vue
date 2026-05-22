<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import AppSnackbar from "@/components/common/AppSnackbar.vue";

const auth = useAuthStore();

const navLinks = [
  { to: "/",              label: "Inicio" },
  { to: "/precios",       label: "Precios" },
  { to: "/sobre-nosotros",label: "Sobre Nosotros" },
  { to: "/como-reservar", label: "Cómo Reservar" },
  { to: "/empleo",        label: "Empleo" },
];
</script>

<template>
  <v-app>
    <!-- ─── HEADER ─── -->
    <v-app-bar
      elevation="0"
      height="80"
      class="app-bar"
      sticky
    >
      <div class="bar-inner">

        <!-- ── Logo (izquierda) ── -->
        <div class="logo-area">
          <router-link to="/" class="logo-link">
            <!-- Emblem -->
            <div class="logo-emblem">
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Outer gold ring -->
                <circle cx="21" cy="21" r="20" stroke="url(#logoGrad)" stroke-width="1.2"/>
                <!-- Inner teal fill -->
                <circle cx="21" cy="21" r="16" fill="rgba(107,146,146,0.10)"/>
                <!-- Scissors: blade top -->
                <path d="M21 21 L10 10" stroke="#6B9292" stroke-width="2.4" stroke-linecap="round"/>
                <circle cx="8.5" cy="8.5" r="4" stroke="#6B9292" stroke-width="1.6" fill="rgba(107,146,146,0.18)"/>
                <circle cx="8.5" cy="8.5" r="1.5" fill="#6B9292"/>
                <!-- Scissors: blade bottom -->
                <path d="M21 21 L10 32" stroke="#6B9292" stroke-width="2.4" stroke-linecap="round"/>
                <circle cx="8.5" cy="33.5" r="4" stroke="#6B9292" stroke-width="1.6" fill="rgba(107,146,146,0.18)"/>
                <circle cx="8.5" cy="33.5" r="1.5" fill="#6B9292"/>
                <!-- Pivot dot -->
                <circle cx="21" cy="21" r="2.2" fill="#6B9292"/>
                <!-- Handle -->
                <path d="M21 21 L33 21" stroke="#C8A96E" stroke-width="2" stroke-linecap="round"/>
                <path d="M29.5 17.5 L33 21 L29.5 24.5" stroke="#C8A96E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                <!-- Gradient def -->
                <defs>
                  <linearGradient id="logoGrad" x1="0" y1="0" x2="42" y2="42" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#C8A96E" stop-opacity="0.7"/>
                    <stop offset="50%" stop-color="#6B9292" stop-opacity="0.6"/>
                    <stop offset="100%" stop-color="#C8A96E" stop-opacity="0.7"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <!-- Text -->
            <div class="logo-text">
              <span class="logo-name">La Pelu</span>
              <span class="logo-sub">del Arrabal</span>
            </div>
          </router-link>
        </div>

        <!-- ── Nav central ── -->
        <nav class="nav-links">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="nav-item"
            :class="{ 'nav-item--active': $route.path === link.to || (link.to !== '/' && $route.path.startsWith(link.to)) }"
          >
            {{ link.label }}
            <span class="nav-dot" />
          </router-link>
        </nav>

        <!-- ── Auth (derecha) ── -->
        <div class="auth-area">
          <template v-if="!auth.isLogged">
            <v-btn
              to="/auth/login"
              variant="text"
              class="login-text-btn"
            >
              Entrar
            </v-btn>
            <v-btn
              to="/auth/login"
              variant="outlined"
              rounded="lg"
              class="login-btn"
              prepend-icon="mdi-account-outline"
            >
              Crear cuenta
            </v-btn>
          </template>
          <template v-else>
            <v-btn to="/mis-citas" variant="text" class="mis-citas-btn" prepend-icon="mdi-calendar-account">
              Mis citas
            </v-btn>
            <v-btn
              to="/reservar"
              color="primary"
              variant="elevated"
              rounded="lg"
              elevation="0"
              class="reservar-btn"
              prepend-icon="mdi-calendar-plus"
            >
              Reservar
            </v-btn>
          </template>
        </div>

      </div>
    </v-app-bar>

    <!-- ─── MAIN ─── -->
    <v-main style="padding-top: 80px !important;">
      <router-view />
    </v-main>

    <!-- ─── FOOTER ─── -->
    <footer class="site-footer">
      <div class="footer-grid">
        <!-- Col 1 -->
        <div class="footer-col">
          <v-img
            src="/img/peluarrabal.png"
            max-width="150"
            max-height="50"
            contain
            class="mb-5"
          />
          <p class="footer-desc">
            Tu salón de confianza en el corazón del Arrabal. Cuidamos tu imagen con profesionalidad y pasión.
          </p>
          <div class="social-row">
            <a href="/" class="social-btn" aria-label="Instagram">
              <v-icon size="20">mdi-instagram</v-icon>
            </a>
            <a href="/" class="social-btn" aria-label="Facebook">
              <v-icon size="20">mdi-facebook</v-icon>
            </a>
            <a href="/" class="social-btn" aria-label="Twitter">
              <v-icon size="20">mdi-twitter</v-icon>
            </a>
          </div>
        </div>

        <!-- Col 2 -->
        <div class="footer-col">
          <h4 class="footer-heading">Horario</h4>
          <div class="schedule">
            <div class="schedule-row">
              <span>Lunes – Viernes</span>
              <span class="schedule-time">9:00 – 20:00</span>
            </div>
            <div class="schedule-row">
              <span>Sábado</span>
              <span class="schedule-time">9:00 – 14:00</span>
            </div>
            <div class="schedule-row">
              <span>Domingo</span>
              <span class="schedule-closed">Cerrado</span>
            </div>
          </div>
        </div>

        <!-- Col 3 -->
        <div class="footer-col">
          <h4 class="footer-heading">Contacto</h4>
          <div class="contact-list">
            <div class="contact-row">
              <v-icon size="17" color="primary">mdi-map-marker</v-icon>
              <span>C/ del Arrabal 42, Zaragoza</span>
            </div>
            <div class="contact-row">
              <v-icon size="17" color="primary">mdi-phone</v-icon>
              <span>+34 976 000 000</span>
            </div>
            <div class="contact-row">
              <v-icon size="17" color="primary">mdi-email</v-icon>
              <span>hola@peluarrabal.es</span>
            </div>
          </div>

          <h4 class="footer-heading mt-6 mb-3">Navegación</h4>
          <div class="footer-nav">
            <router-link to="/" class="footer-nav-link">Inicio</router-link>
            <router-link to="/precios" class="footer-nav-link">Precios</router-link>
            <router-link to="/como-reservar" class="footer-nav-link">Cómo reservar</router-link>
            <router-link to="/empleo" class="footer-nav-link">Trabaja con nosotros</router-link>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2026 La Pelu del Arrabal — Todos los derechos reservados</span>
      </div>
    </footer>

    <AppSnackbar />
  </v-app>
</template>

<style scoped>
/* ─── APP BAR ─── */
.app-bar {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 1000 !important;
  background: rgba(20, 23, 16, 0.96) !important;
  backdrop-filter: blur(18px) !important;
  -webkit-backdrop-filter: blur(18px) !important;
  border-bottom: 1px solid rgba(200, 169, 110, 0.12) !important;
}

.bar-inner {
  width: 100%;
  max-width: 1340px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
}

/* ── Logo ── */
.logo-area {
  flex: 1;
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 11px;
  text-decoration: none;
  transition: opacity 0.22s;
}

.logo-link:hover {
  opacity: 0.82;
}

.logo-emblem {
  flex-shrink: 0;
  transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
}

.logo-link:hover .logo-emblem {
  transform: rotate(-8deg) scale(1.06);
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo-name {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--c-text);
  letter-spacing: -0.02em;
}

.logo-sub {
  font-size: 0.68rem;
  font-weight: 500;
  color: var(--c-gold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 3px;
}

/* ── Nav central ── */
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: rgba(242, 227, 188, 0.46);
  padding: 6px 14px;
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;
}

.nav-item:hover {
  color: var(--c-text);
  background: rgba(200, 169, 110, 0.05);
}

.nav-item--active {
  color: var(--c-text) !important;
}

/* dot indicator below active link */
.nav-dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--c-teal);
  opacity: 0;
  transition: opacity 0.2s, transform 0.2s;
  transform: scale(0.5);
  margin-top: -2px;
}

.nav-item--active .nav-dot {
  opacity: 1;
  transform: scale(1);
}

.nav-item:hover .nav-dot {
  opacity: 0.4;
  transform: scale(1);
}

/* ── Auth area ── */
.auth-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.login-text-btn {
  color: rgba(242, 227, 188, 0.55) !important;
  font-size: 0.84rem !important;
  font-weight: 400 !important;
  letter-spacing: 0.02em !important;
}

.login-text-btn:hover {
  color: var(--c-text) !important;
}

.login-btn {
  border-color: rgba(200, 169, 110, 0.22) !important;
  color: var(--c-text-soft) !important;
  font-size: 0.84rem !important;
  font-weight: 500 !important;
  letter-spacing: 0.03em !important;
}

.login-btn:hover {
  border-color: var(--c-teal) !important;
  color: var(--c-text) !important;
  background: rgba(107, 146, 146, 0.06) !important;
}

.mis-citas-btn {
  color: rgba(242, 227, 188, 0.55) !important;
  font-size: 0.84rem !important;
  font-weight: 400 !important;
}

.mis-citas-btn:hover {
  color: var(--c-text) !important;
}

.reservar-btn {
  font-weight: 600 !important;
  font-size: 0.84rem !important;
  letter-spacing: 0.03em !important;
  box-shadow: 0 0 0 1px rgba(107, 146, 146, 0.3), 0 4px 16px rgba(107, 146, 146, 0.18) !important;
}

.reservar-btn:hover {
  box-shadow: 0 0 0 1px rgba(107, 146, 146, 0.5), 0 6px 24px rgba(107, 146, 146, 0.28) !important;
}

/* ─── FOOTER ─── */
.site-footer {
  background: var(--c-bg-deep);
  border-top: 3px solid transparent;
  border-image: linear-gradient(90deg, transparent, rgba(200,169,110,0.35) 30%, rgba(107,146,146,0.35) 70%, transparent) 1;
  margin-top: 2px;
  padding: 72px 28px 0;
  position: relative;
}

.site-footer::before {
  content: "";
  position: absolute;
  top: -12px;
  left: 0;
  right: 0;
  height: 12px;
  background: linear-gradient(to bottom, transparent, rgba(8, 10, 6, 0.6));
  pointer-events: none;
}

.footer-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1.2fr;
  gap: 56px;
  padding-bottom: 60px;
}

@media (max-width: 900px) {
  .nav-links {
    display: none;
  }
  .login-text-btn {
    display: none !important;
  }
}

@media (max-width: 860px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}

.footer-desc {
  font-size: 0.875rem;
  color: var(--c-text-soft);
  line-height: 1.75;
  max-width: 280px;
  margin-bottom: 22px;
}

.social-row {
  display: flex;
  gap: 10px;
}

.social-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(107, 146, 146, 0.08);
  border: 1px solid rgba(107, 146, 146, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-soft);
  text-decoration: none;
  transition: all 0.2s;
}

.social-btn:hover {
  background: rgba(107, 146, 146, 0.18);
  border-color: var(--c-teal);
  color: var(--c-teal);
}

.footer-heading {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--c-gold);
  margin-bottom: 20px;
}

.schedule {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.schedule-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--c-text-soft);
}

.schedule-time {
  color: var(--c-teal);
  font-weight: 500;
}

.schedule-closed {
  color: var(--c-text-muted);
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.875rem;
  color: var(--c-text-soft);
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-nav-link {
  font-size: 0.875rem;
  color: var(--c-text-soft);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-nav-link:hover {
  color: var(--c-teal);
}

.footer-bottom {
  border-top: 1px solid rgba(200,169,110,0.08);
  padding: 22px 0;
  text-align: center;
  font-size: 0.78rem;
  color: rgba(242,227,188,0.28);
  letter-spacing: 0.03em;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
