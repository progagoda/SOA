import {Module} from '@nestjs/common';
import {SpaceMarineService} from './space-marine.service';
import {SpaceMarineController} from './space-marine.controller';

@Module({
    controllers: [SpaceMarineController],
    providers: [SpaceMarineService],
})
export class SpaceMarineModule {

}
