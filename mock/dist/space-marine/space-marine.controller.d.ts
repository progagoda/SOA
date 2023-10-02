import { SpaceMarineService } from './space-marine.service';
export declare class SpaceMarineController {
    private readonly spaceMarineService;
    constructor(spaceMarineService: SpaceMarineService);
    getAll(): Promise<{
        id: number;
        name: string;
        coordinates: {
            x: number;
            y: number;
        };
        creationDate: string;
        health: number;
        loyal: boolean;
        height: number;
        meleeWeapon: string;
        chapter: {
            name: string;
            parentLegion: string;
            world: string;
        };
        starshipId: number;
    }[]>;
    deleteSpaceMarine(id: string): Promise<{
        id: number;
        name: string;
        coordinates: {
            x: number;
            y: number;
        };
        creationDate: string;
        health: number;
        loyal: boolean;
        height: number;
        meleeWeapon: string;
        chapter: {
            name: string;
            parentLegion: string;
            world: string;
        };
        starshipId: number;
    }[]>;
    createSpaceMarine(xmlBody: any): void;
}
