import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/cat.request.dto';
import { CatsRepository } from './cats.repository';
import { Cat } from './dto/cat';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();

    return allCat;
  }
  async signUp(body: CatRequestDto) {
    const { name, email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat;
  }

  async uploadImages(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;

    const newCat = await this.catsRepository.findByIdAndUpdateImage(
      cat.id,
      fileName,
    );

    return newCat;
  }
}
