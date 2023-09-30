import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {SpaceMarineModule} from './space-marine/space-marine.module';

@Module({
    imports: [SpaceMarineModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
