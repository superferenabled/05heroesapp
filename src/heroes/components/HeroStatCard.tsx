import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import type {JSX,  PropsWithChildren} from "react";

interface Props extends PropsWithChildren{
    title: string;
    icon: JSX.Element;
}

export const HeroStatCard = ({title, icon, children}: Props) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
};
