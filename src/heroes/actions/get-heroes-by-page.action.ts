import { heroApi } from "@/heroes/api/hero.api.ts";

export const getHeroesByPageAction = async () => {
    const {data} = await heroApi.get(`/`);
    console.log({data});
    return data;
}