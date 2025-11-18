import {beforeEach, describe, expect, test, vi} from "vitest";
import {getHeroesByPageAction} from "@/heroes/actions/get-heroes-by-page.action.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import type {PropsWithChildren} from "react";
import type {HeroResponse} from "@/heroes/types/get-heroes.response.ts"
import {renderHook, waitFor} from "@testing-library/react";
import {usePaginatedHero} from "@/heroes/hooks/usePaginatedHero.tsx";


vi.mock('@/heroes/actions/get-heroes-by-page.action.ts', () => ({
    getHeroesByPageAction: vi.fn()
}));

const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

const tanStackCustomProvider = () => {

    return ({children}: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe("usePaginatedHeroAction", () => {

    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
    })

    test('Should return the initial state', async() => {
        const {result} = renderHook(() => usePaginatedHero(1, 6), {
            wrapper: tanStackCustomProvider()
        });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toBe(undefined);
        expect(result.current.data).toBeUndefined();
    });

    test('Should return success state with data when API call succeeds', async() => {
        const mockSummaryData =  {
            total: 25,
            pages: 5,
            heroes: [ {
                id: '1',
                name: 'Superman'
            }, {
                id: '2',
                name: 'Batman'
            }]
        } as HeroResponse;

        mockGetHeroesByPageAction.mockResolvedValue(mockSummaryData);

        const {result} = renderHook(() => usePaginatedHero(1, 6), {
            wrapper: tanStackCustomProvider()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        });

        expect(result.current.isError).toBe(false);
        expect(result.current.status).toBe('success');
        expect(mockGetHeroesByPageAction).toHaveBeenCalled();
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, 'all');
    });

    test('Should call getheroesbypageactions with arguments', async() => {
        const mockSummaryData =  {
            total: 25,
            pages: 5,
            heroes: [ {
                id: '1',
                name: 'Superman'
            }, {
                id: '2',
                name: 'Batman'
            }]
        } as HeroResponse;

        mockGetHeroesByPageAction.mockResolvedValue(mockSummaryData);

        const {result} = renderHook(() => usePaginatedHero(1, 6, 'heroes'), {
            wrapper: tanStackCustomProvider()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        });

        expect(result.current.isError).toBe(false);
        expect(result.current.status).toBe('success');
        expect(mockGetHeroesByPageAction).toHaveBeenCalled();
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, 'heroes');
    });

});