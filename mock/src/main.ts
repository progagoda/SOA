import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn','log','debug'],
    });
    app.enableCors({
        allowedHeaders: '*',
        origin: '*',
        credentials: true,
    });

    await app.listen(4532);
}

bootstrap();
