import {
    Filter,
} from "lucide-react"
import {useSearchParams} from "react-router";
import {useMemo} from "react";
import {Badge} from "@/components/ui/badge"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {CustomJumbotron} from "@/components/custom/CustomJumbotron.tsx";
import {HeroStats} from "@/heroes/components/HeroStats.tsx";
import {SearchControls} from "@/heroes/pages/search/ui/SearchControls.tsx";
import {HeroGrid} from "@/heroes/components/HeroGrid.tsx";
import {CustomPagination} from "@/components/custom/CustomPagination.tsx";
import {CustomBreadcrumbs} from "@/components/custom/CustomBreadcrumbs.tsx";
import {useHeroSummary} from "@/heroes/hooks/useHeroSummary.tsx";
import {usePaginatedHero} from "@/heroes/hooks/usePaginatedHero.tsx";

type Tabs = 'all' | 'favorites' | 'heroes' | 'villains';

export const HomePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const activeTab = searchParams.get('tab') || 'all';
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '6';

    const handleTabChange = (tab: Tabs) => {
        setSearchParams((prev) => {
            prev.set('tab', tab);
            return prev;
        });
    }

    const selectedTab = useMemo(() => {
        const validTabs = ['all', 'favorites', 'heroes', 'villains'];
        return validTabs.includes(activeTab) ? activeTab : 'all';
    }, [activeTab]);

    const {data: heroesResponse} = usePaginatedHero(+page, +limit);
    const { data: summary } = useHeroSummary();

    console.log({heroesResponse});
    
    return (
        <>
            <>
                <CustomJumbotron title="Superhero Universe"
                                 description="Discover, explore, and manage your favorite superheroes and villains!!"/>

                <CustomBreadcrumbs currentPage="Super Heroes" />

                {/* Stats Dashboard */}
                <HeroStats />

                {/* Controls */}
                <SearchControls />

                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all" onClick={() => handleTabChange('all')}>All Characters ({summary?.totalHeroes})</TabsTrigger>
                        <TabsTrigger value="favorites" onClick={() => handleTabChange('favorites')}>Favorites (3)</TabsTrigger>
                        <TabsTrigger value="heroes" onClick={() => handleTabChange('heroes')}>Heroes ({summary?.heroCount})</TabsTrigger>
                        <TabsTrigger value="villains" onClick={() => handleTabChange('villains')}>Villains ({summary?.villainCount})</TabsTrigger>
                    </TabsList>
                    {/* Tabs Content */}
                    <TabsContent value="all" >
                        { heroesResponse != null && <HeroGrid heroes={heroesResponse?.heroes} /> }
                    </TabsContent>
                    <TabsContent value="favorites" >
                        { heroesResponse != null && <HeroGrid heroes={heroesResponse?.heroes} /> }
                    </TabsContent>
                    <TabsContent value="heroes" >
                        { heroesResponse != null && <HeroGrid heroes={heroesResponse?.heroes} /> }
                    </TabsContent>
                    <TabsContent value="villains" >
                        { heroesResponse != null && <HeroGrid heroes={heroesResponse?.heroes} /> }
                    </TabsContent>
                </Tabs>

                {/* Results info */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <p className="text-gray-600">Showing 6 of 16 characters</p>
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Filter className="h-3 w-3"/>
                            Filtered
                        </Badge>
                    </div>
                </div>



                {/* Pagination */}
                <CustomPagination totalPages={heroesResponse?.pages || 1} />
            </>
        </>
    )
}