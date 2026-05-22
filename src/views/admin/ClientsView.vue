<script setup lang="ts">
import { useClientesStore } from "@/stores/clientes";
import { useUiStore } from "@/stores/ui";
import { onMounted, ref } from "vue";

const store = useClientesStore();
const ui = useUiStore();

const dialog = ref(false);
const editando = ref(false);
const clienteEditar = ref<any>(null);

const nuevoCliente = ref({
  nombre: "",
  apellidos: "",
  email: "",
  telefono: "",
  password: "",
});

onMounted(() => {
  store.fetchClientes();
});

async function guardarCliente() {
  try {
    await store.createCliente(nuevoCliente.value);
    ui.notify("Cliente creado correctamente", "success");
    dialog.value = false;
    nuevoCliente.value = { nombre: "", apellidos: "", email: "", telefono: "", password: "" };
  } catch {
    ui.notify("Error al crear el cliente", "error");
  }
}

function abrirEditar(cliente: any) {
  clienteEditar.value = { ...cliente };
  editando.value = true;
}

async function guardarEdicion() {
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

async function eliminar(id: number) {
  await store.desactivarCliente(id);
  ui.notify("Cliente desactivado", "success");
}
</script>

<template>
  <div class="admin-page">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Gestión de Clientes</h1>
        <p class="page-sub">Administra los clientes registrados en el sistema</p>
      </div>
      <v-btn
        color="primary"
        rounded="lg"
        elevation="0"
        prepend-icon="mdi-plus"
        @click="dialog = true"
      >
        Nuevo Cliente
      </v-btn>
    </div>

    <!-- Table -->
    <div class="table-card">
      <v-data-table
        :items="store.lista"
        :loading="store.loading"
        item-key="id_Usuario"
        class="admin-data-table"
      >
        <template #headers>
          <tr>
            <th class="th">Nombre</th>
            <th class="th">Email</th>
            <th class="th">Teléfono</th>
            <th class="th">Acciones</th>
          </tr>
        </template>

        <template #item="{ item }">
          <tr class="data-row">
            <td class="td">
              <div class="client-name">
                <div class="client-avatar">{{ item.nombre?.[0] }}{{ item.apellidos?.[0] }}</div>
                <span>{{ item.nombre }} {{ item.apellidos }}</span>
              </div>
            </td>
            <td class="td">{{ item.email }}</td>
            <td class="td">{{ item.telefono }}</td>
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
                  icon="mdi-delete"
                  @click="eliminar(item.id_Usuario)"
                />
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>

    <!-- Dialog: Nuevo cliente -->
    <v-dialog v-model="dialog" width="460">
      <v-card class="admin-dialog" rounded="xl" elevation="0">
        <div class="dialog-header">
          <h3 class="dialog-title">Nuevo cliente</h3>
          <v-btn icon variant="text" size="small" @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-divider class="opacity-10" />
        <div class="dialog-body">
          <label class="field-label">Nombre</label>
          <v-text-field v-model="nuevoCliente.nombre" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">Apellidos</label>
          <v-text-field v-model="nuevoCliente.apellidos" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">Email</label>
          <v-text-field v-model="nuevoCliente.email" type="email" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">Teléfono</label>
          <v-text-field v-model="nuevoCliente.telefono" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">Contraseña</label>
          <v-text-field v-model="nuevoCliente.password" type="password" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" />
        </div>
        <div class="dialog-actions">
          <v-btn variant="text" rounded="lg" @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" rounded="lg" elevation="0" @click="guardarCliente">Guardar</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- Dialog: Editar cliente -->
    <v-dialog v-model="editando" width="460">
      <v-card v-if="clienteEditar" class="admin-dialog" rounded="xl" elevation="0">
        <div class="dialog-header">
          <h3 class="dialog-title">Editar cliente</h3>
          <v-btn icon variant="text" size="small" @click="editando = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-divider class="opacity-10" />
        <div class="dialog-body">
          <label class="field-label">Nombre</label>
          <v-text-field v-model="clienteEditar.nombre" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">Apellidos</label>
          <v-text-field v-model="clienteEditar.apellidos" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">Email</label>
          <v-text-field v-model="clienteEditar.email" type="email" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">Teléfono</label>
          <v-text-field v-model="clienteEditar.telefono" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" class="mb-3" />
          <label class="field-label">Contraseña</label>
          <v-text-field v-model="clienteEditar.password" type="password" variant="outlined" rounded="lg" density="comfortable" hide-details="auto" color="primary" />
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

.client-name {
  display: flex;
  align-items: center;
  gap: 10px;
}

.client-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(107, 146, 146, 0.12);
  border: 1px solid rgba(107, 146, 146, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  color: #6B9292;
  flex-shrink: 0;
  text-transform: uppercase;
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
