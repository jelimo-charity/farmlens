import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS - allows cross-origin requests from any domain. This is useful for development and testing, but in production, you may want to restrict it to specific domains.
  app.enableCors();

  // Global Validation - removes or rejects unknown fields, transforms payloads, and throws errors for unknown fields
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes unknown fields
      transform: true, // Automatically transforms payloads
      forbidNonWhitelisted: true, // Throws error for unknown fields
    }),
  );

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('FarmLens API')
    .setDescription('Community-powered climate intelligence API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);

  console.log(
    ` FarmLens API running on http://localhost:${process.env.PORT ?? 3000}`,
  );
}

bootstrap();