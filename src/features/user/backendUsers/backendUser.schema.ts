import { z } from "zod";

export const backendUserSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(2, "Username must be at least 2 characters long"),

    email: z
      .email({
        message: "Please enter a valid email address",
      }),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),

    confirmPassword: z
      .string()
      .min(8, "Please confirm your password"),

    role_id: z.string().min(1).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type BackendUserFormValues = z.infer<typeof backendUserSchema>;

export const backendUserUpdateSchema = z.object({
  user_id: z
    .string()
    .min(1, 'User ID is required'),

  role_id: z
    .string()
    .min(1, 'Role is required')
    .optional(),

  is_active: z
    .boolean()
    .optional(),
})

export type BackendUserUpdatePayload = z.infer<
  typeof backendUserUpdateSchema
>
