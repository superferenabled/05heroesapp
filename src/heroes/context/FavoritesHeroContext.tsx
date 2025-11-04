import {createContext, type PropsWithChildren, useEffect, useState} from "react";
import type {Hero} from "@/heroes/types/hero.interface.ts";

interface FavoritesHeroContext {
    favorites: Hero[];
    favoritesCount: number;
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoritesHeroContext = createContext({} as FavoritesHeroContext);

const getFavoritesFromLocalStorage = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

export const FavoriteHeroProvider = ({children}: PropsWithChildren) => {
    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());

    const toggleFavorite = (hero: Hero) => {
        const heroExists = favorites.find((h) => h.id === hero.id);

        if (heroExists) {
            const newFavorites = favorites.filter((h) => h.id !== hero.id);
            setFavorites(newFavorites);
            return;
        }
        setFavorites([...favorites, hero]);
    };

    const isFavorite = (hero: Hero) => {
        return favorites.some((h) => h.id === hero.id);
    };

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoritesHeroContext
            value={{
                favoritesCount: favorites.length,
                favorites,
                isFavorite,
                toggleFavorite
            }}>
            {children}
        </FavoritesHeroContext>
    );
};
