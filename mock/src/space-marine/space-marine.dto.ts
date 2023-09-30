
import {isString, IsNumber, IsString, isDate, IsDate, min, IsInt} from "class-validator";
import * as diagnostics_channel from "diagnostics_channel";



class TCoordinates {
  @IsNumber()
  x:number
  @IsNumber()
  y:number
}

class TChapter {
  @IsString()
  name: string
  @IsString()
  parentLegion: string
  @IsString()
  world: string
}

export class SpaceMarineDto{
  @IsNumber()
  id: number
  @IsString()
  name: string
  coordinates: TCoordinates
  @IsDate()
  creationDate: string
  @IsNumber()
  health: number
  @IsNumber()
  height: number
  @IsString()
  meleeWeapon: string
  chapter: TChapter
  @IsInt()
  starshipId: number
}