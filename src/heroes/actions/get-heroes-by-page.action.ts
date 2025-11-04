import { heroApi } from "@/heroes/api/hero.api.ts";
import type {HeroResponse} from "@/heroes/types/get-heroes.response.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroesByPageAction = async (
    page: number,
    limit: number = 6,
    category: string = 'all'
): Promise<HeroResponse> => {
    if(isNaN(page)) {
        page = 1;
    }
    if(isNaN(limit)) {
        limit = 6;
    }
    const {data} = await heroApi.get<HeroResponse>(`/`,
        {
            params: {
                limit,
                offset: (page - 1) * limit,
                category
            }
        });

    const heroes = data.heroes.map((hero) => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    }));

    return {
        ...data,
        heroes
    };
}