import {beforeEach, describe, expect, test, vi} from "vitest";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router";
import {FavoriteHeroProvider} from "@/heroes/context/FavoritesHeroContext.tsx";
import SearchPage from "@/heroes/pages/search/SearchPage.tsx";
import {searchHeroesAction} from "@/heroes/actions/search-heroes.action";
import type {Hero} from "@/heroes/types/hero.interface.ts";

vi.mock("@/heroes/actions/search-heroes.action");
const mockSearchHeroesAction = vi.mocked(searchHeroesAction);

vi.mock("@/components/custom/CustomJumbotron", () => ({
    CustomJumbotron: () => <div data-testid="custom-jumbotron"></div>
}));
vi.mock("./ui/SearchControls", () => ({
    SearchControls: () => <div data-testid="search-controls"></div>
}));

vi.mock("@/heroes/components/HeroGrid", () => ({
    HeroGrid: ({heroes}: { heroes: Hero[] }) => {
        return (<div data-testid="heroes-grid">
            {heroes.map(hero => (
                <div key={hero.id}>{hero.name}</div>
            ))}
        </div>)
    }
}))

const queryClient = new QueryClient();

const renderSearchPage = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <FavoriteHeroProvider>
                <QueryClientProvider client={queryClient}>
                    <SearchPage/>
                </QueryClientProvider>
            </FavoriteHeroProvider>
        </MemoryRouter>
    );
};

describe("Search Heroes", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("Should render SearchPage with default values", async () => {

        const {container} = renderSearchPage();
        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            "name": undefined,
            "strength": 0,
        });

        expect(container).toMatchSnapshot();

        // screen.debug();
    });

    test("Should call search action with name parameter", async () => {

        const {container} = renderSearchPage(['/search?name=superman']);
        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            "name": 'superman',
            "strength": 0,
        });

        expect(container).toMatchSnapshot();

        // screen.debug();
    });

    test("Should call search action with strength parameter", async () => {

        const {container} = renderSearchPage(['/search?strength=6']);
        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            "name": undefined,
            "strength": 6,
        });

        expect(container).toMatchSnapshot();

        // screen.debug();
    });

    test("Should call search action with strength and name parameters", async () => {

        const {container} = renderSearchPage(['/search?name=batman&strength=8']);
        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            "name": 'batman',
            "strength": 8,
        });

        expect(container).toMatchSnapshot();

        // screen.debug();
    });

    test("Should render hero grid with search results", async () => {
        const mockHeroes = [
            {id: 1, name: "superman"} as unknown as Hero,
            {id: 2, name: "batman"} as unknown as Hero,
        ];
        mockSearchHeroesAction.mockResolvedValue(mockHeroes);
        renderSearchPage();

        await waitFor(() => {
            expect(screen.getByText('superman')).toBeDefined();
            expect(screen.getByText('batman')).toBeDefined();
        });

        screen.debug();
    });

});