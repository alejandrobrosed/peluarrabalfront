import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import PublicLayout from "@/layouts/PublicLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import PreciosView from "@/views/public/PreciosView.vue";
import SobreNosotrosView from "@/views/public/SobreNosotrosView.vue";
import EmpleoView from "@/views/public/EmpleoView.vue";

import HomeView from "@/views/public/HomeView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import AdminDashboardView from "@/views/admin/AdminDashboardView.vue";
import ClientsView from "@/views/admin/ClientsView.vue";
import AppointmentsView from "@/views/admin/AppointmentsView.vue";
import CitasView from "@/views/admin/CitasView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: PublicLayout,
    children: [
      { path: "", component: HomeView },
      { path: "precios", component: PreciosView },
      { path: "sobre-nosotros", component: SobreNosotrosView },
      { path: "empleo", component: EmpleoView },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [{ path: "login", name: "login", component: LoginView }],
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "", name: "admin", component: AdminDashboardView },
      { path: "clients", name: "clients", component: ClientsView },
      { path: "appointments", name: "appointments", component: CitasView },
    ],
  },
  {
  path: "/reservar",
  component: () => import("@/views/user/ReservarView.vue"),
  meta: { requiresAuth: true }
},
{
  path: "/mis-citas",
  component: () => import("@/views/user/MisCitasView.vue"),
  meta: { requiresAuth: true }
}
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  // PROTEGER ADMIN POR ROL
  if (to.path.startsWith("/admin")) {
    if (!auth.isLogged) {
      return next("/auth/login");
    }

    if (auth.user.rol !== "admin") {
      return next("/"); 
    }
  }

  // PROTEGER RUTAS CON meta.requiresAuth
  if (to.meta.requiresAuth && !auth.isLogged) {
    return next("/auth/login");
  }

  next();
});

export default router;