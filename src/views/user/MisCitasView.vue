<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useMisCitasStore } from "@/stores/misCitas";
import { useUiStore } from "@/stores/ui";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const store = useMisCitasStore();
const ui = useUiStore();
const router = useRouter();

onMounted(() => {
  store.fetchMisCitas(auth.user.id);
});

async function cancelar(id: number) {
  await store.cancelarCita(id);
  ui.notify("Cita cancelada", "success");
}

function logout() {
  auth.logout();
  ui.notify("Sesión cerrada", "info");
  router.push("/auth/login");
}
</script>

<template>
  <div>
    <!-- ─── PAGE HEADER ─── -->
    <div class="page-hero">
      <v-container class="hero-inner">
        <div>
          <router-link to="/" class="back-home-link">
            <v-icon size="15" class="mr-1">mdi-arrow-left</v-icon>
            Volver al inicio
          </router-link>
          <div class="section-label">Panel personal</div>
          <h1 class="page-title">Mis citas</h1>
          <p class="page-subtitle">Bienvenido/a, <strong>{{ auth.user.nombre }}</strong></p>
        </div>
        <div class="hero-actions">
          <v-btn
            to="/reservar"
            color="primary"
            rounded="lg"
            elevation="0"
            prepend-icon="mdi-calendar-plus"
          >
            Nueva cita
          </v-btn>
          <v-btn
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-logout"
            class="logout-btn"
            @click="logout"
          >
            Cerrar sesión
          </v-btn>
        </div>
      </v-container>
    </div>

    <!-- ─── TABLE ─── -->
    <v-container class="section-container py-12">
      <div class="table-wrap">
        <v-data-table
          :items="store.lista"
          :loading="store.loading"
          item-key="id_Reserva"
          class="citas-table"
        >
          <template #headers>
            <tr>
              <th class="th">Fecha</th>
              <th class="th">Hora</th>
              <th class="th">Servicio</th>
              <th class="th">Profesional</th>
              <th class="th">Estado</th>
              <th class="th">Acciones</th>
            </tr>
          </template>

          <template #item="{ item }">
            <tr class="table-row">
              <td class="td">
                <v-icon size="15" color="primary" class="mr-1">mdi-calendar</v-icon>
                {{ item.fecha }}
              </td>
              <td class="td">
                <v-icon size="15" color="primary" class="mr-1">mdi-clock-outline</v-icon>
                {{ item.hora_Inicio }}
              </td>
              <td class="td">{{ item.servicio }}</td>
              <td class="td">{{ item.empleado }}</td>
              <td class="td">
                <v-chip
                  :color="
                    item.estado === 'pendiente' ? 'warning'
                    : item.estado === 'cancelada' ? 'error'
                    : 'success'
                  "
                  size="small"
                  variant="tonal"
                >
                  {{ item.estado }}
                </v-chip>
              </td>
              <td class="td">
                <v-btn
                  v-if="item.estado !== 'cancelada'"
                  size="small"
                  variant="tonal"
                  color="error"
                  rounded="lg"
                  @click="cancelar(item.id_Reserva)"
                >
                  Cancelar
                </v-btn>
                <span v-else class="no-action">—</span>
              </td>
            </tr>
          </template>

          <template #no-data>
            <div class="empty-state">
              <v-icon size="52" color="primary" class="mb-4">mdi-calendar-blank-outline</v-icon>
              <p class="empty-title">No tienes citas reservadas</p>
              <p class="empty-sub mb-6">Reserva tu primera cita en menos de un minuto</p>
              <v-btn to="/reservar" color="primary" rounded="lg" elevation="0">
                <v-icon start>mdi-calendar-plus</v-icon>
                Reservar ahora
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
/* ─── PAGE HEADER ─── */
.page-hero {
  background: var(--c-bg-card);
  border-bottom: 1px solid var(--c-border);
  padding: 36px 24px 48px;
}

.back-home-link {
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  color: rgba(242,227,188,0.4);
  text-decoration: none;
  margin-bottom: 16px;
  transition: color 0.2s;
  letter-spacing: 0.02em;
}

.back-home-link:hover {
  color: var(--c-gold);
}

.hero-inner {
  max-width: 1100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.section-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-gold);
  margin-bottom: 8px;
}

.page-title {
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 700;
  color: var(--c-text);
  margin-bottom: 4px;
}

.page-subtitle {
  font-size: 0.9rem;
  color: var(--c-text-soft);
}

.page-subtitle strong {
  color: var(--c-teal);
  font-weight: 600;
}

.hero-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.logout-btn {
  border-color: rgba(201, 120, 120, 0.3) !important;
  color: #C97878 !important;
}

.logout-btn:hover {
  border-color: rgba(201, 120, 120, 0.6) !important;
}

/* ─── TABLE ─── */
.section-container {
  max-width: 1100px;
  margin: 0 auto;
}

.table-wrap {
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: 16px;
  overflow: hidden;
}

.citas-table {
  background: transparent !important;
}

.th {
  font-size: 0.76rem !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
  color: var(--c-text-muted) !important;
  padding: 16px 20px !important;
  border-bottom: 1px solid var(--c-border) !important;
}

.table-row {
  transition: background 0.18s;
}

.table-row:hover {
  background: rgba(107, 146, 146, 0.05) !important;
}

.td {
  font-size: 0.88rem;
  color: var(--c-text-soft);
  padding: 14px 20px !important;
  border-bottom: 1px solid var(--c-border) !important;
}

.no-action {
  font-size: 0.85rem;
  color: var(--c-text-muted);
}

/* ─── EMPTY STATE ─── */
.empty-state {
  padding: 64px 24px;
  text-align: center;
}

.empty-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--c-text);
  margin-bottom: 6px;
}

.empty-sub {
  font-size: 0.87rem;
  color: var(--c-text-soft);
}
</style>
