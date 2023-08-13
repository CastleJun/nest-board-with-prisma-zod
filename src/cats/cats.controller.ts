import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatRequestDto } from './dto/cat.request.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @ApiResponse({
    status: 500,
    description: 'Server Error',
  })
  @ApiResponse({
    status: 200,
    description: 'success',
  })
  @Post('/signUp')
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }
}
