import {useQuery} from "@tanstack/react-query";
import {type HeroOptions, searchHeroesAction} from "@/heroes/actions/search-heroes.action";

export const useSearchHeroes = ({name, strength}: HeroOptions) => {
    return useQuery({
        queryKey: ['heroes-search', {name, strength}],
        queryFn: () => searchHeroesAction({name, strength}),
        staleTime: 1000 * 60 * 5,
    });
};
