"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug'],
    });
    app.enableCors({
        allowedHeaders: '*',
        origin: '*',
        credentials: true,
    });
    await app.listen(4532);
}
bootstrap();
//# sourceMappingURL=main.js.map