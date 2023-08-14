import { PickType } from '@nestjs/swagger';
import { CatRequestDto } from '../../cats/dto/cat.request.dto';

export class LoginRequestDto extends PickType(CatRequestDto, [
  'email',
  'password',
] as const) {}
