import {describe, expect, test} from "vitest";
import {getHeroAction} from "@/heroes/actions/get-hero.action.ts";


describe('getHeroes action', async () => {

    test('should fetch hero data with the full image url', async () => {
        const heroData = await getHeroAction('clark-kent');
        expect(heroData.image).toContain('http');
        expect(heroData).toStrictEqual({
                id: '1',
                name: 'Clark Kent',
                slug: 'clark-kent',
                alias: 'Superman',
                powers: [
                    'Súper fuerza',
                    'Vuelo',
                    'Visión de calor',
                    'Visión de rayos X',
                    'Invulnerabilidad',
                    'Súper velocidad'
                ],
                description: 'El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.',
                strength: 10,
                intelligence: 8,
                speed: 9,
                durability: 10,
                team: 'Liga de la Justicia',
                image: 'http://localhost:3001/images/1.jpeg',
                firstAppearance: '1938',
                status: 'Active',
                category: 'Hero',
                universe: 'DC'
            }
        );
    });

    test('should throw an error if hero not found.', async () => {
        const idSlug = 'clark-kent2'
        await getHeroAction(idSlug).catch((error) => {
            expect(error).toBeDefined();
            expect(error.message).toBe('Request failed with status code 404');
        });
    });

});