import { usuariosService } from "@/services/usuarios";
import { defineStore } from "pinia";

export const useClientesStore = defineStore("clientes", {
    state: () => ({
        lista: [] as any[],
        loading: false,
    }),
    actions: {
        async fetchClientes() {
            this.loading = true;
            try{
                this.lista = await usuariosService.getClientes();
            }finally{
                this.loading = false;
            }
        },
        async createCliente(data: any){
            const nuevo = await usuariosService.createCliente(data);
            this.lista.push(nuevo);
        },
        async updateCliente(id:number, data: any){
            await usuariosService.updateCliente(id, data);
            await this.fetchClientes();
        },
        async desactivarCliente(id: number){
            await usuariosService.desactivarCliente(id);
            this.lista = this.lista.filter(c => c.id_Usuario !== id);
        }
    }, 
});