<script setup lang="ts">
import { ref } from "vue";

const nombre = ref("");
const email = ref("");
const cv = ref<File | null>(null);

const benefits = [
  "Equipo joven, dinámico y apasionado por el oficio",
  "Formación continua y acceso a nuevas tendencias",
  "Horarios flexibles y buen ambiente de trabajo",
  "Comisiones por desempeño y clientes fijos",
];

function handleFile(e: any) {
  cv.value = e.target.files[0];
}
</script>

<template>
  <div>
    <!-- ─── PAGE HEADER ─── -->
    <div class="page-hero">
      <div class="section-label">Únete al equipo</div>
      <h1 class="page-title">Trabaja con Nosotros</h1>
      <p class="page-subtitle">¿Apasionado/a por la peluquería? Te estamos buscando</p>
    </div>

    <v-container class="section-container py-14">
      <v-row>
        <!-- Left: benefits -->
        <v-col cols="12" md="5" class="mb-8 mb-md-0">
          <div class="section-label mb-3">Por qué elegirnos</div>
          <h2 class="empleo-title mb-6">Un lugar donde crecer profesionalmente</h2>
          <p class="empleo-text mb-8">
            En La Pelu del Arrabal valoramos el talento y el compromiso. Buscamos personas con ganas de aprender, crecer y ofrecer el mejor servicio a nuestros clientes.
          </p>

          <div class="benefits-list">
            <div v-for="b in benefits" :key="b" class="benefit-item">
              <div class="benefit-icon">
                <v-icon size="16" color="primary">mdi-check</v-icon>
              </div>
              <span>{{ b }}</span>
            </div>
          </div>

          <div class="contact-note mt-10">
            <v-icon size="18" color="primary" class="mr-2">mdi-phone</v-icon>
            <span>¿Prefieres llamarnos? <strong>+34 976 000 000</strong></span>
          </div>
        </v-col>

        <!-- Right: form -->
        <v-col cols="12" md="7">
          <div class="form-card">
            <h3 class="form-title mb-6">Envía tu candidatura</h3>

            <v-form>
              <label class="field-label">Nombre completo</label>
              <v-text-field
                v-model="nombre"
                placeholder="Tu nombre y apellidos"
                variant="outlined"
                rounded="lg"
                density="comfortable"
                prepend-inner-icon="mdi-account-outline"
                class="mb-4"
                hide-details="auto"
                color="primary"
              />

              <label class="field-label">Correo electrónico</label>
              <v-text-field
                v-model="email"
                placeholder="tu@email.com"
                type="email"
                variant="outlined"
                rounded="lg"
                density="comfortable"
                prepend-inner-icon="mdi-email-outline"
                class="mb-4"
                hide-details="auto"
                color="primary"
              />

              <label class="field-label">Currículum (PDF / Word)</label>
              <v-file-input
                accept=".pdf,.doc,.docx"
                variant="outlined"
                rounded="lg"
                density="comfortable"
                prepend-icon=""
                prepend-inner-icon="mdi-paperclip"
                class="mb-6"
                hide-details="auto"
                color="primary"
                @change="handleFile"
              />

              <v-btn
                color="primary"
                block
                size="large"
                rounded="lg"
                elevation="0"
                class="submit-btn"
              >
                <v-icon start>mdi-send</v-icon>
                Enviar solicitud
              </v-btn>

              <p class="form-note mt-4">
                Revisamos todas las candidaturas y te contactamos en 48h
              </p>
            </v-form>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
/* ─── PAGE HEADER ─── */
.page-hero {
  background: var(--c-bg-card);
  border-bottom: 1px solid var(--c-border);
  padding: 72px 24px;
  text-align: center;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-gold);
  margin-bottom: 14px;
}

.page-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--c-text);
  margin-bottom: 14px;
}

.page-subtitle {
  font-size: 1.05rem;
  color: var(--c-text-soft);
}

/* ─── SECTION ─── */
.section-container {
  max-width: 1000px;
  margin: 0 auto;
}

/* ─── LEFT COLUMN ─── */
.empleo-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--c-text);
  line-height: 1.3;
}

.empleo-text {
  font-size: 0.92rem;
  color: var(--c-text-soft);
  line-height: 1.75;
}

.benefits-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 0.9rem;
  color: var(--c-text-soft);
  line-height: 1.5;
}

.benefit-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(107, 146, 146, 0.1);
  border: 1px solid rgba(107, 146, 146, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.contact-note {
  display: flex;
  align-items: center;
  font-size: 0.88rem;
  color: var(--c-text-soft);
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: 12px;
  padding: 14px 18px;
}

.contact-note strong {
  color: var(--c-teal);
}

/* ─── FORM CARD ─── */
.form-card {
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: 20px;
  padding: 40px 36px;
}

.form-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--c-text);
}

.field-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--c-text-soft);
  margin-bottom: 6px;
  letter-spacing: 0.02em;
}

.submit-btn {
  font-weight: 500;
  letter-spacing: 0.03em;
}

.form-note {
  text-align: center;
  font-size: 0.8rem;
  color: var(--c-text-muted);
}

@media (max-width: 600px) {
  .form-card {
    padding: 28px 20px;
  }
}
</style>
