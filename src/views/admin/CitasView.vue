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
