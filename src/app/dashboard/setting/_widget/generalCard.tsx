'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

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
import { changePasswordSchema, ChangePasswordSchema } from '@/features/profile/profile.schema'

export const ChangePasswordCard = () => {
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  })

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
      //   onSubmit={form.handleSubmit(onSubmit)}
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
                    <Input
                      {...field}
                      id="current_password"
                      type="password"
                      placeholder="Enter current password"
                    />
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
                    <Input
                      {...field}
                      id="new_password"
                      type="password"
                      placeholder="Enter new password"
                    />
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
                    <Input
                      {...field}
                      id="confirm_password"
                      type="password"
                      placeholder="Confirm new password"
                    />
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
          <Button
            type="submit"
            variant="secondary"
            disabled={form.formState.isSubmitting}
          >
            Change Password
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
