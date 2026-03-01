import { citasService } from "@/services/citas";
import { defineStore } from "pinia";

export const useCitasStore = defineStore("citas", {
    state: () => ({
        lista: [] as any[],
        loading: false,
    }),
    actions: {
        async fetchCitas() {
            this.loading = true;
            try{
                this.lista = await citasService.getCitas();
            }finally{
                this.loading = false;
            }
        },
        async createCita(data: any){
            const nuevo = await citasService.createCita(data);
            this.lista.push(nuevo);
        },
        async updateCita(id:number, data: any){
            await citasService.updateCita(id, data);
            await this.fetchCitas();
        },
        async cancelarCita(id: number){
            await citasService.cancelarCita(id);
            this.lista = this.lista.filter(c => c.id_Usuario !== id);
        }
    }, 
});