import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cat.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../common/decorator/user.decorator';

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getOneCat(@CurrentUser() cat) {
    return cat;
  }

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

  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }
}
