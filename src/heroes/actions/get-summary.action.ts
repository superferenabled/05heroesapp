import {heroApi} from "@/heroes/api/hero.api.ts";
import type SummaryInformationResponse from "@/heroes/types/summary-information.response.ts";

export const getSummaryAction = async () => {
    const {data} = await heroApi.get<SummaryInformationResponse>('/summary');

    return data
}