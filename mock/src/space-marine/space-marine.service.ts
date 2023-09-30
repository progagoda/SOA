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
}
