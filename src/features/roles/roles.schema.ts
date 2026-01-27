import { z } from 'zod'

export const createRoleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, 'Role title must be at least 2 characters'),

  permissions: z
    .array(
      z
        .string()
        .trim()
        .min(1, 'Invalid permission')
    )
    .min(1, 'At least one permission is required')
    .refine(
      (permissions) =>
        new Set(permissions).size === permissions.length,
      {
        message: 'Duplicate permissions are not allowed',
      }
    ),
})

export type CreateRoleFormValues = z.infer<
  typeof createRoleSchema
>

export const updateRoleSchema = z.object({
  ruid: z
    .string()
    .trim()
    .min(1, 'Role id is required'),

  title: z
    .string()
    .trim()
    .min(2, 'Role title must be at least 2 characters'),

  permissions: z
    .array(
      z
        .string()
        .trim()
        .min(1, 'Invalid permission')
    )
    .min(1, 'At least one permission is required')
    .refine(
      (permissions) =>
        new Set(permissions).size === permissions.length,
      {
        message: 'Duplicate permissions are not allowed',
      }
    ),
})

export type UpdateRoleFormValues = z.infer<
  typeof updateRoleSchema
>
