
import { IsNumber, IsString, IsDate, IsInt, IsBoolean } from 'class-validator'



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
  @IsBoolean()
  loyal: boolean
  @IsNumber()
  height: number
  @IsString()
  meleeWeapon: string
  chapter: TChapter
  @IsInt()
  starshipId: number
}