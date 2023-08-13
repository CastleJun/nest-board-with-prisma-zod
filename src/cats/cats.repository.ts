import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CatRequestDto } from './dto/cat.request.dto';

@Injectable()
export class CatsRepository {
  constructor(private prisma: PrismaService) {}

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const isUsedEmail = await this.prisma.cat2.findFirst({
        where: {
          email,
        },
      });

      return Boolean(isUsedEmail);
    } catch (e) {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CatRequestDto) {
    const { email, password, name } = cat;

    return this.prisma.cat2.create({
      data: { email, password, name },
    });
  }
}
