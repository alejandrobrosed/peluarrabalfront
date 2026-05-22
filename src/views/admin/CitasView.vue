<script setup lang="ts">
import { useCitasStore } from '@/stores/citas';
import { useUiStore } from '@/stores/ui';
import { CLIENT_RENEG_WINDOW } from 'tls';
import { onMounted, ref } from 'vue';


const store = useCitasStore();
const ui = useUiStore()

const dialog = ref(false);
const editando = ref(false);

const nuevoCita = ref({
  id_Cliente: "",
  id_Servicio: "",
  id_Empleado: "",
  fecha: "",
  hora_Inicio: "",
  observaciones: "",
});

const headers = [
  { title: "Fecha", key: "fecha" },
  { title: "Hora", key: "hora_Inicio" },
  { title: "Cliente", key: "cliente.nombre" },
  { title: "Servicio", key: "servicio.nombre" },
  { title: "Empleado", key: "empleado.especialidad" },
  { title: "Estado", key: "estado" },
  { title: "Acciones", key: "acciones", sortable: false },
];


const citaEditar = ref<any>(null);

onMounted(() => {
  store.fetchCitas();
});

async function guardarCita(){
  try{
    await store.createCita(nuevoCita.value);
    ui.notify("Cita creada correctamente", "success");
    dialog.value = false;

    nuevoCita.value = {
        id_Cliente: "",
        id_Servicio: "",
        id_Empleado: "",
        fecha: "",
        hora_Inicio: "",
        observaciones: "",
    };
  }catch {
    ui.notify("Error al crear el cita", "error");
  }
}
function abrirEditar(cita: any){
  citaEditar.value = {
    id_Reserva: cita.id_Reserva,
    id_Cliente: cita.cliente?.id_Usuario,
    id_Servicio: cita.servicio?.id_Servicio,
    id_Empleado: cita.empleado?.id_Empleado,
    fecha: cita.fecha,
    estado: cita.estado,
    hora_Inicio: cita.hora_Inicio,
    observaciones: cita.observaciones
  };

  editando.value = true;
}

async function guardarEdicion(){
  const id = citaEditar.value.id_Reserva;

  const payload = {
    id_Cliente: citaEditar.value.id_Cliente,
    id_Servicio: citaEditar.value.id_Servicio,
    id_Empleado: citaEditar.value.id_Empleado,
    fecha: citaEditar.value.fecha,
    estado: citaEditar.value.estado,
    hora_Inicio: citaEditar.value.hora_Inicio,
    observaciones: citaEditar.value.observaciones,
  };

  await store.updateCita(id, payload);
  ui.notify("Cita actualizado", "success");
  editando.value = false;
}

async function cancelar(id:number){
  await store.cancelarCita(id);
  ui.notify("Cita cancelada", "success");
}
</script>

<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4 mt-10">
      <h1 class="text-h4 font-weight-bold">Citas</h1>

      <v-btn color="primary" @click="dialog = true">
        Nueva Cita
      </v-btn>
    </div>
    
    <v-data-table
  :items="store.lista"
  :loading="store.loading"
  item-key="id_Reserva"
  class="elevation-1"
>
  <template #headers>
    <tr>
      <th>Fecha</th>
      <th>Hora</th>
      <th>Cliente</th>
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
      <td>{{ item.cliente?.nombre }}</td>
      <td>{{ item.servicio?.nombre }}</td>
      <td>{{ item.empleado?.especialidad }}</td>
      <td>{{ item.estado }}</td>
      <td class="d-flex gap-2">
        <v-btn size="small" color="warning" @click="abrirEditar(item)">
          Editar
        </v-btn>
        <v-btn size="small" color="error" @click="cancelar(item.id_Reserva)">
          Cancelar
        </v-btn>
      </td>
    </tr>
  </template>
</v-data-table>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h6">Nueva cita</v-card-title>
        <v-card-text>
          <v-text-field v-model="nuevoCita.id_Cliente" label="id_Cliente"/>
          <v-text-field v-model="nuevoCita.id_Servicio" label="id_Servicio"/>
          <v-text-field v-model="nuevoCita.id_Empleado" label="id_Empleado"/>
          <v-text-field v-model="nuevoCita.fecha" label="fecha" type="date"/>
          <v-text-field v-model="nuevoCita.hora_Inicio" label="hora_Inicio" type="time"/>
          <v-text-field v-model="nuevoCita.observaciones" label="observaciones"/>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="guardarCita">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editando" width="500">
      <v-card>
        <v-card-title class="text-h6">Editar cita</v-card-title>
        <v-card-text>
          <v-text-field v-model="citaEditar.id_Cliente" label="id_Cliente"/>
          <v-text-field v-model="citaEditar.id_Servicio" label="id_Servicio"/>
          <v-text-field v-model="citaEditar.id_Empleado" label="id_Empleado"/>
          <v-text-field v-model="citaEditar.fecha" label="fecha" type="date"/>
          <v-select v-model="citaEditar.estado" label="estado" :items="['pendiente', 'confirmada', 'cancelada', 'completada']" />
          <v-text-field v-model="citaEditar.hora_Inicio" label="hora_Inicio" type="time"/>
          <v-text-field v-model="citaEditar.observaciones" label="observaciones"/>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="editando = false">Cancelar</v-btn>
          <v-btn color="primary" @click="guardarEdicion">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script setup lang="ts">
import { useCitasStore } from "@/stores/citas";
import { useUiStore } from "@/stores/ui";
import { onMounted, ref } from "vue";

const store = useCitasStore();
const ui = useUiStore();

const dialog = ref(false);
const editando = ref(false);

const nuevoCita = ref({
  id_Cliente: "",
  id_Servicio: "",
  id_Empleado: "",
  fecha: "",
  hora_Inicio: "",
  observaciones: "",
});

const citaEditar = ref<any>(null);

onMounted(() => {
  store.fetchCitas();
});

async function guardarCita() {
  try {
    await store.createCita(nuevoCita.value);
    ui.notify("Cita creada correctamente", "success");
    dialog.value = false;
    nuevoCita.value = { id_Cliente: "", id_Servicio: "", id_Empleado: "", fecha: "", hora_Inicio: "", observaciones: "" };
  } catch {
    ui.notify("Error al crear la cita", "error");
  }
}

function abrirEditar(cita: any) {
  citaEditar.value = {
    id_Reserva: cita.id_Reserva,
    id_Cliente: cita.cliente?.id_Usuario,
    id_Servicio: cita.servicio?.id_Servicio,
    id_Empleado: cita.empleado?.id_Empleado,
    fecha: cita.fecha,
    estado: cita.estado,
    hora_Inicio: cita.hora_Inicio,
    observaciones: cita.observaciones,
  };
  editando.value = true;
}

async function guardarEdicion() {
  const id = citaEditar.value.id_Reserva;
  const payload = {
    id_Cliente: citaEditar.value.id_Cliente,
    id_Servicio: citaEditar.value.id_Servicio,
    id_Empleado: citaEditar.value.id_Empleado,
    fecha: citaEditar.value.fecha,
    estado: citaEditar.value.estado,
    hora_Inicio: citaEditar.value.hora_Inicio,
    observaciones: citaEditar.value.observaciones,
  };
  await store.updateCita(id, payload);
  ui.notify("Cita actualizada", "success");
  editando.value = false;
}

async function cancelar(id: number) {
  await store.cancelarCita(id);
  ui.notify("Cita cancelada", "success");
}

function estadoColor(estado: string) {
  if (estado === "pendiente") return "warning";
  if (estado === "cancelada") return "error";
  if (estado === "confirmada") return "primary";
  return "success";
}
</script>

<template>
  <div class="admin-page">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Gestión de Citas</h1>
        <p class="page-sub">Visualiza, edita y gestiona todas las reservas</p>
      </div>
      <v-btn
        color="primary"
        rounded="lg"
        elevation="0"
        prepend-icon="mdi-plus"
        @click="dialog = true"
      >
        Nueva Cita
      </v-btn>
    </div>

    <!-- Table -->
    <div class="table-card">
      <v-data-table
        :items="store.lista"
        :loading="store.loading"
        item-key="id_Reserva"
        class="admin-data-table"
      >
        <template #headers>
          <tr>
            <th class="th">Fecha</th>
            <th class="th">Hora</th>
            <th class="th">Cliente</th>
            <th class="th">Servicio</th>
            <th class="th">Empleado</th>
            <th class="th">Estado</th>
            <th class="th">Acciones</th>
          </tr>
        </template>

        <template #item="{ item }">
          <tr class="data-row">
            <td class="td">{{ item.fecha }}</td>
            <td class="td">{{ item.hora_Inicio }}</td>
            <td class="td">{{ item.cliente?.nombre }}</td>
            <td class="td">{{ item.servicio?.nombre }}</td>
            <td class="td">{{ item.empleado?.especialidad }}</td>
            <td class="td">
              <v-chip
                :color="estadoColor(item.estado)"
                size="small"
                variant="tonal"
              >
                {{ item.estado }}
              </v-chip>
            </td>
            <td class="td">
              <div class="action-btns">
                <v-btn
                  size="small"
                  variant="tonal"
                  color="warning"
                  rounded="lg"
                  icon="mdi-pencil"
                  @click="abrirEditar(item)"
                />
                <v-btn
                  size="small"
                  variant="tonal"
                  color="error"
                  rounded="lg"
                  icon="mdi-cancel"
                  @click="cancelar(item.id_Reserva)"
                />
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>

    <!-- Dialog: Nueva cita -->
    <v-dialog v-model="dialog" width="480">
      <v-card class="admin-dialog" rounded="xl" elevation="0">
        <div class="dialog-header">
          <h3 class="dialog-title">Nueva cita</h3>
          <v-btn icon variant="text" size="small" @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-divider class="opacity-10" />
        <div class="dialog-body">
          <label class="field-label">ID Cliente</label>
          <v-text-field v-model="nuevoCita.id_Cliente" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">ID Servicio</label>
          <v-text-field v-model="nuevoCita.id_Servicio" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">ID Empleado</label>
          <v-text-field v-model="nuevoCita.id_Empleado" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">Fecha</label>
          <v-text-field v-model="nuevoCita.fecha" type="date" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">Hora</label>
          <v-text-field v-model="nuevoCita.hora_Inicio" type="time" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">Observaciones</label>
          <v-text-field v-model="nuevoCita.observaciones" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" />
        </div>
        <div class="dialog-actions">
          <v-btn variant="text" rounded="lg" @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" rounded="lg" elevation="0" @click="guardarCita">Guardar</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- Dialog: Editar cita -->
    <v-dialog v-model="editando" width="480">
      <v-card v-if="citaEditar" class="admin-dialog" rounded="xl" elevation="0">
        <div class="dialog-header">
          <h3 class="dialog-title">Editar cita</h3>
          <v-btn icon variant="text" size="small" @click="editando = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-divider class="opacity-10" />
        <div class="dialog-body">
          <label class="field-label">ID Cliente</label>
          <v-text-field v-model="citaEditar.id_Cliente" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">ID Servicio</label>
          <v-text-field v-model="citaEditar.id_Servicio" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">ID Empleado</label>
          <v-text-field v-model="citaEditar.id_Empleado" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">Fecha</label>
          <v-text-field v-model="citaEditar.fecha" type="date" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">Estado</label>
          <v-select v-model="citaEditar.estado" :items="['pendiente', 'confirmada', 'cancelada', 'completada']" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">Hora</label>
          <v-text-field v-model="citaEditar.hora_Inicio" type="time" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">Observaciones</label>
          <v-text-field v-model="citaEditar.observaciones" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" />
        </div>
        <div class="dialog-actions">
          <v-btn variant="text" rounded="lg" @click="editando = false">Cancelar</v-btn>
          <v-btn color="primary" rounded="lg" elevation="0" @click="guardarEdicion">Guardar</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.admin-page {
  padding: 28px;
  max-width: 1100px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.page-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #F2E3BC;
  margin-bottom: 4px;
}

.page-sub {
  font-size: 0.83rem;
  color: rgba(242, 227, 188, 0.45);
}

.table-card {
  background: #232818;
  border: 1px solid rgba(200, 169, 110, 0.08);
  border-radius: 16px;
  overflow: hidden;
}

.admin-data-table {
  background: transparent !important;
}

.th {
  font-size: 0.72rem !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
  color: rgba(242, 227, 188, 0.35) !important;
  padding: 14px 20px !important;
  border-bottom: 1px solid rgba(200, 169, 110, 0.06) !important;
}

.data-row {
  transition: background 0.15s;
}

.data-row:hover {
  background: rgba(107, 146, 146, 0.05) !important;
}

.td {
  font-size: 0.86rem !important;
  color: rgba(242, 227, 188, 0.65) !important;
  padding: 12px 20px !important;
  border-bottom: 1px solid rgba(200, 169, 110, 0.04) !important;
}

.action-btns {
  display: flex;
  gap: 6px;
}

/* ─── DIALOG ─── */
.admin-dialog {
  background: #232818 !important;
  border: 1px solid rgba(200, 169, 110, 0.10) !important;
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
}

.dialog-title {
  font-size: 1rem;
  font-weight: 700;
  color: #F2E3BC;
}

.dialog-body {
  padding: 20px 24px;
}

.field-label {
  display: block;
  font-size: 0.78rem;
  font-weight: 500;
  color: rgba(242, 227, 188, 0.5);
  margin-bottom: 6px;
  letter-spacing: 0.02em;
}

.dialog-actions {
  padding: 16px 24px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
