"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./app.module");
const fastifyXmlBody = require("fastify-xml-body-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter(), {
        logger: ['error', 'warn', 'log', 'debug'],
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
//# sourceMappingURL=main.js.map