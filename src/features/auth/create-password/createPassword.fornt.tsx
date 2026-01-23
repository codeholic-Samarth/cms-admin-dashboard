/* eslint-disable no-restricted-imports */
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, GalleryVerticalEnd } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { parseAPIError } from '@/lib/parseApiError'
import { cn } from '@/lib/utils'

import { useChangePassword } from '../auth.hook'

import {
  CreatePasswordFormValues,
  createPasswordSchema,
} from './createPassword.schema'

type CreatePasswordFormProps = {
  token: string
}

export function CreatePasswordForm({
  token,
  className,
  ...props
}: CreatePasswordFormProps & React.ComponentProps<'div'>) {
  const { mutate: changePassword, isPending } = useChangePassword()

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<CreatePasswordFormValues>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: CreatePasswordFormValues) => {
    changePassword(
      {
        token,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success('Password created successfully!')
          // optional: router.replace('/login')
        },
        onError: (err) => {
            const msg = parseAPIError(err)
          toast.error(msg)
        },
      }
    )
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          {/* Header */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-6" />
            </div>
            <h1 className="text-xl font-bold">Create your password</h1>
            <FieldDescription>
              Set a strong password to secure your account
            </FieldDescription>
          </div>

          {/* New Password */}
          <Field>
            <FieldLabel htmlFor="password">New Password</FieldLabel>
            <div className="relative">
              <Input
                id="password"
                type={showNewPassword ? 'text' : 'password'}
                placeholder="*************"
                disabled={isPending}
                {...form.register('password')}
              />
              {form.formState.errors.password && (
                <FieldDescription className="text-destructive">
                  {form.formState.errors.password.message}
                </FieldDescription>
              )}
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </Field>

          {/* Confirm Password */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">
              Confirm Password
            </FieldLabel>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="*************"
                disabled={isPending}
                {...form.register('confirmPassword')}
              />
              {form.formState.errors.confirmPassword && (
                <FieldDescription className="text-destructive">
                  {form.formState.errors.confirmPassword.message}
                </FieldDescription>
              )}
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </Field>

          {/* Submit */}
          <Field>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? 'Creating password...' : 'Create Password'}
            </Button>
          </Field>

          <FieldDescription className="px-6 text-center">
            Make sure your password is at least 8 characters long and
            includes a mix of letters and numbers.
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  )
}
