'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useCreatePassword } from '@/features/profile/profile.hook'
import {
  changePasswordSchema,
  ChangePasswordSchema,
} from '@/features/profile/profile.schema'
import { parseAPIError } from '@/lib/parseApiError'

export const ChangePasswordCard = () => {
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  })

  const { mutateAsync, isPending } = useCreatePassword()

  const onSubmit = async (values: ChangePasswordSchema) => {
    const payload = {
      old_password: values.current_password,
      new_password: values.new_password,
    }

    await mutateAsync(payload, {
      onSuccess: () => {
        toast.success('Password changed successfully')
        form.reset()
      },
      onError: (err) => {
        const msg = parseAPIError(err)
        toast.error(msg)
      },
    })
  }

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Enter a new password to update your account. Leave blank to keep the current
          password.
        </CardDescription>
      </CardHeader>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <FieldGroup>
              {/* Current Password */}
              <Field>
                <FieldLabel htmlFor="current_password">Current Password</FieldLabel>
                <Controller
                  control={form.control}
                  name="current_password"
                  render={({ field }) => (
                    <div className="relative">
                      <Input
                        {...field}
                        id="current_password"
                        type={showOldPassword ? 'text' : 'password'}
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showOldPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  )}
                />
                <FieldDescription>
                  {form.formState.errors.current_password?.message}
                </FieldDescription>
              </Field>

              {/* New Password */}
              <Field>
                <FieldLabel htmlFor="new_password">New Password</FieldLabel>
                <Controller
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <div className="relative">
                      <Input
                        {...field}
                        id="new_password"
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                      />
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
                  )}
                />
                <FieldDescription>
                  {form.formState.errors.new_password?.message}
                </FieldDescription>
              </Field>

              {/* Confirm Password */}
              <Field>
                <FieldLabel htmlFor="confirm_password">Confirm Password</FieldLabel>
                <Controller
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <div className="relative">
                      <Input
                        {...field}
                        id="confirm_password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  )}
                />
                <FieldDescription>
                  {form.formState.errors.confirm_password?.message}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </div>
        </CardContent>

        <CardFooter className="pt-6">
          <Button type="submit" variant="secondary" disabled={isPending}>
            {isPending ? 'Changing...' : 'Change Password'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
