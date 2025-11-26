import {describe, expect, test} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
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
        // screen.debug()
    });

    test("Should set input value when search param name is set", () => {
        renderWithRouter(['/?name=Batman']);
        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');
        expect(input.getAttribute('value')).toBe('Batman');
    });

    test("Should change the query params when input has changed and enter is pressed", () => {
        renderWithRouter(['/?name=Batman']);
        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');
        expect(input.getAttribute('value')).toBe('Batman');
        fireEvent.change(input, {target: {value: 'Superman'}});
        fireEvent.keyDown(input, {key: 'Enter'});
        expect(input.getAttribute('value')).toBe('Superman');
        // screen.debug(input);
    });

    test("Should change the query param strength when slider changes", () => {
        renderWithRouter(['/?name=Batman&active-accordion=advanced-filters']);
        const slider = screen.getByRole('slider');
        expect(slider.getAttribute('aria-valuenow')).toBe("0");
        fireEvent.keyDown(slider, {key: 'ArrowRight'});
        expect(slider.getAttribute('aria-valuenow')).toBe("1");
    });

    test("Should accordion be open when active-accordion param is set", () => {
        renderWithRouter(['/?name=Batman&active-accordion=advanced-filters']);
        const accordion = screen.getByTestId('accordion');
        const accordionItem = accordion.querySelector('div');
        expect(accordionItem?.getAttribute('data-state')).toBe('open');
        screen.debug(accordion)
    });

    test("Should accordion be closed when active-accordion param is not set", () => {
        renderWithRouter(['/?name=Batman']);
        const accordion = screen.getByTestId('accordion');
        const accordionItem = accordion.querySelector('div');
        expect(accordionItem?.getAttribute('data-state')).toBe('closed');
        screen.debug(accordion)
    });

});