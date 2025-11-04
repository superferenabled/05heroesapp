import {heroApi} from "@/heroes/api/hero.api.ts";
import type {Hero} from "@/heroes/types/hero.interface.ts";
const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroAction = async (id: string) => {
    const {data: hero} = await heroApi.get<Hero>(`/${id}`);

    return {
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    };
};