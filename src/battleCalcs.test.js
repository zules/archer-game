import { CLANS_STRONGEST_FIRST } from './uniques';

import {supereffectiveCheck} from "./battleCalcs";

describe("supereffectiveCheck", () => {
    test("returns true when Fossilcall attacks Scarestare or similar matchup", () => {
        expect(supereffectiveCheck("Fossilcall","Scarestare")).toBe(true);
        expect(supereffectiveCheck("Skymind","Fossilcall")).toBe(true);
        expect(supereffectiveCheck("Scarestare","Secretkeep")).toBe(true);
    });
    test("returns false when Scarestare attacks Fossilcall or anyone but Secretkeep", () => {
        expect(supereffectiveCheck("Scarestare","Fossilcall")).toBe(false);
        expect(supereffectiveCheck("Scarestare","Beatleap")).toBe(false);
    });
})