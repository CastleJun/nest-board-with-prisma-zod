import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CatRequestDto } from './dto/cat.request.dto';

@Injectable()
export class CatsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const cat = await this.prisma.cat.findMany();

    return cat;
  }

  async findByIdAndUpdateImage(catId: string, fileName: string) {
    const cat = await this.prisma.cat.update({
      where: {
        id: catId,
      },
      data: {
        imgUrl: `http://localhost:3000/images/${fileName}`,
      },
    });

    return cat;
  }

  async findCatById(catId: string) {
    const cat = await this.prisma.cat.findUnique({
      where: {
        id: catId,
      },
    });

    return cat;
  }

  async findCatByEmail(email: string) {
    const cat = await this.prisma.cat.findUnique({
      where: {
        email,
      },
    });

    return cat;
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const isUsedEmail = await this.prisma.cat.findFirst({
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

    return this.prisma.cat.create({
      data: { email, password, name },
    });
  }
}
