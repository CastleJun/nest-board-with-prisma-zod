import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import * as process from 'process';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { ExcludePasswordMiddleware } from './prisma/prisma.middleware';

@Module({
  imports: [CatsModule, PrismaModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
    consumer.apply(ExcludePasswordMiddleware).forRoutes('*');
  }
}
