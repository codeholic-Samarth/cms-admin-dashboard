import { z } from 'zod'

export const taxCreateSchema = z.object({
  title: z.string().min(1, 'Tax title is required'),
  regions: z.array(
    z.object({
      country: z.string().min(1),
      state: z.string().min(1),
    }),
  ),
  fields: z.array(
    z.object({
      title: z.string().min(1),
      value: z.number(),
      value_type: z.number(),
    }),
  ),
})

export type TaxCreateFormValues = z.infer<typeof taxCreateSchema>
