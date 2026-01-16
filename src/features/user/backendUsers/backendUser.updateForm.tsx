'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { DrawerClose } from '@/components/ui/drawer'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useBackendRoles } from '@/features/roles/roles.hook'
import { parseAPIError } from '@/lib/parseApiError'
import { cn } from '@/lib/utils'

import { useUpdateBackendUser } from './backendUser.hook'
import { BackendUserUpdatePayload, backendUserUpdateSchema } from './backendUser.schema'
import { BackendUser } from './backendUser.types'

type Props = {
  user: BackendUser
  className?: string
}

const BackendUserUpdateForm = ({ user, className }: Props) => {
  const { data: rolesData, isLoading: rolesLoading } = useBackendRoles()
  const { mutateAsync, isPending } = useUpdateBackendUser()

  const form = useForm<BackendUserUpdatePayload>({
    resolver: zodResolver(backendUserUpdateSchema),
    defaultValues: {
      user_id: user?.uuid,
      role_id: user?.role.ruid,
      is_active: user?.is_active,
    },
  })

  const onSubmit = async (data: BackendUserUpdatePayload) => {
    const payload = {
      user_id: user.uuid,
      role_id: data.role_id,
      is_active: data.is_active,
    }

    await mutateAsync(payload, {
      onSuccess: (updatedUser) => {
        toast.success('User updated successfully')
        form.reset({
          user_id: updatedUser.uuid,
          role_id: updatedUser.role.ruid,
          is_active: updatedUser.is_active,
        })
      },
      onError: (err) => {
        const msg = parseAPIError(err)
        toast.error(msg)
      },
    })
  }

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
    >
      <FieldGroup className="gap-5">
        {/* ===== Role ===== */}
        <Field>
          <FieldLabel>Role</FieldLabel>

          <Controller
            control={form.control}
            name="role_id"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={rolesLoading}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={rolesLoading ? 'Loading roles...' : 'Select role'}
                  />
                </SelectTrigger>

                <SelectContent>
                  {rolesData?.roles?.map((role) => (
                    <SelectItem key={role.ruid} value={role.ruid}>
                      {role.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <FieldDescription>
            {form.formState.errors.role_id?.message ??
              'Only active roles can be assigned.'}
          </FieldDescription>
        </Field>

        {/* ===== User Status ===== */}
        <Field>
          <Controller
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <div className="flex items-center justify-between rounded-lg border px-4 py-3">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">User Status</p>
                  <p className="text-xs text-muted-foreground">
                    Inactive users cannot log in.
                  </p>
                </div>

                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </div>
            )}
          />

          <FieldDescription>{form.formState.errors.is_active?.message}</FieldDescription>
        </Field>

        {/* ===== Actions ===== */}
        <div className="flex items-center justify-end gap-3">
          <DrawerClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DrawerClose>

          <Button type="submit" variant="secondary" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}

export default BackendUserUpdateForm
