import type { meleeWeapon, bol } from './constants'
import { ReactNode } from 'react'
import { FormInstance } from 'antd'
export type TColumn = {
  title: string
  dataIndex: string
  key: string
  render?: (item: TColumn | TChapter) => ReactNode
}
export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: TSpaceMarine;
  index: number;
  children: React.ReactNode;
}
export type TChapter = {
  name: string
  parentLegion: string
  world: string
}
export type TCoordinates = {
  x: number
  y: number
}
export type TApiSpaceMarine = {
  id: number
  name: string
  coordinates: TCoordinates
  creationDate: string
  health: number
  loyal: bol
  height: number
  meleeWeapon: meleeWeapon
  chapter: TChapter
  starshipId: number
}
export type TSpaceMarine = {
  id: number
  name: string
  coordinatesX: TCoordinates['x']
  coordinatesY: TCoordinates['y']
  creationDate: string
  health: number
  loyal: bol
  height: number
  meleeWeapon: meleeWeapon
  chapterName: TChapter['name'],
  chapterParentLegion:TChapter['parentLegion']
  chapterWorld: TChapter['world']
  starshipId: number
}
export type TStarship = {
  id: number,
  name: string
}
export type TDisembarkStarshipArg = {
  spaceMarineId: number,
  starshipId: number
}
export type TSpaceMarineFormRef = FormInstance<TSpaceMarine>
export type TStarshipFormRef = FormInstance<TStarship>