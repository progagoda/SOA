import type { meleeWeapon, bol } from "./constants";
import {ReactNode} from "react";
import {FormInstance} from "antd";
export type TColumn =  {
    title: string,
    dataIndex: string,
    key: string,
    render?: (item: TColumn | TChapter ) => ReactNode,
}

export type TChapter = {
    name: string,
    parentLegion: string,
    world: string,
}
export type TCoordinates = {
    x: number,
    y: number
}
export type TSpaceMarine = {
    id: number,
    name: string,
    coordinates: TCoordinates,
    creationDate: string,
    health: number,
    loyal: bol,
    height: number,
    meleeWeapon: meleeWeapon,
    chapter: TChapter,
    starshipId: number,
}
export type TFilters = {
    id: number[]
    name: string[],
    coordinates: TCoordinates[],
    creationDate: string[],
    health: number[],
    loyal: bol[],
    height: number[],
    meleeWeapon: meleeWeapon[],
    chapter: TChapter[],
    starshipId: number[],
}
export type TSpaceMarineFormRef = FormInstance<TSpaceMarine>;