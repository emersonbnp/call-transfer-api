import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(process.env.SWAGGER)
  if (process.env.SWAGGER === "true") {
    const config = new DocumentBuilder()
      .setTitle('Call Transfer API')
      .setDescription('API to manipulate call transfers')
      .setVersion('1.0')
      .addTag('calls transfer api')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(3000);

  if ((module as any).hot) {
    (module as any).hot.accept();
    (module as any).hot.dispose(() => app.close());
  }
}
bootstrap();
