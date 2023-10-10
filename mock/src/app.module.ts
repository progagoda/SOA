import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {SpaceMarineModule} from './space-marine/space-marine.module';
import { StarshipModule } from './starship/starship.module';

@Module({
    imports: [SpaceMarineModule, StarshipModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
