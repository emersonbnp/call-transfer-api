"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    if (process.env.SWAGGER === 'true') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Call Transfer API')
            .setDescription('API to manipulate call transfers')
            .setVersion('1.0')
            .addTag('call transfer api')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('swagger', app, document);
    }
    await app.listen(8081);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
//# sourceMappingURL=main.js.map