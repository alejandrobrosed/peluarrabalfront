import { defineStore } from "pinia";
import { api } from "@/services/api";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null as any
    }),
    getters: {
        isLogged: (state) => !!state.user
    },
    actions: {
        async login(email: string, password: string){
            try{
                const response = await api.post("/auth/login", {
                    email, 
                    password
                });

                console.log(response.data); 

                this.user = response.data;
                return true;
            }catch(error){
                return false;
            }
            
        },
        logout(){
            this.user = null;
        }
    }
});