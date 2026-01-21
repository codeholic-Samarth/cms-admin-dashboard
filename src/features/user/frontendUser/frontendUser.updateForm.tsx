import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { DrawerClose } from '@/components/ui/drawer'
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'
import { parseAPIError } from '@/lib/parseApiError'
import { cn } from '@/lib/utils'

import { useUpdateFrontendUser } from './frontendUser.hook'
import {
  FrontendUserUpdateFromValues,
  frontendUserUpdateSchema,
} from './frontendUser.schema'
import { FrontendUser } from './frontendUser.type'

type Props = {
  user: FrontendUser
  className?: string
}

const FrontendUserUpdateForm = ({ user, className }: Props) => {
  const { mutateAsync, isPending } = useUpdateFrontendUser()

  const form = useForm<FrontendUserUpdateFromValues>({
    resolver: zodResolver(frontendUserUpdateSchema),
    defaultValues: {
      user_id: user?.uuid,
      is_active: user?.is_active,
    },
  })

  const onSubmit = async (data: FrontendUserUpdateFromValues) => {
    const payload = {
      user_id: user.uuid,
      is_active: data.is_active,
    }

    await mutateAsync(payload, {
      onSuccess: (updateUser) => {
        toast.success('User updated successfully')
        form.reset({
          user_id: updateUser.uuid,
          is_active: updateUser.is_active,
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

export default FrontendUserUpdateForm
