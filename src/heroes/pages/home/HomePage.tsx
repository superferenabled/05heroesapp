import {
    Filter,
    Heart,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {CustomJumbotron} from "@/components/custom/CustomJumbotron.tsx";
import {HeroStats} from "@/heroes/components/HeroStats.tsx";
import {SearchControls} from "@/heroes/pages/search/ui/SearchControls.tsx";
import {HeroGrid} from "@/heroes/components/HeroGrid.tsx";

export const HomePage = () => {
    return (
        <>
            <>
                <CustomJumbotron title="Superhero Universe"
                                 description="Discover, explore, and manage your favorite superheroes and villains!!"/>

                {/* Stats Dashboard */}
                <HeroStats />

                {/* Controls */}
                <SearchControls />

                {/* Tabs */}
                <Tabs value="all" className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all">All Characters (16)</TabsTrigger>
                        <TabsTrigger value="favorites" className="flex items-center gap-2">
                            <Heart className="h-4 w-4"/>
                            Favorites (3)
                        </TabsTrigger>
                        <TabsTrigger value="heroes">Heroes (12)</TabsTrigger>
                        <TabsTrigger value="villains">Villains (2)</TabsTrigger>
                    </TabsList>
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
                <div className="flex items-center justify-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                        <ChevronLeft className="h-4 w-4"/>
                        Previous
                    </Button>

                    <Button variant="default" size="sm">
                        1
                    </Button>
                    <Button variant="outline" size="sm">
                        2
                    </Button>
                    <Button variant="outline" size="sm">
                        3
                    </Button>
                    <Button variant="ghost" size="sm" disabled>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>

                    <Button variant="outline" size="sm">
                        Next
                        <ChevronRight className="h-4 w-4"/>
                    </Button>
                </div>
            </>
        </>
    )
}