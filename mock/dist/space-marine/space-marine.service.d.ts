import { SpaceMarineDto } from './space-marine.dto';
export declare class SpaceMarineService {
    getAll(name?: string): string | {
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
    }[];
    deleteSpaceMarine(id: string): {
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
    }[];
    createSpaceMarine(spaceMarine: any): void;
    updateSpaceMarine(spaceMarine: SpaceMarineDto, id: string): SpaceMarineDto;
    deleteSpaceMarineForMeleeWeapon(meleeWeapon: string): any;
    getForMinCoordinates(): any;
    getSpaceMarineForHealth(health: number): any;
}
