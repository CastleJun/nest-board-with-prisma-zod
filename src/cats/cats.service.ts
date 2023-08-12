import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatRequestDto } from './dto/cat.request.dto';

@Injectable()
export class CatsService {
  constructor(private prisma: PrismaService) {}

  async create(createCatDto: CreateCatDto) {
    return this.prisma.cat.create({
      data: createCatDto,
    });
  }

  async signUp(body: CatRequestDto) {
    const { email, password, name } = body;

    const isUsedEmail = await this.prisma.cat2.findFirst({
      where: {
        email,
      },
    });

    if (isUsedEmail) {
      throw new UnauthorizedException('해당하는양 고양이는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.prisma.cat2.create({
      data: { name, email, password: hashedPassword },
    });

    return cat;
  }
}
