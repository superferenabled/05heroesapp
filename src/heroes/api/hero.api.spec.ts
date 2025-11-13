import {describe, expect, test} from "vitest";
import {BASE_URL, heroApi} from "@/heroes/api/hero.api.ts";

describe('HeroAPI', () => {
    test('should be configured with the testing server url', async () => {

        expect(heroApi).toBeDefined();
        expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`);
        expect(BASE_URL).toContain('3001');
    })
})