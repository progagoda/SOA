import { Injectable } from '@nestjs/common';
import { starships } from '../db/starships'
import { StarshipDto } from './starship.dto'

@Injectable()
export class StarshipService {
  getAll(){
    return starships
  }
  createStarship(name: string){
    const newStarship: StarshipDto = {
      id: starships[starships.length-1] ? starships[starships.length-1].id+1: 1,
      name: name
    }
    starships.push(newStarship);
  }
}
