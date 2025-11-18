import {beforeEach, describe, expect, test} from "vitest";
import {use} from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import {FavoriteHeroProvider, FavoritesHeroContext} from "@/heroes/context/FavoritesHeroContext.tsx";
import type {Hero} from "@/heroes/types/hero.interface.ts";

const mockHero = {
    id: '1',
    name: 'batman',
} as Hero;

const TestComponent = () => {
    const {favoritesCount, favorites, isFavorite, toggleFavorite} = use(FavoritesHeroContext);
    return (
        <div>
            <div data-testid="favorite-count">{favoritesCount}</div>
            <div data-testid="favorite-list">
                {
                    favorites.map((hero: Hero) => (
                        <div key={hero.id} data-testid={`hero-${hero.id}`}>
                            {hero.name}
                        </div>
                    ))
                }
            </div>
            <button data-testid="toggle-favorite"
            onClick={() => {toggleFavorite(mockHero)}}>
                Toggle favorite
            </button>
            <div data-testid="is-favorite">
                {isFavorite(mockHero).toString()}
            </div>
        </div>
    );
};

const renderContextTest = () => {
    return render(
        <FavoriteHeroProvider>
            <TestComponent />
        </FavoriteHeroProvider>
    )
}

describe('Favorite Hero Context', () => {

    beforeEach(() => {
        localStorage.clear();
    })

    test('Should initialize with default values', () => {
        renderContextTest();
        screen.debug();
        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('favorite-list').children.length).toBe(0);
    });

    test('Should add hero to favorites when toggleFavorite is called with new Hero', () => {
        renderContextTest();
        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);

        screen.debug();

        console.log(localStorage.getItem('favorites'));
        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-1').textContent).toBe('batman');
        expect(localStorage.getItem('favorites')).toBe('[{"id":"1","name":"batman"}]');
    });

    test('Should remove hero from favorites when toggleFavorite is called with new Hero', () => {
        localStorage.setItem('favorites', '[{"id":"1","name":"batman"}]');
        renderContextTest();
        const button = screen.getByTestId('toggle-favorite');


        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-1').textContent).toBe('batman');
        expect(localStorage.getItem('favorites')).toBe('[{"id":"1","name":"batman"}]');

        fireEvent.click(button);

        screen.debug();

        console.log(localStorage.getItem('favorites'));
        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('is-favorite').textContent).toBe('false');
        expect(screen.queryByTestId('hero-1')).toBeNull();
        expect(localStorage.getItem('favorites')).toBe('[]');
    });
});