import {HeroGridCard} from "@/heroes/components/HeroGridCard.tsx";
import type {Hero} from "@/heroes/types/hero.interface.ts";

interface Props {
    heroes: Hero[];
}

export const HeroGrid = ({heroes}: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {
                heroes.map((hero: Hero) => (
                    <HeroGridCard hero={hero} key={hero.id} />
                ))
            }

        </div>
    );
};
