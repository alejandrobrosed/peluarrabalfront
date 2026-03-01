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

function logout(){
  auth.logout();
  ui.notify("Sesión cerrada", "info")
  router.push("/auth/login")
}

</script>

<template>
  <v-container class="py-12">
    <h1 class="text-h4 mb-6">Las citas de {{ auth.user.nombre }}</h1>
    <div class="d-flex justify-space-between align-center mb-6">

    <v-btn color="primary" to="/reservar">
      Reservar nueva cita
    </v-btn>
    <v-btn color="error" @click="logout">
      Cerrar sesión
    </v-btn>
  </div>
    <v-data-table
      :items="store.lista"
      :loading="store.loading"
      item-key="id_Reserva"
    >
      <template #headers>
        <tr>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Servicio</th>
          <th>Empleado</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </template>

      <template #item="{ item }">
        <tr>
          <td>{{ item.fecha }}</td>
          <td>{{ item.hora_Inicio }}</td>
          <td>{{ item.servicio }}</td>
          <td>{{ item.empleado }}</td>

          <td>
            <v-chip
              :color="
                item.estado === 'pendiente'
                  ? 'warning'
                  : item.estado === 'cancelada'
                  ? 'error'
                  : 'success'
              "
              dark
            >
              {{ item.estado }}
            </v-chip>
          </td>

          <td>
            <v-btn
              v-if="item.estado !== 'cancelada'"
              size="small"
              color="error"
              @click="cancelar(item.id_Reserva)"
            >
              Cancelar
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>