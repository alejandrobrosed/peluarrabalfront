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
  email: yup.string().email("Email invalido").required("Email obligatorio"),
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
  ui.notify("Login correcto", "success");

  if (auth.user.rol === "admin") {
    router.push("/admin");
  } 
  else if (auth.user.rol === "cliente") {
    router.push("/mis-citas");
  } 
  else if (auth.user.rol === "empleado") {
    router.push("/mis-citas");
  }
}
});
</script>

<template>
  <v-card width="420" class="pa-6">
    <h1 class="text-h5 font-weight-bold mb-4">Iniciar sesión</h1>
    <v-form @submit.prevent="onSubmit">
      <v-text-field v-model="email" label="Email" type="email" :error-messages="errors.email" />
      <v-text-field v-model="password" label="Password" type="password" :error-messages="errors.password" />
      <v-btn color="primary" block class="mt-2" type="submit">Entrar</v-btn>
    </v-form>
  </v-card>
</template>
