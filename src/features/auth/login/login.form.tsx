'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, GalleryVerticalEnd } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { parseAPIError } from '@/lib/parseApiError'
import { cn } from '@/lib/utils'

import { useLogin } from './login.hook'
import { loginFormSchema, LoginFormValues } from './login.schema'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { mutate: login, isPending } = useLogin()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username_or_email: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginFormValues) => {
    login(data, {
      onSuccess: () => {
        toast.success('Logged in successfully!')
        router.replace('/dashboard')
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
          <div className="flex flex-col items-center gap-2 text-center">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to CMS.</h1>
            <FieldDescription>
              Enter your email below to login to your account
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              disabled={isPending}
              {...form.register('username_or_email')}
            />
            {form.formState.errors.username_or_email && (
              <FieldDescription className="text-destructive">
                {form.formState.errors.username_or_email.message}
              </FieldDescription>
            )}
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link href="/forgot-password" className="ml-auto text-sm underline-offset-2 hover:underline">
                Forgot your password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder='*************'
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
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </Field>

          <Field>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? 'Logging in...' : 'Login'}
            </Button>
          </Field>

          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
            <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  )
}
