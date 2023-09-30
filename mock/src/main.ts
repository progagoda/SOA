import {NestFactory} from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import {AppModule} from './app.module';
import * as fastifyXmlBody from 'fastify-xml-body-parser';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule,
    new FastifyAdapter(), {
        logger: ['error', 'warn','log','debug'],
    });
    app.enableCors({
        allowedHeaders: '*',
        origin: '*',
        credentials: true,
    });
    app.register(fastifyXmlBody);



    await app.listen(4532);
}

bootstrap();
