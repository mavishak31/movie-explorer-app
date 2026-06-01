import { z } from 'zod';

export const movieSearchSchema = z.object({
  search: z.string().optional(),
  genre: z.string().optional(),
});

export type MovieSearchFromValues = z.infer<typeof movieSearchSchema>;
