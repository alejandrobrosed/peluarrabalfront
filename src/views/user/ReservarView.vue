<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUiStore } from "@/stores/ui";
import { useAuthStore } from "@/stores/auth";
import { api } from "@/services/api";

const ui = useUiStore();
const auth = useAuthStore();

const fecha = ref("");
const hora = ref("");
const servicio = ref(null);
const empleado = ref(null);

const servicios = ref<any[]>([]);
const empleados = ref<any[]>([]);

const dialogPago = ref(false);
const cargandoPago = ref(false);

const tarjeta = ref({
  numero: "",
  nombre: "",
  caducidad: "",
  cvv: ""
});

onMounted(async () => {
  try {
    const s = await api.get("/servicios");
    const e = await api.get("/empleado");

    servicios.value = s.data.data ?? [];
    empleados.value = Array.isArray(e.data) ? e.data : (e.data.data ?? []) ;

  } catch (error) {
    servicios.value = [];
    empleados.value = [];
    ui.notify("Error cargando datos", "error");
  }
});

function irAPagar() {
  if (!fecha.value || !hora.value || !servicio.value || !empleado.value) {
    ui.notify("Completa todos los campos", "error");
    return;
  }

  dialogPago.value = true;
}

function toYMD(value: any): string {
  // Si ya es string tipo "2026-02-27"
  if (typeof value === "string") return value.split("T")[0];

  // Si es Date
  if (value instanceof Date) {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, "0");
    const d = String(value.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  // Si Vuetify te devuelve algo tipo { year, month, day } (algunas configs)
  if (value && typeof value === "object" && "year" in value && "month" in value && "day" in value) {
    const y = value.year;
    const m = String(value.month).padStart(2, "0");
    const d = String(value.day).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  throw new Error("Formato de fecha no soportado: " + JSON.stringify(value));
}

async function pagar() {
  // Validación simple fake
  if (
    tarjeta.value.numero.length < 16 ||
    tarjeta.value.cvv.length < 3
    
  ) {
    console.log("error de pago")
    ui.notify("Datos de tarjeta inválidos", "error");
    return;
  }
  console.log("funciona pago")
  cargandoPago.value = true;

  // Simulación de pago (espera 1.5s)
  // setTimeout(async () => {
    try {
      console.log("antes de post")
      await api.post("/reservas", {
        id_Cliente: auth.user.id,
        id_Servicio: servicio.value,
        id_Empleado: empleado.value,
        fecha: toYMD(fecha.value),
        hora_Inicio: hora.value,
        observaciones: ""
      });
      console.log("pago")
      dialogPago.value = false;
      ui.notify("Pago realizado y cita reservada ✔", "success");

      // Reset
      fecha.value = "";
      hora.value = "";
      servicio.value = null;
      empleado.value = null;
      console.log("reset")

    } catch (e: any) {
      console.log(e?.code)
      console.log(e?.message)
      console.log("status ", e?.response?.status )
      console.log("data ", e?.response?.data )
      console.log("headers ", e?.response?.headers )
      console.log("error al crear reserva")
      ui.notify("Error al crear la reserva", "error");
    }

    cargandoPago.value = false;
  }

</script>

<template>
  <v-container class="py-12">
    <h1 class="text-h4 mb-6">Reservar cita</h1>

    <v-date-picker v-model="fecha" />

    <v-select
      v-model="hora"
      label="Hora"
      :items="[
        '09:00:00','10:00:00','11:00:00','12:00:00',
        '16:00:00','17:00:00','18:00:00','19:00:00'
      ]"
    />

    <v-select
      v-model="servicio"
      label="Servicio"
      :items="servicios"
      item-title="nombre"
      item-value="id_Servicio"
    />

    <v-select
      v-model="empleado"
      label="Empleado"
      :items="empleados"
      item-title="usuario.nombre"
      item-value="id_Empleado"
    />

    <v-btn color="primary" class="mt-6" @click="irAPagar">
      Ir a pagar
    </v-btn>

    <!-- DIALOGO DE PAGO -->
    <v-dialog v-model="dialogPago" width="500">
      <v-card>
        <v-card-title class="text-h6">
          Pago seguro
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="tarjeta.numero"
            label="Número de tarjeta"
          />
          <v-text-field
            v-model="tarjeta.nombre"
            label="Nombre en la tarjeta"
          />
          <v-text-field
            v-model="tarjeta.caducidad"
            label="MM/AA"
          />
          <v-text-field
            v-model="tarjeta.cvv"
            label="CVV"
            type="password"
          />
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn text @click="dialogPago = false">
            Cancelar
          </v-btn>

          <v-btn
            color="primary"
            :loading="cargandoPago"
            @click="pagar"
          >
            Pagar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>