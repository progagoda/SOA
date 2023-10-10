import { IsNumber, IsString} from 'class-validator'

export class StarshipDto {
  @IsNumber()
  id: number
  @IsString()
  name: string
}