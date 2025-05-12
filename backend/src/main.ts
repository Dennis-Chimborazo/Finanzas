import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FirebaseGuard } from './guard/firebase.guard';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const firebaseGuard = app.get(FirebaseGuard);
  app.useGlobalGuards(firebaseGuard);

  // Global configuration for the ValidationPipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Converts the payload to the corresponding types
    whitelist: true, // Removes properties that are not specified in the DTO
    forbidNonWhitelisted: true, // Throws an error if an undefined property is present in the DTO
  }));
  
  app.enableCors(); // Esto permite todo — no recomendado en producción


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
