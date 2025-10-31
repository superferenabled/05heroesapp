import {useQuery} from "@tanstack/react-query";
import {getSummaryAction} from "@/heroes/actions/get-summary.action.ts";

export const useHeroSummary = () => {
    return useQuery({
        queryKey: ['summary-information'],
        queryFn: getSummaryAction,
        staleTime: 1000 * 60 * 5,
    });
};
