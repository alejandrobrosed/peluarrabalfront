<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUiStore } from "@/stores/ui";
import { useAuthStore } from "@/stores/auth";
import { useForm } from "vee-validate";
import * as yup from "yup";

const router = useRouter();
const ui = useUiStore();
const auth = useAuthStore();

const schema = yup.object({
  email: yup.string().email("Email inválido").required("Email obligatorio"),
  password: yup.string().required("Contraseña obligatoria"),
});

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: schema,
});

const [email] = defineField("email");
const [password] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
  const ok = await auth.login(values.email, values.password);
  if (ok) {
    ui.notify("Bienvenido/a", "success");
    if (auth.user.rol === "admin") {
      router.push("/admin");
    } else {
      router.push("/mis-citas");
    }
  } else {
    ui.notify("Credenciales incorrectas", "error");
  }
});
</script>

<template>
  <div class="login-card">
    <!-- Logo -->
    <div class="login-logo">
      <v-img
        src="/img/peluarrabal.png"
        max-height="52"
        max-width="160"
        contain
      />
    </div>

    <h1 class="login-title">Bienvenido/a</h1>
    <p class="login-subtitle">Accede a tu cuenta para gestionar tus citas</p>

    <v-form @submit.prevent="onSubmit" class="mt-8">
      <label class="field-label">Correo electrónico</label>
      <v-text-field
        v-model="email"
        placeholder="tu@email.com"
        type="email"
        :error-messages="errors.email"
        variant="outlined"
        rounded="lg"
        density="comfortable"
        prepend-inner-icon="mdi-email-outline"
        class="mb-3"
        hide-details="auto"
        color="primary"
      />

      <label class="field-label">Contraseña</label>
      <v-text-field
        v-model="password"
        placeholder="••••••••"
        type="password"
        :error-messages="errors.password"
        variant="outlined"
        rounded="lg"
        density="comfortable"
        prepend-inner-icon="mdi-lock-outline"
        class="mb-6"
        hide-details="auto"
        color="primary"
      />

      <v-btn
        color="primary"
        block
        type="submit"
        size="large"
        rounded="lg"
        elevation="0"
        class="login-btn"
      >
        <v-icon start>mdi-login</v-icon>
        Entrar
      </v-btn>
    </v-form>

    <div class="login-footer">
      <span>¿Necesitas ayuda?</span>
      <a href="/" class="login-link">Contáctanos</a>
    </div>
  </div>
</template>

<style scoped>
.login-card {
  width: 100%;
  max-width: 420px;
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: 22px;
  padding: 48px 40px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
}

.login-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
}

.login-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--c-text);
  text-align: center;
  margin-bottom: 8px;
}

.login-subtitle {
  font-size: 0.87rem;
  color: var(--c-text-soft);
  text-align: center;
  line-height: 1.5;
}

.field-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--c-text-soft);
  margin-bottom: 6px;
  letter-spacing: 0.02em;
}

.login-btn {
  font-weight: 500;
  letter-spacing: 0.03em;
}

.login-footer {
  margin-top: 24px;
  font-size: 0.83rem;
  color: var(--c-text-muted);
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 6px;
}

.login-link {
  color: var(--c-gold);
  text-decoration: none;
  font-weight: 500;
}

.login-link:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-card {
    padding: 36px 24px;
    border-radius: 18px;
  }
}
</style>
