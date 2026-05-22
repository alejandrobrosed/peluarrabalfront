<script setup lang="ts">
import AppSnackbar from "@/components/common/AppSnackbar.vue";
</script>

<template>
  <v-app class="auth-app">
    <!-- Mini header to go back home -->
    <header class="auth-header">
      <div class="auth-header-inner">
        <router-link to="/" class="auth-logo-link">
          <v-img
            src="/img/peluarrabal.png"
            max-height="38"
            max-width="130"
            contain
          />
        </router-link>
        <router-link to="/" class="back-home-btn">
          <v-icon size="17" class="mr-1">mdi-arrow-left</v-icon>
          Volver al inicio
        </router-link>
      </div>
    </header>

    <v-main class="auth-main">
      <div class="auth-bg" />
      <div class="auth-content">
        <router-view />
      </div>
    </v-main>

    <AppSnackbar />
  </v-app>
</template>

<style scoped>
.auth-app {
  background: var(--c-bg-main) !important;
}

/* ─── HEADER ─── */
.auth-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(26, 29, 18, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--c-border);
  height: 56px;
}

.auth-header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.auth-logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.back-home-btn {
  display: inline-flex;
  align-items: center;
  font-size: 0.84rem;
  font-weight: 500;
  color: var(--c-text-soft);
  text-decoration: none;
  padding: 7px 14px;
  border-radius: 8px;
  border: 1px solid var(--c-border);
  transition: all 0.2s;
}

.back-home-btn:hover {
  border-color: var(--c-border-strong);
  color: var(--c-text);
  background: rgba(242, 227, 188, 0.04);
}

/* ─── MAIN ─── */
.auth-main {
  position: relative;
  min-height: 100vh;
  display: flex !important;
  align-items: center;
  justify-content: center;
  padding-top: 56px;
}

.auth-bg {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 25%, rgba(107, 146, 146, 0.09) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 75%, rgba(200, 169, 110, 0.06) 0%, transparent 55%),
    var(--c-bg-main);
  z-index: 0;
}

.auth-content {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 56px);
}
</style>
