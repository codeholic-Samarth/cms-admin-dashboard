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


export const taxRegionCreateSchema = z.object({
  tax_id: z.string().min(1, 'Tax is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
})

export type TaxRegionCreateFormValues = z.infer<
  typeof taxRegionCreateSchema
>

export const taxFieldCreateSchema = z.object({
  tax_id: z.string().min(1, 'Tax is required'),
  title: z.string().min(1, 'Title is required'),
  value: z.number().min(0, 'Value must be 0 or greater'),
  value_type: z.number().int(),
})

export type TaxFieldCreateFormValues = z.infer<
  typeof taxFieldCreateSchema
>
