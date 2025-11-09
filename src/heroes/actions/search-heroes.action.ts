import { heroApi } from "@/heroes/api/hero.api.ts";
import type {Hero} from "@/heroes/types/hero.interface.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

export interface HeroOptions {
    name?: string;
    team?: string;
    category?: string;
    universe?: string;
    status?: string;
    strength?: number;
}

export const searchHeroesAction = async (options: HeroOptions = {}) => {

    const { name, team, category, universe, status, strength } = options;
    if (!name && !team && !category && !universe && !status && !strength) {
        return []
    }

    const {data} = await heroApi.get<Hero[]>(`/search`,
        {
            params: {...options}
        });

    return data.map((hero) => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    }));
}