<script setup lang="ts">
import { onMounted, ref } from "vue";
import { dashboardService } from "@/services/dashboard";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useUiStore } from "@/stores/ui";

const auth = useAuthStore();
const ui = useUiStore();
const router = useRouter();

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

function logout(){
  auth.logout();
  ui.notify("Sesión cerrada", "info")
  router.push("/auth/login")
}

</script>

<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold mb-4 mt-10">Dashboard</h1>
    <v-btn color="error" @click="logout">
      Cerrar sesión
    </v-btn>
    <v-row>
      <v-col cols="12" md="3">
        <v-card class="pa-4" :loading="loading">
          <div class="text-subtitle-2">Citas hoy</div>
          <div class="text-h4 font-weight-bold">{{ dashboard.citasHoy }}</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-4" :loading="loading">
          <div class="text-subtitle-2">Citas esta semana</div>
          <div class="text-h4 font-weight-bold">{{ dashboard.citasSemana }}</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-4" :loading="loading">
          <div class="text-subtitle-2">Clientes activos</div>
          <div class="text-h4 font-weight-bold">{{ dashboard.clientesActivos }}</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-4" :loading="loading">
          <div class="text-subtitle-2">Canceladas (mes)</div>
          <div class="text-h4 font-weight-bold text-error">{{ dashboard.canceladasMes }}</div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="7">
        <v-card class="pa-4" :loading="loading">
          <div class="text-h6 mb-3">Próximas citas</div>

          <v-table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Empleado</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in dashboard.proximasCitas" :key="c.id_Reserva">
                <td>{{ c.fecha }}</td>
                <td>{{ c.hora_Inicio }}</td>
                <td>{{ c.clienteNombre }}</td>
                <td>{{ c.servicioNombre }}</td>
                <td>{{ c.empleadoEspecialidad }}</td>
                <td>{{ c.estado }}</td>
              </tr>

              <tr v-if="!dashboard.proximasCitas?.length && !loading">
                <td colspan="6" class="text-center py-4">No hay citas próximas.</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>

      <v-col cols="12" md="5">
        <v-card class="pa-4" :loading="loading">
          <div class="text-h6 mb-3">Servicios más reservados</div>

          <v-list density="compact">
            <v-list-item
              v-for="s in dashboard.topServicios"
              :key="s.id_Servicio"
              :title="s.nombre"
            >
              <template #append>
                <v-chip>{{ s.total }}</v-chip>
              </template>
            </v-list-item>

            <div v-if="!dashboard.topServicios?.length && !loading" class="text-center py-4">
              No hay datos todavía.
            </div>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>