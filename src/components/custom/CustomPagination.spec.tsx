import {describe, expect, test, vi} from "vitest";
import {CustomPagination} from "@/components/custom/CustomPagination.tsx";
import {fireEvent, render, screen} from "@testing-library/react";
import * as React from "react";
import {MemoryRouter} from "react-router";
import type {PropsWithChildren} from "react";

vi.mock('@/components/ui/button', () => ({
    Button: ({ children, ...props }: PropsWithChildren) => (
        <button {...props}>{children}</button>
    ),
}))

const renderWithRouter = (component: React.ReactElement, page: number = 1) => {
    return render(<MemoryRouter initialEntries={[`/?page=${page}`]}>{component}</MemoryRouter>)
};

describe("CustomPagination ", () => {
    test("should render component with default values", () => {
        renderWithRouter(<CustomPagination totalPages={5} />);
        expect(screen.getByText('Next')).toBeDefined();
        expect(screen.getByText('Previous')).toBeDefined();

        expect(screen.getByText('1')).toBeDefined();
        expect(screen.getByText('2')).toBeDefined();
        expect(screen.getByText('3')).toBeDefined();
        expect(screen.getByText('4')).toBeDefined();
        expect(screen.getByText('5')).toBeDefined();
    });

    test("should disable previous button when page is 1", () => {
        renderWithRouter(<CustomPagination totalPages={5} />);
        const previousButton = screen.getByText('Previous');
        expect(previousButton.getAttributeNames()).toContain('disabled');
    });

    test("should disable next button when page is last", () => {
        renderWithRouter(<CustomPagination totalPages={5} />, 5);
        const nextButton = screen.getByText('Next');
        expect(nextButton.getAttributeNames()).toContain('disabled');
    });

    test("should disable button 3 when we are in page 3", () => {
        renderWithRouter(<CustomPagination totalPages={10} />, 3);
        const threeButton = screen.getByText('3');
        const twoButton = screen.getByText('2');
        expect(threeButton.getAttribute('variant')).toBe('default');
        expect(twoButton.getAttribute('variant')).toBe('outline');
    });
    test("should change page when click on button number", () => {
        renderWithRouter(<CustomPagination totalPages={10} />, 3);
        const threeButton = screen.getByText('3');
        const twoButton = screen.getByText('2');
        expect(threeButton.getAttribute('variant')).toBe('default');
        expect(twoButton.getAttribute('variant')).toBe('outline');
        fireEvent.click(twoButton);
        expect(threeButton.getAttribute('variant')).toBe('outline');
        expect(twoButton.getAttribute('variant')).toBe('default');
    });
});