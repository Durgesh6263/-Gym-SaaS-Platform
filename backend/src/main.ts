import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable global CORS
  app.enableCors();

  // Enable Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically strip non-whitelisted properties
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
    }),
  );

  // Enable Global Exception Filter for Prisma
  app.useGlobalFilters(new PrismaExceptionFilter());

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(\`Application is running on: \${await app.getUrl()}\`);
}
bootstrap();
