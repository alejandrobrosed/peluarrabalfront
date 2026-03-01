import { defineStore } from "pinia";
import { api } from "@/services/api";

export const useMisCitasStore = defineStore("misCitas", {
  state: () => ({
    lista: [] as any[],
    loading: false
  }),

  actions: {
    async fetchMisCitas(id: number) {
      this.loading = true;
      try {
        const res = await api.get(`/reservas/cliente/${id}`);
        this.lista = res.data;
      } finally {
        this.loading = false;
      }
    },

    async cancelarCita(id: number) {
      await api.delete(`/reservas/${id}/cancelar`);
      await this.fetchMisCitas(this.lista[0]?.id_Cliente);
    }
  }
});