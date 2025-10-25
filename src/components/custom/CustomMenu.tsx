import {
    NavigationMenuItem,
    NavigationMenuLink
} from "@radix-ui/react-navigation-menu";
import {
    NavigationMenu,
    NavigationMenuList
} from "@/components/ui/navigation-menu";
import {Link, useLocation} from "react-router";
import {cn} from "@/lib/utils.ts";

export const CustomMenu = () => {

    const {pathname} = useLocation();

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <NavigationMenu>
            <NavigationMenuList>

                {/* Home */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={cn(isActive('/') && "bg-slate-200", "rounded-md p-2")}>
                        <Link to='/'>Start</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Search */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={cn(isActive('/search') && "bg-slate-200", "rounded-md p-2")}>
                        <Link to='/search'>Search Heroes</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    );
};
