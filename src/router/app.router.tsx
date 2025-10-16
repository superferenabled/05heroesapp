import { createBrowserRouter } from 'react-router';
import {HomePage} from "@/heroes/pages/home/HomePage.tsx";
import {HeroPage} from "@/heroes/pages/hero/HeroPage.tsx";
// import {SearchPage} from "@/heroes/pages/search/SearchPage.tsx";
import {AdminPage} from "@/admin/pages/AdminPage.tsx";
import {HeroesLayout} from "@/heroes/layouts/HeroesLayout.tsx";
import {AdminLayout} from "@/heroes/layouts/AdminLayout.tsx";
import {lazy} from "react";

const SearchPage = lazy(() => import("@/heroes/pages/search/SearchPage"));

export const appRouter = createBrowserRouter([

    {
        path: '/',
        element: <HeroesLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/heroes/1',
                element: <HeroPage />
            },
            {
                path: '/search',
                element: <SearchPage />
            }
        ]
    },

    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                path: '/admin',
                element: <AdminPage />
            }
        ]
    }
]);