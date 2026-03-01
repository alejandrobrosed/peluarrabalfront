import { api } from "./api";

export const dashboardService = {
  async getDashboard() {
    const res = await api.get("/reservas/dashboard");
    return res.data;
  },
};