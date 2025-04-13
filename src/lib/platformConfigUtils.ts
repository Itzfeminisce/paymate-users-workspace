import { useAxios } from "@/hooks/use-axios";

export class PlaformUtil{
    private axios: ReturnType<typeof useAxios>;

    constructor(private obj: any){
        this.axios =  useAxios()
    }

   async getConfig<T extends unknown>(name: string, _defaultValue: any =''): Promise<T>{
        if(!this.obj?.[name]){
            // request from server
            const response = await this.axios.Get(`/plaform/config?select=${name}`)

            const config = response.data;

            return config;
        }

        return this.obj[name];
    }
}