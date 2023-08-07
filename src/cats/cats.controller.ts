import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  getAllCat() {
    return 'all cats';
  }

  @Post()
  createCat(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }
  @Get('/:id')
  getOneCat() {
    return 'one cat';
  }

  @Put('/:id')
  updateCat() {
    return 'update cat';
  }

  @Patch('/:id')
  updateOneCat() {
    return 'update';
  }

  @Delete('/:id')
  deleteCat() {
    return 'delete cat';
  }
}
