import { z } from 'zod'

export const addSubscriptionSchema = z.object({
  title: z.string().min(3).max(150),
  description: z.string().min(3),

  price_inr: z.coerce.number().min(0),
  sale_price_inr: z.coerce.number().min(0),

  price_usd: z.coerce.number().min(0),
  sale_price_usd: z.coerce.number().min(0),

  price_pond: z.coerce.number().min(0),
  sale_price_pond: z.coerce.number().min(0),

  price_euro: z.coerce.number().min(0),
  sale_price_euro: z.coerce.number().min(0),

  validity: z.coerce.number(),

  features: z.array(
    z.object({
      feature_code: z.string(),
      quantity: z.coerce.number(),
    }),
  ),
})

/**
 * SINGLE SOURCE OF TRUTH
 */
export type AddSubscriptionFormValues = z.infer<
  typeof addSubscriptionSchema
>
