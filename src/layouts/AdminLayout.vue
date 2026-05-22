<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useUiStore } from "@/stores/ui";
import AppSnackbar from "@/components/common/AppSnackbar.vue";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const ui = useUiStore();

const navItems = [
  { title: "Dashboard", to: "/admin", icon: "mdi-view-dashboard-outline", activeIcon: "mdi-view-dashboard" },
  { title: "Clientes", to: "/admin/clients", icon: "mdi-account-group-outline", activeIcon: "mdi-account-group" },
  { title: "Citas", to: "/admin/appointments", icon: "mdi-calendar-month-outline", activeIcon: "mdi-calendar-month" },
];

const pageTitle = computed(() => {
  const item = navItems.find((n) => n.to === route.path);
  return item?.title ?? "Panel Admin";
});

function logout() {
  auth.logout();
  ui.notify("Sesión cerrada", "info");
  router.push("/auth/login");
}
</script>

<template>
  <v-app class="admin-app">
    <!-- ─── SIDEBAR ─── -->
    <v-navigation-drawer permanent width="230" class="admin-sidebar">
      <!-- Logo area -->
      <div class="sidebar-logo-area">
        <v-img
          src="/img/peluarrabal.png"
          max-height="38"
          max-width="120"
          contain
        />
        <span class="admin-badge">Admin</span>
      </div>

      <v-divider class="sidebar-divider" />

      <!-- Navigation -->
      <nav class="sidebar-nav">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="sidebar-link"
          :class="{ 'sidebar-link--active': route.path === item.to }"
        >
          <v-icon
            :icon="route.path === item.to ? item.activeIcon : item.icon"
            size="20"
            class="sidebar-link-icon"
          />
          <span>{{ item.title }}</span>
        </router-link>
      </nav>

      <!-- Back to site -->
      <div class="sidebar-back-area">
        <v-divider class="sidebar-divider mb-3" />
        <router-link to="/" class="sidebar-back-link">
          <v-icon size="17" class="mr-2">mdi-arrow-left</v-icon>
          Volver al inicio
        </router-link>
      </div>

      <!-- Bottom: user + logout -->
      <div class="sidebar-bottom">
        <v-divider class="sidebar-divider mb-4" />
        <div class="sidebar-user">
          <div class="sidebar-avatar">
            <v-icon size="18" color="primary">mdi-account</v-icon>
          </div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name">{{ auth.user?.nombre }}</div>
            <div class="sidebar-user-role">Administrador</div>
          </div>
        </div>
        <button class="sidebar-logout" @click="logout">
          <v-icon size="17" class="mr-2">mdi-logout</v-icon>
          Cerrar sesión
        </button>
      </div>
    </v-navigation-drawer>

    <!-- ─── TOP BAR ─── -->
    <v-app-bar elevation="0" class="admin-topbar" height="60">
      <div class="topbar-inner">
        <div class="topbar-title">{{ pageTitle }}</div>
        <div class="topbar-right">
          <div class="topbar-date">
            <v-icon size="15" color="primary" class="mr-1">mdi-calendar</v-icon>
            <span>{{ new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" }) }}</span>
          </div>
        </div>
      </div>
    </v-app-bar>

    <!-- ─── MAIN ─── -->
    <v-main class="admin-main">
      <router-view />
    </v-main>

    <AppSnackbar />
  </v-app>
</template>

<style scoped>
/* ─── APP ─── */
.admin-app {
  background: #111410 !important;
}

/* ─── SIDEBAR ─── */
.admin-sidebar {
  background: #141710 !important;
  border-right: 1px solid rgba(200, 169, 110, 0.08) !important;
}

.sidebar-logo-area {
  padding: 20px 18px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.admin-badge {
  background: rgba(107, 146, 146, 0.15);
  border: 1px solid rgba(107, 146, 146, 0.25);
  color: #6B9292;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 6px;
}

.sidebar-divider {
  border-color: rgba(200, 169, 110, 0.07) !important;
}

.sidebar-nav {
  padding: 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 0.875rem;
  color: rgba(242, 227, 188, 0.55);
  transition: all 0.2s ease;
  font-weight: 400;
}

.sidebar-link:hover {
  background: rgba(107, 146, 146, 0.08);
  color: rgba(242, 227, 188, 0.85);
}

.sidebar-link--active {
  background: rgba(107, 146, 146, 0.14) !important;
  color: #F2E3BC !important;
  font-weight: 500;
}

.sidebar-link--active .sidebar-link-icon {
  color: #6B9292 !important;
}

.sidebar-link-icon {
  color: rgba(242, 227, 188, 0.35);
  transition: color 0.2s;
  flex-shrink: 0;
}

.sidebar-link:hover .sidebar-link-icon {
  color: rgba(107, 146, 146, 0.8);
}

/* Back to site */
.sidebar-back-area {
  padding: 0 12px;
}

.sidebar-back-link {
  display: flex;
  align-items: center;
  padding: 9px 14px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 0.84rem;
  color: rgba(242, 227, 188, 0.45);
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.sidebar-back-link:hover {
  background: rgba(200, 169, 110, 0.07);
  border-color: rgba(200, 169, 110, 0.14);
  color: var(--c-gold);
}

/* Bottom area */
.sidebar-bottom {
  margin-top: auto;
  padding: 16px 12px;
}

.sidebar-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 4px;
  margin-bottom: 12px;
}

.sidebar-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(107, 146, 146, 0.12);
  border: 1px solid rgba(107, 146, 146, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sidebar-user-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #F2E3BC;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-user-role {
  font-size: 0.72rem;
  color: rgba(242, 227, 188, 0.4);
}

.sidebar-logout {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 14px;
  border-radius: 10px;
  background: transparent;
  border: 1px solid rgba(201, 120, 120, 0.15);
  color: #C97878;
  font-size: 0.84rem;
  cursor: pointer;
  transition: all 0.2s;
}

.sidebar-logout:hover {
  background: rgba(201, 120, 120, 0.08);
  border-color: rgba(201, 120, 120, 0.3);
}

/* ─── TOP BAR ─── */
.admin-topbar {
  background: #1A1D12 !important;
  border-bottom: 1px solid rgba(200, 169, 110, 0.07) !important;
}

.topbar-inner {
  width: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-title {
  font-size: 1rem;
  font-weight: 700;
  color: #F2E3BC;
  letter-spacing: -0.01em;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.topbar-date {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: rgba(242, 227, 188, 0.45);
  text-transform: capitalize;
}

/* ─── MAIN ─── */
.admin-main {
  background: #1A1D12 !important;
}
</style>
