import { z } from "zod"

export const loginFormSchema = z.object({
  username_or_email: z.string().min(1, "Username or Email is Required"),
  password: z.string().min(1, "Password is Required"),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>
