import {CustomJumbotron} from "@/components/custom/CustomJumbotron.tsx";
import {CustomBreadcrumbs} from "@/components/custom/CustomBreadcrumbs.tsx";
import {HeroStats} from "@/heroes/components/HeroStats.tsx";
import {SearchControls} from "@/heroes/pages/search/ui/SearchControls.tsx";
import {HeroGrid} from "@/heroes/components/HeroGrid.tsx";
import {useSearchParams} from "react-router";
import {useSearchHeroes} from "@/heroes/hooks/useSearchHeroes.tsx";

export const SearchPage = () => {

    const [searchParams] = useSearchParams();

    const name = searchParams.get('name') || undefined;
    let strength = searchParams.get('strength') || '0';

    if (isNaN(parseInt(strength))) {
        strength = '0';
    }

    const { data: searchResponse } = useSearchHeroes({name, strength: +strength});

    return (
        <>
            <CustomJumbotron title="Superhero Search"
                             description="Discover, explore, and manage your favorite superheroes and villains!!"/>

            <CustomBreadcrumbs currentPage="Search Heroes"
                breadcrumbs={
                    [
                        {label: 'Home 1', to: '/'},
                        {label: 'Home 2', to: '/'},
                        {label: 'Home 3', to: '/'},
                    ]
                }
            />

            <HeroStats />

            <SearchControls />

            { searchResponse != null && <HeroGrid heroes={searchResponse} /> }
        </>

    );
};

export default SearchPage;
