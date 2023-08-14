import { createZodDto, zodToOpenAPI } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: 'password should not be less then 4' }),
});

zodToOpenAPI(LoginRequestSchema);

export class LoginRequestDto extends createZodDto(LoginRequestSchema) {}
