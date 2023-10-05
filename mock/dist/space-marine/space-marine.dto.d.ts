declare class TCoordinates {
    x: number;
    y: number;
}
declare class TChapter {
    name: string;
    parentLegion: string;
    world: string;
}
export declare class SpaceMarineDto {
    id: number;
    name: string;
    coordinates: TCoordinates;
    creationDate: string;
    health: number;
    loyal: boolean;
    height: number;
    meleeWeapon: string;
    chapter: TChapter;
    starshipId: number;
}
export {};
