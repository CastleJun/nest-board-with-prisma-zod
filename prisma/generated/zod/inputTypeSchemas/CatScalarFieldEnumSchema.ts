import { z } from 'zod';

export const CatScalarFieldEnumSchema = z.enum(['id','email','name','password','imgUrl']);

export default CatScalarFieldEnumSchema;
