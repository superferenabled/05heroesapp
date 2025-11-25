import {describe, expect, test} from "vitest";
import {render, screen} from "@testing-library/react";
import {SearchControls} from "@/heroes/pages/search/ui/SearchControls.tsx";
import {MemoryRouter} from "react-router";

if(typeof window.ResizeObserver === "undefined") {
    class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    window.ResizeObserver = ResizeObserver;
}

const renderWithRouter = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <SearchControls />
        </MemoryRouter>
    )
};

describe("SearchControls", () => {
    test("Should render search controls with default values", () => {
        const { container } = renderWithRouter();
        expect(container).toMatchSnapshot();
        screen.debug()
    });
});