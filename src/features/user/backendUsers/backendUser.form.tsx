import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { DrawerClose } from '@/components/ui/drawer'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useBackendRoles } from '@/features/roles/roles.hook'
import { parseAPIError } from '@/lib/parseApiError'
import { cn } from '@/lib/utils'

import { useCreateBackendUser } from './backendUser.hook'
import { BackendUserFormValues, backendUserSchema } from './backendUser.schema'

const BackendUserForm = ({ className, onClose, ...props }: any) => {
  const [showPassword, setShowPassword] = useState(false)

  const { mutateAsync, isPending } = useCreateBackendUser()
  const { data: rolesData, isLoading: rolesLoading } = useBackendRoles()

  const form = useForm<BackendUserFormValues>({
    resolver: zodResolver(backendUserSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role_id: '',
    },
  })

  const onSubmit = async (data: BackendUserFormValues) => {
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
      role_id: data.role_id,
    }
    await mutateAsync(payload, {
      onSuccess: () => {
        toast.success('User created successfully')
        form.reset()
        onClose()
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
      {...props}
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
    >
      <FieldGroup className="gap-5">
        {/* Username */}
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>

          <Controller
            control={form.control}
            name="username"
            render={({ field }) => (
              <Input
                {...field}
                id="username"
                type="text"
                placeholder="John Doe"
                autoComplete="new-username"
              />
            )}
          />

          <FieldDescription>{form.formState.errors.username?.message}</FieldDescription>
        </Field>

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>

          <Controller
            control={form.control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="new-email"
              />
            )}
          />

          <FieldDescription>{form.formState.errors.email?.message}</FieldDescription>
        </Field>

        {/* Role Select */}
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
                  {rolesData?.roles.map((role) => (
                    <SelectItem key={role.ruid} value={role.ruid}>
                      {role.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <FieldDescription>{form.formState.errors.role_id?.message}</FieldDescription>
        </Field>

        {/* Password */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>

          <Controller
            control={form.control}
            name="password"
            render={({ field }) => (
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  {...field}
                  disabled={isPending}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isPending}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            )}
          />

          <FieldDescription>{form.formState.errors.password?.message}</FieldDescription>
        </Field>

        {/* Confirm Password */}
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>

          <Controller
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <Input
                {...field}
                id="confirm-password"
                autoComplete="new-password"
                placeholder='Rewrite password'
              />
            )}
          />

          <FieldDescription>
            {form.formState.errors.confirmPassword?.message}
          </FieldDescription>
        </Field>

        {/* Actions */}
        <div className="flex items-end w-full justify-end gap-3">
          <DrawerClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DrawerClose>

          <Button type="submit" variant="secondary" disabled={isPending}>
            {isPending ? 'Adding...' : 'Add User'}
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}

export default BackendUserForm
