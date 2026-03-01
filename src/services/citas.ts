import { api } from "./api";

export const citasService = {
    async getCitas() {
        const res = await api.get("/Reservas");
        return res.data;
    },
    async createCita(data:any){
        const res = await api.post("/reservas", data);
        return res.data;
    },
    async updateCita(id:number, data:any){
        const res = await api.put(`/reservas/${id}`, data);
    },
    async cancelarCita(id: number){
        const res = await api.delete(`/reservas/${id}/cancelar`);
    },

};