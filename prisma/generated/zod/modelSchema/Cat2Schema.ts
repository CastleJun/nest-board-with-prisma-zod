import { z } from 'zod';

/////////////////////////////////////////
// CAT 2 SCHEMA
/////////////////////////////////////////

export const Cat2Schema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Cat2 = z.infer<typeof Cat2Schema>;

/////////////////////////////////////////
// CAT 2 PARTIAL SCHEMA
/////////////////////////////////////////

export const Cat2PartialSchema = Cat2Schema.partial();

export type Cat2Partial = z.infer<typeof Cat2PartialSchema>;

/////////////////////////////////////////
// CAT 2 OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const Cat2OptionalDefaultsSchema = Cat2Schema.merge(
  z.object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
);

export type Cat2OptionalDefaults = z.infer<typeof Cat2OptionalDefaultsSchema>;

export default Cat2Schema;
