import { z } from 'zod'

/* ----------------------------------------
 * Password Rules
 * -------------------------------------- */
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[^A-Za-z0-9]/,
    'Password must contain at least one special character'
  )

/* ----------------------------------------
 * Create / Reset Password Schema
 * -------------------------------------- */
export const createPasswordSchema = z
  .object({
    password: passwordSchema,

    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

/* ----------------------------------------
 * Type Inference
 * -------------------------------------- */
export type CreatePasswordFormValues = z.infer<
  typeof createPasswordSchema
>
