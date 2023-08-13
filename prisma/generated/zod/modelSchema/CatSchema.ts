import { z } from 'zod';

/////////////////////////////////////////
// CAT SCHEMA
/////////////////////////////////////////

export const CatSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullish(),
  password: z.string(),
  imgUrl: z.string(),
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
  }),
);

export type CatOptionalDefaults = z.infer<typeof CatOptionalDefaultsSchema>;

export default CatSchema;
