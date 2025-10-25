import {
    Filter,
} from "lucide-react"
import {Badge} from "@/components/ui/badge"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {CustomJumbotron} from "@/components/custom/CustomJumbotron.tsx";
import {HeroStats} from "@/heroes/components/HeroStats.tsx";
import {SearchControls} from "@/heroes/pages/search/ui/SearchControls.tsx";
import {HeroGrid} from "@/heroes/components/HeroGrid.tsx";
import {useState} from "react";
import {CustomPagination} from "@/components/custom/CustomPagination.tsx";
import {CustomBreadcrumbs} from "@/components/custom/CustomBreadcrumbs.tsx";

export const HomePage = () => {
    const [activeTab, setActiveTab] = useState<'all' |
    'favorites' |
    'heroes' |
    'villains'>('all');
    
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
                <Tabs value={activeTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all" onClick={() => setActiveTab('all')}>All Characters (16)</TabsTrigger>
                        <TabsTrigger value="favorites" onClick={() => setActiveTab('favorites')}>Favorites (3)</TabsTrigger>
                        <TabsTrigger value="heroes" onClick={() => setActiveTab('heroes')}>Heroes (12)</TabsTrigger>
                        <TabsTrigger value="villains" onClick={() => setActiveTab('villains')}>Villains (2)</TabsTrigger>
                    </TabsList>
                    {/* Tabs Content */}
                    <TabsContent value="all" >
                        <h1>All Heroes</h1>
                    </TabsContent>
                    <TabsContent value="favorites" >
                        <h1>Favorites</h1>
                    </TabsContent>
                    <TabsContent value="heroes" >
                        <h1>Heroes</h1>
                    </TabsContent>
                    <TabsContent value="villains" >
                        <h1>Villains</h1>
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

                {/* Character Grid */}
                <HeroGrid />

                {/* Pagination */}
                <CustomPagination totalPages={10} />
            </>
        </>
    )
}