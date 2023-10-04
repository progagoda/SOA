import { TChapter, TSpaceMarine} from './types'

export enum meleeWeapon {
  CHAIN_AXE = 'CHAIN_AXE',
  MANREAPER = 'MANREAPER',
  POWER_BLADE = 'POWER_BLADE',
}
export const chapter: TChapter = {
  name: 'Alex',
  parentLegion: 'Goblin',
  world: 'MineCraft',
}
export enum bol {
  ok = 'true',
  no = 'false',
}
export const spaceMarineInit: TSpaceMarine = {
  id: 0,
  name: '',
  coordinatesX: 0,
  coordinatesY: 0,
  creationDate: '',
  health: 0,
  loyal: bol.ok,
  height: 0,
  meleeWeapon: meleeWeapon.MANREAPER,
  chapterName: '',
  chapterParentLegion:'',
  chapterWorld:'',
  starshipId: 0,
}
