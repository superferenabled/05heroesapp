import {useQuery} from "@tanstack/react-query";
import {getHeroesByPageAction} from "@/heroes/actions/get-heroes-by-page.action.ts";

export const usePaginatedHero = (page: number, limit: number) => {
    return useQuery({
        queryKey: ['heroes', {page, limit}],
        queryFn: () => getHeroesByPageAction(page, limit),
        staleTime: 1000 * 60 * 5
    });;
};
