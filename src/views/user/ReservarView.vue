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
const intentado = ref(false);
const intentadoPago = ref(false);

const tarjeta = ref({
  numero: "",
  nombre: "",
  caducidad: "",
  cvv: "",
});

const horas = [
  "09:00:00", "10:00:00", "11:00:00", "12:00:00",
  "16:00:00", "17:00:00", "18:00:00", "19:00:00",
];

onMounted(async () => {
  try {
    const s = await api.get("/servicios");
    const e = await api.get("/empleado");
    servicios.value = s.data.data ?? [];
    empleados.value = Array.isArray(e.data) ? e.data : (e.data.data ?? []);
  } catch {
    servicios.value = [];
    empleados.value = [];
    ui.notify("Error cargando datos", "error");
  }
});

function irAPagar() {
  intentado.value = true;

  const faltantes: string[] = [];
  if (!fecha.value)    faltantes.push("Fecha");
  if (!hora.value)     faltantes.push("Hora");
  if (!servicio.value) faltantes.push("Servicio");
  if (!empleado.value) faltantes.push("Profesional");

  if (faltantes.length > 0) {
    ui.notify(`Faltan campos obligatorios: ${faltantes.join(" · ")}`, "error");
    return;
  }
  dialogPago.value = true;
}

function toYMD(value: any): string {
  if (typeof value === "string") return value.split("T")[0];
  if (value instanceof Date) {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, "0");
    const d = String(value.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  if (value && typeof value === "object" && "year" in value) {
    const y = value.year;
    const m = String(value.month).padStart(2, "0");
    const d = String(value.day).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  throw new Error("Formato de fecha no soportado: " + JSON.stringify(value));
}

async function pagar() {
  intentadoPago.value = true;
  const faltanPago: string[] = [];
  if (!tarjeta.value.numero || tarjeta.value.numero.replace(/\s/g, "").length < 16)
    faltanPago.push("Número de tarjeta");
  if (!tarjeta.value.nombre.trim())
    faltanPago.push("Nombre en la tarjeta");
  if (!tarjeta.value.caducidad.trim())
    faltanPago.push("Caducidad");
  if (!tarjeta.value.cvv || tarjeta.value.cvv.length < 3)
    faltanPago.push("CVV");

  if (faltanPago.length > 0) {
    ui.notify(`Faltan datos: ${faltanPago.join(" · ")}`, "error");
    return;
  }
  cargandoPago.value = true;
  try {
    await api.post("/reservas", {
      id_Cliente: auth.user.id,
      id_Servicio: servicio.value,
      id_Empleado: empleado.value,
      fecha: toYMD(fecha.value),
      hora_Inicio: hora.value,
      observaciones: "",
    });
    dialogPago.value = false;
    intentadoPago.value = false;
    ui.notify("Pago realizado y cita reservada ✔", "success");
    fecha.value = "";
    hora.value = "";
    servicio.value = null;
    empleado.value = null;
  } catch (e: any) {
    ui.notify("Error al crear la reserva", "error");
  }
  cargandoPago.value = false;
}
</script>

<template>
  <div>
    <!-- ─── PAGE HEADER ─── -->
    <div class="page-hero">
      <router-link to="/" class="back-link">
        <v-icon size="16" class="mr-1">mdi-arrow-left</v-icon>
        Volver al inicio
      </router-link>
      <div class="section-label">Reserva</div>
      <h1 class="page-title">Reservar tu cita</h1>
      <p class="page-subtitle">Selecciona fecha, hora, servicio y profesional</p>
    </div>

    <!-- ─── FORM ─── -->
    <v-container class="section-container py-14">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <div class="booking-card">

            <!-- Step 1: Date -->
            <div class="booking-step" :class="{ 'step--error': intentado && !fecha }">
              <div class="step-header">
                <div class="step-number" :class="{ 'step-number--error': intentado && !fecha }">1</div>
                <h3 class="step-title">Selecciona la fecha</h3>
                <span v-if="intentado && !fecha" class="step-error-badge">Requerido</span>
              </div>
              <div class="datepicker-wrap">
                <v-date-picker
                  v-model="fecha"
                  color="primary"
                  elevation="0"
                  class="booking-datepicker"
                />
              </div>
            </div>

            <div class="step-divider" />

            <!-- Step 2: Time -->
            <div class="booking-step" :class="{ 'step--error': intentado && !hora }">
              <div class="step-header">
                <div class="step-number" :class="{ 'step-number--error': intentado && !hora }">2</div>
                <h3 class="step-title">Elige la hora</h3>
                <span v-if="intentado && !hora" class="step-error-badge">Requerido</span>
              </div>
              <v-select
                v-model="hora"
                label="Selecciona un horario"
                :items="horas"
                variant="outlined"
                rounded="lg"
                color="primary"
                prepend-inner-icon="mdi-clock-outline"
                density="comfortable"
                hide-details="auto"
              />
            </div>

            <div class="step-divider" />

            <!-- Step 3: Service -->
            <div class="booking-step" :class="{ 'step--error': intentado && !servicio }">
              <div class="step-header">
                <div class="step-number" :class="{ 'step-number--error': intentado && !servicio }">3</div>
                <h3 class="step-title">Elige el servicio</h3>
                <span v-if="intentado && !servicio" class="step-error-badge">Requerido</span>
              </div>
              <v-select
                v-model="servicio"
                label="Selecciona un servicio"
                :items="servicios"
                item-title="nombre"
                item-value="id_Servicio"
                variant="outlined"
                rounded="lg"
                color="primary"
                prepend-inner-icon="mdi-content-cut"
                density="comfortable"
                hide-details="auto"
              />
            </div>

            <div class="step-divider" />

            <!-- Step 4: Employee -->
            <div class="booking-step" :class="{ 'step--error': intentado && !empleado }">
              <div class="step-header">
                <div class="step-number" :class="{ 'step-number--error': intentado && !empleado }">4</div>
                <h3 class="step-title">Elige el profesional</h3>
                <span v-if="intentado && !empleado" class="step-error-badge">Requerido</span>
              </div>
              <v-select
                v-model="empleado"
                label="Selecciona un profesional"
                :items="empleados"
                item-title="usuario.nombre"
                item-value="id_Empleado"
                variant="outlined"
                rounded="lg"
                color="primary"
                prepend-inner-icon="mdi-account-outline"
                density="comfortable"
                hide-details="auto"
              />
            </div>

            <div class="step-divider" />

            <v-btn
              color="primary"
              block
              size="large"
              rounded="lg"
              elevation="0"
              class="book-btn"
              @click="irAPagar"
            >
              <v-icon start>mdi-credit-card-outline</v-icon>
              Continuar al pago
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- ─── PAYMENT DIALOG ─── -->
    <v-dialog
      v-model="dialogPago"
      width="480"
      :scrim="'rgba(8,10,6,0.90)'"
      persistent
    >
      <v-card
        rounded="xl"
        elevation="24"
        style="
          background-color: #1E2218 !important;
          border: 1px solid rgba(200,169,110,0.18);
        "
      >
        <!-- Header -->
        <div style="padding: 32px 32px 20px; text-align: center;">
          <div style="
            width: 56px; height: 56px; border-radius: 16px;
            background: rgba(107,146,146,0.12); border: 1px solid rgba(107,146,146,0.25);
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 16px;
          ">
            <v-icon size="26" color="primary">mdi-shield-lock</v-icon>
          </div>
          <div style="font-size: 1.25rem; font-weight: 700; color: #F2E3BC; margin-bottom: 6px;">
            Pago seguro
          </div>
          <div style="font-size: 0.84rem; color: #C8BA99;">
            Tus datos están cifrados y protegidos con SSL
          </div>
        </div>

        <v-divider style="border-color: rgba(200,169,110,0.12);" />

        <!-- Body -->
        <div style="padding: 24px 32px;">

          <!-- Número de tarjeta -->
          <div style="font-size: 0.78rem; font-weight: 600; letter-spacing: 0.04em; margin-bottom: 6px; text-transform: uppercase;"
               :style="{ color: intentadoPago && tarjeta.numero.replace(/\s/g,'').length < 16 ? '#C97878' : '#C8BA99' }">
            Número de tarjeta
            <span v-if="intentadoPago && tarjeta.numero.replace(/\s/g,'').length < 16" style="font-size:0.68rem; margin-left:6px; opacity:0.8;">— requerido</span>
          </div>
          <v-text-field
            v-model="tarjeta.numero"
            placeholder="1234 5678 9012 3456"
            variant="outlined"
            rounded="lg"
            density="comfortable"
            prepend-inner-icon="mdi-credit-card-outline"
            class="mb-5"
            hide-details="auto"
            :color="intentadoPago && tarjeta.numero.replace(/\s/g,'').length < 16 ? 'error' : 'primary'"
            :error="intentadoPago && tarjeta.numero.replace(/\s/g,'').length < 16"
            bg-color="#232818"
          />

          <!-- Nombre -->
          <div style="font-size: 0.78rem; font-weight: 600; letter-spacing: 0.04em; margin-bottom: 6px; text-transform: uppercase;"
               :style="{ color: intentadoPago && !tarjeta.nombre.trim() ? '#C97878' : '#C8BA99' }">
            Nombre en la tarjeta
            <span v-if="intentadoPago && !tarjeta.nombre.trim()" style="font-size:0.68rem; margin-left:6px; opacity:0.8;">— requerido</span>
          </div>
          <v-text-field
            v-model="tarjeta.nombre"
            placeholder="Nombre Apellido"
            variant="outlined"
            rounded="lg"
            density="comfortable"
            prepend-inner-icon="mdi-account-outline"
            class="mb-5"
            hide-details="auto"
            :color="intentadoPago && !tarjeta.nombre.trim() ? 'error' : 'primary'"
            :error="intentadoPago && !tarjeta.nombre.trim()"
            bg-color="#232818"
          />

          <v-row>
            <v-col cols="6">
              <div style="font-size: 0.78rem; font-weight: 600; letter-spacing: 0.04em; margin-bottom: 6px; text-transform: uppercase;"
                   :style="{ color: intentadoPago && !tarjeta.caducidad.trim() ? '#C97878' : '#C8BA99' }">
                Caducidad
                <span v-if="intentadoPago && !tarjeta.caducidad.trim()" style="font-size:0.68rem; margin-left:4px; opacity:0.8;">— requerido</span>
              </div>
              <v-text-field
                v-model="tarjeta.caducidad"
                placeholder="MM/AA"
                variant="outlined"
                rounded="lg"
                density="comfortable"
                hide-details="auto"
                :color="intentadoPago && !tarjeta.caducidad.trim() ? 'error' : 'primary'"
                :error="intentadoPago && !tarjeta.caducidad.trim()"
                bg-color="#232818"
              />
            </v-col>
            <v-col cols="6">
              <div style="font-size: 0.78rem; font-weight: 600; letter-spacing: 0.04em; margin-bottom: 6px; text-transform: uppercase;"
                   :style="{ color: intentadoPago && tarjeta.cvv.length < 3 ? '#C97878' : '#C8BA99' }">
                CVV
                <span v-if="intentadoPago && tarjeta.cvv.length < 3" style="font-size:0.68rem; margin-left:4px; opacity:0.8;">— requerido</span>
              </div>
              <v-text-field
                v-model="tarjeta.cvv"
                placeholder="•••"
                type="password"
                variant="outlined"
                rounded="lg"
                density="comfortable"
                hide-details="auto"
                :color="intentadoPago && tarjeta.cvv.length < 3 ? 'error' : 'primary'"
                :error="intentadoPago && tarjeta.cvv.length < 3"
                bg-color="#232818"
              />
            </v-col>
          </v-row>
        </div>

        <v-divider style="border-color: rgba(200,169,110,0.12);" />

        <!-- Actions -->
        <div style="padding: 18px 32px 24px; display: flex; justify-content: flex-end; gap: 10px; align-items: center;">
          <v-btn
            variant="text"
            rounded="lg"
            style="color: rgba(242,227,188,0.5);"
            @click="dialogPago = false; intentadoPago = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            :loading="cargandoPago"
            rounded="lg"
            elevation="0"
            style="font-weight: 600; letter-spacing: 0.03em; padding: 0 24px;"
            @click="pagar"
          >
            <v-icon start size="17">mdi-lock</v-icon>
            Pagar y confirmar
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
/* ─── PAGE HEADER ─── */
.page-hero {
  background: var(--c-bg-card);
  border-bottom: 1px solid var(--c-border);
  padding: 48px 24px 56px;
  text-align: center;
  position: relative;
}

.back-link {
  display: inline-flex;
  align-items: center;
  font-size: 0.82rem;
  color: rgba(242,227,188,0.45);
  text-decoration: none;
  margin-bottom: 20px;
  transition: color 0.2s;
  letter-spacing: 0.02em;
}

.back-link:hover {
  color: var(--c-gold);
}

.section-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-gold);
  margin-bottom: 12px;
}

.page-title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
  color: var(--c-text);
  margin-bottom: 12px;
}

.page-subtitle {
  font-size: 1rem;
  color: var(--c-text-soft);
}

/* ─── SECTION ─── */
.section-container {
  max-width: 900px;
  margin: 0 auto;
}

/* ─── BOOKING CARD ─── */
.booking-card {
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: 20px;
  padding: 36px;
}

.booking-step {
  padding: 8px 0;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(107, 146, 146, 0.12);
  border: 1px solid rgba(107, 146, 146, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--c-teal);
  flex-shrink: 0;
}

.step-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--c-text);
}

.datepicker-wrap {
  display: flex;
  justify-content: center;
}

.booking-datepicker {
  background: transparent !important;
}

.step-divider {
  height: 1px;
  background: var(--c-border);
  margin: 20px 0;
}

/* Error state */
.step--error {
  border-radius: 12px;
  outline: 1px solid rgba(201, 120, 120, 0.35);
  background: rgba(201, 120, 120, 0.04);
  padding: 12px;
  margin: -12px;
  margin-bottom: 0;
}

.step-number--error {
  background: rgba(201, 120, 120, 0.15) !important;
  border-color: rgba(201, 120, 120, 0.4) !important;
  color: #C97878 !important;
}

.step-error-badge {
  margin-left: auto;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #C97878;
  background: rgba(201, 120, 120, 0.12);
  border: 1px solid rgba(201, 120, 120, 0.25);
  padding: 2px 9px;
  border-radius: 100px;
}

.book-btn {
  font-weight: 500;
  letter-spacing: 0.03em;
  margin-top: 8px;
}

</style>
