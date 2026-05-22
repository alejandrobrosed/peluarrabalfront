<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { dashboardService } from "@/services/dashboard";

const loading = ref(false);

const dashboard = ref<any>({
  citasHoy: 0,
  citasSemana: 0,
  clientesActivos: 0,
  canceladasMes: 0,
  proximasCitas: [],
  topServicios: [],
});

onMounted(async () => {
  loading.value = true;
  try {
    dashboard.value = await dashboardService.getDashboard();
  } finally {
    loading.value = false;
  }
});

const kpis = [
  {
    key: "citasHoy",
    label: "Citas hoy",
    sublabel: "Reservas activas",
    icon: "mdi-calendar-today",
    color: "#6B9292",
    bg: "rgba(107,146,146,0.08)",
    border: "rgba(107,146,146,0.22)",
    glow: "rgba(107,146,146,0.15)",
  },
  {
    key: "citasSemana",
    label: "Esta semana",
    sublabel: "Citas en 7 días",
    icon: "mdi-calendar-week",
    color: "#C8A96E",
    bg: "rgba(200,169,110,0.08)",
    border: "rgba(200,169,110,0.22)",
    glow: "rgba(200,169,110,0.14)",
  },
  {
    key: "clientesActivos",
    label: "Clientes",
    sublabel: "Usuarios registrados",
    icon: "mdi-account-group",
    color: "#7BAA88",
    bg: "rgba(123,170,136,0.08)",
    border: "rgba(123,170,136,0.22)",
    glow: "rgba(123,170,136,0.14)",
  },
  {
    key: "canceladasMes",
    label: "Canceladas",
    sublabel: "Este mes",
    icon: "mdi-calendar-remove",
    color: "#C97878",
    bg: "rgba(201,120,120,0.08)",
    border: "rgba(201,120,120,0.22)",
    glow: "rgba(201,120,120,0.14)",
  },
];

const maxTotal = computed(() => {
  const tops = dashboard.value.topServicios ?? [];
  return tops.length ? Math.max(...tops.map((s: any) => s.total)) : 1;
});

function barWidth(total: number) {
  return Math.max(8, Math.round((total / maxTotal.value) * 100));
}

const rankColors = ["#6B9292", "#C8A96E", "#7BAA88", "#C87B9E", "#8B9EC8"];

function estadoColor(estado: string) {
  if (estado === "pendiente")  return "#C8A96E";
  if (estado === "cancelada")  return "#C97878";
  if (estado === "confirmada") return "#6B9292";
  return "#7BAA88";
}

function estadoIcon(estado: string) {
  if (estado === "pendiente")  return "mdi-clock-outline";
  if (estado === "cancelada")  return "mdi-close-circle-outline";
  if (estado === "confirmada") return "mdi-check-circle-outline";
  return "mdi-circle-outline";
}
</script>

<template>
  <div class="dashboard">

    <!-- ─── TOP BAR ─── -->
    <div class="dash-topbar">
      <div>
        <div class="dash-greeting">Panel de control</div>
        <h1 class="dash-title">Dashboard</h1>
      </div>
    </div>

    <!-- ─── KPI CARDS ─── -->
    <div class="kpi-grid">
      <div
        v-for="kpi in kpis"
        :key="kpi.key"
        class="kpi-card"
        :style="{ '--kc': kpi.color, '--kb': kpi.bg, '--kborder': kpi.border, '--kglow': kpi.glow }"
      >
        <div class="kpi-glow" />
        <div class="kpi-top">
          <div class="kpi-icon-wrap">
            <v-icon :icon="kpi.icon" size="24" :color="kpi.color" />
          </div>
          <div class="kpi-labels">
            <div class="kpi-label">{{ kpi.label }}</div>
            <div class="kpi-sublabel">{{ kpi.sublabel }}</div>
          </div>
        </div>
        <div class="kpi-value">
          <span v-if="loading">—</span>
          <span v-else>{{ dashboard[kpi.key] }}</span>
        </div>
        <div class="kpi-bar-track">
          <div class="kpi-bar-fill" />
        </div>
      </div>
    </div>

    <!-- ─── MAIN GRID ─── -->
    <div class="main-grid">

      <!-- Próximas citas -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">
            <div class="panel-title-dot" style="background:#6B9292" />
            Próximas citas
          </div>
          <span class="panel-badge">{{ dashboard.proximasCitas?.length ?? 0 }} citas</span>
        </div>

        <div class="table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in dashboard.proximasCitas" :key="c.id_Reserva" class="table-row">
                <td>
                  <div class="cell-date">
                    <v-icon size="13" color="primary" class="mr-1">mdi-calendar</v-icon>
                    {{ c.fecha }}
                  </div>
                </td>
                <td>
                  <div class="cell-date">
                    <v-icon size="13" color="primary" class="mr-1">mdi-clock-outline</v-icon>
                    {{ c.hora_Inicio }}
                  </div>
                </td>
                <td>
                  <div class="cell-client">
                    <div class="client-avatar">{{ (c.clienteNombre ?? '?')[0].toUpperCase() }}</div>
                    {{ c.clienteNombre }}
                  </div>
                </td>
                <td class="cell-service">{{ c.servicioNombre }}</td>
                <td>
                  <span
                    class="estado-badge"
                    :style="{ color: estadoColor(c.estado), borderColor: estadoColor(c.estado) + '40', background: estadoColor(c.estado) + '14' }"
                  >
                    <v-icon :icon="estadoIcon(c.estado)" size="11" class="mr-1" />
                    {{ c.estado }}
                  </span>
                </td>
              </tr>
              <tr v-if="!dashboard.proximasCitas?.length && !loading">
                <td colspan="5" class="empty-row">
                  <v-icon size="32" color="primary" class="mb-2" style="opacity:0.3">mdi-calendar-blank-outline</v-icon>
                  <div>No hay citas próximas</div>
                </td>
              </tr>
              <tr v-if="loading">
                <td colspan="5" class="empty-row">
                  <v-progress-circular indeterminate size="24" color="primary" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Servicios populares -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">
            <div class="panel-title-dot" style="background:#C8A96E" />
            Servicios populares
          </div>
        </div>

        <div class="services-list">
          <div v-if="loading" class="empty-services">
            <v-progress-circular indeterminate size="24" color="primary" />
          </div>
          <div v-else-if="!dashboard.topServicios?.length" class="empty-services">
            <v-icon size="32" style="opacity:0.3; color:#6B9292" class="mb-2">mdi-chart-bar</v-icon>
            <div>Sin datos todavía</div>
          </div>
          <div
            v-for="(s, i) in dashboard.topServicios"
            :key="s.id_Servicio"
            class="service-row"
          >
            <div class="service-rank" :style="{ color: rankColors[Number(i)], background: rankColors[Number(i)] + '18', borderColor: rankColors[Number(i)] + '35' }">
              {{ Number(i) + 1 }}
            </div>
            <div class="service-info">
              <div class="service-name">{{ s.nombre }}</div>
              <div class="service-bar-track">
                <div
                  class="service-bar-fill"
                  :style="{ width: barWidth(Number(s.total)) + '%', background: rankColors[Number(i)] }"
                />
              </div>
            </div>
            <div class="service-count" :style="{ color: rankColors[Number(i)] }">{{ s.total }}</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 32px 36px 48px;
  max-width: 1400px;
  width: 100%;
}

/* ─── TOP BAR ─── */
.dash-topbar {
  margin-bottom: 32px;
}

.dash-greeting {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #C8A96E;
  margin-bottom: 4px;
}

.dash-title {
  font-size: 2rem;
  font-weight: 800;
  color: #F2E3BC;
  letter-spacing: -0.02em;
}

/* ─── KPI GRID ─── */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 24px;
}

@media (max-width: 1000px) { .kpi-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px)  { .kpi-grid { grid-template-columns: 1fr; } }

.kpi-card {
  position: relative;
  overflow: hidden;
  background: #1E2218;
  border: 1px solid var(--kborder);
  border-radius: 20px;
  padding: 28px 26px 24px;
  transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s;
}

.kpi-card:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: 0 20px 52px rgba(0,0,0,0.40), 0 0 0 1px var(--kborder);
}

.kpi-glow {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--kglow);
  filter: blur(28px);
  pointer-events: none;
}

.kpi-top {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 20px;
}

.kpi-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  border: 1px solid var(--kborder);
  background: var(--kb);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.kpi-labels {
  padding-top: 4px;
}

.kpi-label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: rgba(242,227,188,0.55);
  margin-bottom: 2px;
}

.kpi-sublabel {
  font-size: 0.72rem;
  color: rgba(242,227,188,0.30);
}

.kpi-value {
  font-size: 3.2rem;
  font-weight: 800;
  color: var(--kc);
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 18px;
}

.kpi-bar-track {
  height: 3px;
  background: var(--kb);
  border-radius: 3px;
  overflow: hidden;
}

.kpi-bar-fill {
  height: 100%;
  width: 60%;
  background: var(--kc);
  border-radius: 3px;
  opacity: 0.6;
}

/* ─── MAIN GRID ─── */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 18px;
}

@media (max-width: 960px) {
  .main-grid { grid-template-columns: 1fr; }
}

/* ─── PANEL ─── */
.panel {
  background: #1E2218;
  border: 1px solid rgba(200,169,110,0.10);
  border-radius: 20px;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 26px;
  border-bottom: 1px solid rgba(200,169,110,0.07);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  color: #F2E3BC;
  letter-spacing: -0.01em;
}

.panel-title-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.panel-badge {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #6B9292;
  background: rgba(107,146,146,0.10);
  border: 1px solid rgba(107,146,146,0.22);
  padding: 3px 10px;
  border-radius: 100px;
}

/* ─── TABLE ─── */
.table-wrap { overflow-x: auto; }

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table thead th {
  padding: 14px 22px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(242,227,188,0.30);
  text-align: left;
  border-bottom: 1px solid rgba(200,169,110,0.06);
  white-space: nowrap;
}

.admin-table tbody td {
  padding: 14px 22px;
  font-size: 0.875rem;
  color: rgba(242,227,188,0.65);
  border-bottom: 1px solid rgba(200,169,110,0.04);
  white-space: nowrap;
}

.table-row { transition: background 0.15s; }

.table-row:hover { background: rgba(107,146,146,0.05); }
.table-row:hover td { color: #F2E3BC; }

.cell-date {
  display: flex;
  align-items: center;
  font-variant-numeric: tabular-nums;
}

.cell-client {
  display: flex;
  align-items: center;
  gap: 10px;
}

.client-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(107,146,146,0.15);
  border: 1px solid rgba(107,146,146,0.25);
  color: #6B9292;
  font-size: 0.72rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cell-service { color: rgba(242,227,188,0.80) !important; }

.empty-row {
  text-align: center;
  padding: 48px 20px !important;
  color: rgba(242,227,188,0.25) !important;
  font-size: 0.85rem !important;
}

.estado-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 11px;
  border-radius: 100px;
  border: 1px solid;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 0.03em;
}

/* ─── SERVICES LIST ─── */
.services-list { padding: 8px 0; }

.service-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 26px;
  border-bottom: 1px solid rgba(200,169,110,0.05);
  transition: background 0.15s;
}

.service-row:hover { background: rgba(107,146,146,0.04); }

.service-rank {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  border: 1px solid;
  font-size: 0.8rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.service-info {
  flex: 1;
  min-width: 0;
}

.service-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(242,227,188,0.80);
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.service-bar-track {
  height: 4px;
  background: rgba(200,169,110,0.07);
  border-radius: 4px;
  overflow: hidden;
}

.service-bar-fill {
  height: 100%;
  border-radius: 4px;
  opacity: 0.65;
  transition: width 0.6s cubic-bezier(0.34,1.56,0.64,1);
}

.service-count {
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  flex-shrink: 0;
}

.empty-services {
  padding: 48px 20px;
  text-align: center;
  color: rgba(242,227,188,0.25);
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
