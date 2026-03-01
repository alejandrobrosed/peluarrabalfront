import { api } from "./api";

export const usuariosService = {
    async getClientes() {
        const res = await api.get("/usuario/clientes");
        return res.data;
    },
    async createCliente(data:any){
        const res = await api.post("/usuario", data);
        return res.data;
    },
    async updateCliente(id:number, data:any){
        const res = await api.put(`/usuario/${id}`, data);
    },
    async desactivarCliente(id: number){
        const res = await api.delete(`/usuario/${id}`);
    },

};