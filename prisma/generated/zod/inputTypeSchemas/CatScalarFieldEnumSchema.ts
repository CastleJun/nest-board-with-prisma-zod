import { z } from 'zod';

export const CatScalarFieldEnumSchema = z.enum(['id','email','password','name','imgUrl','createdAt','updatedAt']);

export default CatScalarFieldEnumSchema;
