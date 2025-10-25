import {CustomJumbotron} from "@/components/custom/CustomJumbotron.tsx";
import {CustomBreadcrumbs} from "@/components/custom/CustomBreadcrumbs.tsx";

export const SearchPage = () => {
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
        </>

    );
};

export default SearchPage;
