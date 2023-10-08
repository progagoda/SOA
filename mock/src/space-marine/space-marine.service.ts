import {Injectable} from '@nestjs/common';
import {spaceMarines} from "../db/spaceMarines";
import { SpaceMarineDto } from './space-marine.dto'
import {_} from 'lodash'

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
        const newSpaceMarine:SpaceMarineDto = {...spaceMarine}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        newSpaceMarine.creationDate= new Date;
        const lastMarines =  spaceMarines[spaceMarines.length-1];
        newSpaceMarine.id = (lastMarines ? lastMarines.id+1: 1);
        newSpaceMarine.loyal = spaceMarine.loyal === 'true'
        spaceMarines.push(newSpaceMarine);
    }
    updateSpaceMarine(spaceMarine: SpaceMarineDto, id: string){
        const updateSpaceMarine:SpaceMarineDto = {...spaceMarine}
        const foundIndex = spaceMarines.findIndex(x => x.id.toString() === id);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        updateSpaceMarine.creationDate = new Date;
        updateSpaceMarine.id = parseInt(id);
        spaceMarines[foundIndex] = updateSpaceMarine;
        return updateSpaceMarine;
    }
    deleteSpaceMarineForMeleeWeapon(meleeWeapon:string){
        return _.remove(spaceMarines, function(item) {
            return item.meleeWeapon === meleeWeapon;
        });
    }
}
