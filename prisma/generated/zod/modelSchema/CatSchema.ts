import { z } from 'zod';

/////////////////////////////////////////
// CAT SCHEMA
/////////////////////////////////////////

export const CatSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  imgUrl: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Cat = z.infer<typeof CatSchema>;

/////////////////////////////////////////
// CAT PARTIAL SCHEMA
/////////////////////////////////////////

export const CatPartialSchema = CatSchema.partial();

export type CatPartial = z.infer<typeof CatPartialSchema>;

/////////////////////////////////////////
// CAT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const CatOptionalDefaultsSchema = CatSchema.merge(
  z.object({
    id: z.string().optional(),
    imgUrl: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
);

export type CatOptionalDefaults = z.infer<typeof CatOptionalDefaultsSchema>;

export default CatSchema;
