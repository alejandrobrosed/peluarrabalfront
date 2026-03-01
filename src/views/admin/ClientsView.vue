<script setup lang="ts">
import { useClientesStore } from '@/stores/clientes';
import { useUiStore } from '@/stores/ui';
import { CLIENT_RENEG_WINDOW } from 'tls';
import { onMounted, ref } from 'vue';


const store = useClientesStore();
const ui = useUiStore()

const dialog = ref(false);
const nuevoCliente = ref({
  nombre: "",
  apellidos: "",
  email: "",
  telefono: "",
  password: "",
});

const editando = ref(false);
const clienteEditar = ref<any>(null);



onMounted(() => {
  store.fetchClientes();
});

async function guardarCliente(){
  try{
    await store.createCliente(nuevoCliente.value);
    ui.notify("Cliente creado correctamente", "success");
    dialog.value = false;

    nuevoCliente.value = {
      nombre: "",
      apellidos: "",
      email: "",
      telefono: "",
      password: "",
    };
  }catch {
    ui.notify("Error al crear el cliente", "error");
  }
}
function abrirEditar(cliente: any){
  clienteEditar.value = { ...cliente };
  editando.value = true;
}

async function guardarEdicion(){
  const id = clienteEditar.value.id_Usuario;

  const payload = {
    nombre: clienteEditar.value.nombre,
    apellidos: clienteEditar.value.apellidos,
    email: clienteEditar.value.email,
    telefono: clienteEditar.value.telefono,
    password: clienteEditar.value.password,
  };

  await store.updateCliente(id, payload);
  ui.notify("Cliente actualizado", "success");
  editando.value = false;
}

async function eliminar(id:number){
  await store.desactivarCliente(id);
  ui.notify("Cliente desactivado", "success");
}
</script>

<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4 mt-10">
      <h1 class="text-h4 font-weight-bold">Clientes</h1>

      <v-btn color="primary" @click="dialog = true">
        Nuevo Cliente
      </v-btn>
    </div>
    
    <v-data-table
      :items="store.lista"
      :loading="store.loading"
      item-key="id_Usuario"
      class="elevation-1">

      <template #headers>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
        </tr>
      </template>
      <template #item="{ item }">
        <tr>
          <td>{{ item.nombre  }} {{ item.apellidos }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.telefono }}</td>
          <td class="d-flex gap-2">
            <v-btn size="small" color="warning" @click="abrirEditar(item)">Editar</v-btn>
            <v-btn size="small" color="error" @click="eliminar(item.id_Usuario)">Eliminar</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h6">Nuevo cliente</v-card-title>
        <v-card-text>
          <v-text-field v-model="nuevoCliente.nombre" label="Nombre"/>
          <v-text-field v-model="nuevoCliente.apellidos" label="Apellidos"/>
          <v-text-field v-model="nuevoCliente.email" label="Email"/>
          <v-text-field v-model="nuevoCliente.telefono" label="Telefono"/>
          <v-text-field v-model="nuevoCliente.password" label="Contraseña" type="password"/>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="guardarCliente">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editando" width="500">
      <v-card>
        <v-card-title class="text-h6">Editar cliente</v-card-title>
        <v-card-text>
          <v-text-field v-model="clienteEditar.nombre" label="Nombre"/>
          <v-text-field v-model="clienteEditar.apellidos" label="Apellidos"/>
          <v-text-field v-model="clienteEditar.email" label="Email"/>
          <v-text-field v-model="clienteEditar.telefono" label="Telefono"/>
          <v-text-field v-model="clienteEditar.password" label="Contraseña" type="password"/>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="editando = false">Cancelar</v-btn>
          <v-btn color="primary" @click="guardarEdicion">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
