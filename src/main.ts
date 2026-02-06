import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { relatedProjects } from '@vercel/related-projects';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const hasRelatedProjects = configService.get<string>(
    'VERCEL_RELATED_PROJECTS',
  );

  if (hasRelatedProjects) {
    const projects = relatedProjects();
    app.enableCors({
      origin: [
        'localhost:4200',
        projects[0]?.preview.branch,
        projects[0]?.production.url,
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      credentials: true,
    });
  } else {
    app.enableCors({
      origin: ['localhost:4200'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      credentials: true,
    });
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(configService.getOrThrow<number>('PORT'));
}

void bootstrap();
