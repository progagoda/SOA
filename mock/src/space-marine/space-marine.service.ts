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

        spaceMarines.splice(spaceMarine.id-1,1)
        return spaceMarines;
    }
    createSpaceMarine(spaceMarine){
        const newSpaceMarine = {...spaceMarine}
        newSpaceMarine.creationDate= new Date;
        const lastMarines =  spaceMarines[spaceMarines.length-1];
        newSpaceMarine.id = lastMarines ? lastMarines.id+1: 1;
        spaceMarines.push(newSpaceMarine);
    }
    updateSpaceMarine(spaceMarine, id: string){
        const deleteSpaceMarine= spaceMarines.find(item=>
          item.id.toString()=== id)
        spaceMarines.splice(deleteSpaceMarine.id-1,1)
        const updateSpaceMarine = {...spaceMarine}
        updateSpaceMarine.creationDate = new Date;
        updateSpaceMarine.id = id;
        spaceMarines.push(updateSpaceMarine);
    }
}
