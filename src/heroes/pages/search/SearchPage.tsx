import {CustomJumbotron} from "@/components/custom/CustomJumbotron";
import {CustomBreadcrumbs} from "@/components/custom/CustomBreadcrumbs";
import {HeroStats} from "@/heroes/components/HeroStats";
import {SearchControls} from "@/heroes/pages/search/ui/SearchControls";
import {HeroGrid} from "@/heroes/components/HeroGrid";
import {useSearchParams} from "react-router";
import {useSearchHeroes} from "@/heroes/hooks/useSearchHeroes";

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

            <CustomBreadcrumbs currentPage="Search Heroes" />

            <HeroStats />

            <SearchControls />

            { searchResponse != null && <HeroGrid heroes={searchResponse} /> }
        </>

    );
};

export default SearchPage;
