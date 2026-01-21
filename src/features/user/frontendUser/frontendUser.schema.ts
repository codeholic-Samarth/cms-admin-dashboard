import z from "zod"

export const frontendUserUpdateSchema = z.object({
  user_id: z
    .string()
    .min(1, 'User ID is required'),

  is_active: z
    .boolean()
    .optional(),
})

export type FrontendUserUpdateFromValues = z.infer<
  typeof frontendUserUpdateSchema
>
