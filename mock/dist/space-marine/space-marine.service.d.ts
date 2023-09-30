export declare class SpaceMarineService {
    getAll(): {
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
}
