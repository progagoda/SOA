import {Injectable} from '@nestjs/common';
import {spaceMarines} from "../db/spaceMarines";
import { SpaceMarineDto } from './space-marine.dto'
import {_} from 'lodash'
import { create } from 'xmlbuilder2'

@Injectable()
export class SpaceMarineService {
    getAll(name?:string) {
        if (name){
            return create()
              .ele('SpaceMarines')
              .ele('spaceMarines')
              .ele('name')
              .txt("sdfsdf")
              .up()
              .ele('coordinates')
              .ele('x')
              .txt("1")
              .up()
              .ele('y')
              .txt("1")
              .up()
              .up()
              .ele('health')
              .txt("1")
              .up()
              .ele('height')
              .txt("1")
              .up()
              .ele('loyal')
              .txt("false")
              .up()
              .ele('meleeWeapon')
              .txt("dfsd")
              .up()
              .ele('chapter')
              .ele('name')
              .txt("sdfsdf")
              .up()
              .ele('parentLegion')
              .txt("fsdfsd")
              .up()
              .ele('world')
              .txt("dsfsd")
              .up()
              .up()
              .ele('starshipId')
              .txt("1")
              .up()
              .up()
              .end({ prettyPrint: true })
        }
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
        newSpaceMarine.loyal = spaceMarine.loyal
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
    getForMinCoordinates(){
        return _.minBy(spaceMarines,(marine: typeof spaceMarines[0]) => marine.coordinates.x)
    }
    getSpaceMarineForHealth(health: number){
        return _.filter(spaceMarines,(marine: typeof spaceMarines[0]) => '')
    }
}
