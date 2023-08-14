import { forwardRef, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { PrismaService } from '../prisma/prisma.service';
import { CatsRepository } from './cats.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository, PrismaService],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
