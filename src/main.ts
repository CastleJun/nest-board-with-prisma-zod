import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import * as expressBasicAuth from 'express-basic-auth';
import { config } from './config';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [config.swagger.user]: config.swagger.password,
      },
    }),
  );

  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/images',
  });

  const openAPIConfig = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('cat')
    .setVersion('1.0.0')
    .build();

  patchNestJsSwagger();
  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    openAPIConfig,
  );
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
