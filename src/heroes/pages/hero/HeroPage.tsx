import {useParams} from "react-router";

export const HeroPage = () => {
    const params = useParams();

    return (
        <>Hero: {params.idSlug}</>
    );
};