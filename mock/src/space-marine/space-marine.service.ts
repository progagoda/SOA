import {Injectable} from '@nestjs/common';
import {spaceMarines} from "../db/spaceMarines";


@Injectable()
export class SpaceMarineService {
    getAll() {
        return spaceMarines;
    }
    deleteSpaceMarine(id:string){
        const spaceMarine= spaceMarines.find(item=>
            item.id.toString()===id)

        spaceMarines.splice(spaceMarine.id)
        return spaceMarines;
    }
    createSpaceMarine(spaceMarine){
        spaceMarine.creationDate= new Date;
        const lastMarines =  spaceMarines[spaceMarines.length-1];
        spaceMarine.id = lastMarines ? lastMarines.id+1: 1;
        spaceMarines.push(spaceMarine);
    }
}
