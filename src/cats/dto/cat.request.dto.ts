import { createZodDto, zodToOpenAPI } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CatRequestSchema = z
  .object({
    id: z.string().optional(),
    email: z.string().email(),
    password: z
      .string()
      .min(4, { message: 'password should not be less then 4' }),
    name: z.string().min(4, { message: 'name should not be less then 4' }),
    imageUrl: z.string().optional(),
  })
  .describe('description for cat request schema');

zodToOpenAPI(CatRequestSchema);

export class CatRequestDto extends createZodDto(CatRequestSchema) {}
