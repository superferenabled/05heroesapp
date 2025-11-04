import {useQuery} from "@tanstack/react-query";
import {getHeroAction} from "@/heroes/actions/get-hero.action.ts";


export const useHeroDetail = (id: string) => {
    return useQuery({
        queryKey: ['hero-detail', {id}],
        queryFn: () => getHeroAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
};
