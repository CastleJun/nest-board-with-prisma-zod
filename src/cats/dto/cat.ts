import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CatSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: 'password should not be less then 4' }),
  name: z.string().min(4, { message: 'name should not be less then 4' }),
  imageUrl: z
    .string()
    .default(
      ' https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg',
    ),
});

export class Cat extends createZodDto(CatSchema) {}
