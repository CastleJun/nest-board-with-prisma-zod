import { z } from 'zod';

export const Cat2ScalarFieldEnumSchema = z.enum(['id','email','password','name','createdAt','updatedAt']);

export default Cat2ScalarFieldEnumSchema;
