/* eslint-disable no-restricted-imports */

"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { GalleryVerticalEnd } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { parseAPIError } from '@/lib/parseApiError'
import { cn } from '@/lib/utils'

import { useForgotPasswordToken } from '../auth.hook'

import { ForgotPasswordFormValues, forgotPasswordSchema } from './forgotPassword.schema'



const ForgotPasswordForm = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const router = useRouter()
  const { mutate: forgotPassword, isPending } = useForgotPasswordToken()

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (data: ForgotPasswordFormValues) => {
    forgotPassword(data, {
      onSuccess: () => {
        toast.success('Password reset link sent to your email')
        router.replace('/login')
      },
      onError: (err) => {
        const msg = parseAPIError(err)
        toast.error(msg)
      },
    })
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
            <h1 className="text-xl font-bold">Forgot your password?</h1>
            <FieldDescription>
              Enter your email and we’ll send you a reset link.
            </FieldDescription>
          </div>

          {/* Email Field */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              disabled={isPending}
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <FieldDescription className="text-destructive">
                {form.formState.errors.email.message}
              </FieldDescription>
            )}
          </Field>

          {/* Submit */}
          <Field>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? 'Sending link...' : 'Send reset link'}
            </Button>
          </Field>

          {/* Footer */}
          <FieldDescription className="px-6 text-center">
            Remembered your password?{' '}
            <a
              href="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Back to login
            </a>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  )
}

export default ForgotPasswordForm

