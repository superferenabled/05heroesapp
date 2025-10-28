import type {Hero} from "@/heroes/types/hero.interface.ts";

export interface HeroResponse {
    total:  number;
    pages:  number;
    heroes: Hero[];
}
