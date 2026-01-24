'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
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
import { Separator } from '@/components/ui/separator'
import { useBackendPermissions, useCreateRole } from '@/features/roles/roles.hook'
import { parseAPIError } from '@/lib/parseApiError'

import { CreateRoleFormValues, createRoleSchema } from './roles.schema'

type Props = {
  Close: () => void
}

const CreateRoleForm = ({ Close }: Props) => {
  const { data: permissionData } = useBackendPermissions()
  const { mutateAsync, isPending } = useCreateRole()
  const [selectedPermission, setSelectedPermission] = React.useState('')

//   console.log('permissionData', permissionData)

  const form = useForm<CreateRoleFormValues>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      title: '',
      permissions: [],
    },
  })

  const permissions = form.watch('permissions')

  const onSubmit = async (values: CreateRoleFormValues) => {
    const payload = {
      title: values.title,
      permissions: values.permissions,
    }

    await mutateAsync(payload, {
      onSuccess: () => {
        toast.success('Role created successfully')
        form.reset()
        Close()
      },
      onError: (err) => {
        toast.error(parseAPIError(err))
      },
    })
  }

  return (
    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
      {/* ===============================
       * Basic Information
       * =============================== */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Information</h3>

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Role Title</FieldLabel>
            <Controller
              control={form.control}
              name="title"
              render={({ field }) => <Input {...field} id="title" placeholder="Admin" />}
            />
            <FieldDescription>{form.formState.errors.title?.message}</FieldDescription>
          </Field>
        </FieldGroup>
      </div>

      <Separator />

      {/* ===============================
       * Permissions
       * =============================== */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Permissions</h3>
          <p className="text-sm text-muted-foreground">
            Select permissions to assign to this role
          </p>
        </div>

        {/* Add Permission */}
        <FieldGroup>
          <Field>
            <Select
              value={selectedPermission}
              onValueChange={(value) => {
                const alreadyAdded = permissions.includes(value)

                if (!alreadyAdded) {
                  form.setValue('permissions', [...permissions, value], {
                    shouldValidate: true,
                  })
                }

                // reset select (IMPORTANT – same as feature select)
                setSelectedPermission('')
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select permission" />
              </SelectTrigger>

              <SelectContent position="popper" side="bottom" sideOffset={4} align="end">
                {permissionData?.map((item) => {

                  return (
                    <SelectItem
                      key={item.codename}
                      value={item.codename}
                      disabled={permissions.includes(item.codename)}
                    >
                      {item.permission}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>

        {/* Selected Permissions */}
        <div className="space-y-3 ">
          {permissions.length === 0 && (
            <p className="text-sm text-muted-foreground">No permissions added yet</p>
          )}

          {permissions.map((codename) => {
            const meta = permissionData?.find(
              (p) => p.codename === codename,
            )?.permission

            return (
              <div
                key={codename}
                className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium">{meta}</p>
                  <p className="text-xs text-muted-foreground">{codename}</p>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() =>
                    form.setValue(
                      'permissions',
                      permissions.filter((p) => p !== codename),
                      { shouldValidate: true },
                    )
                  }
                >
                  Remove
                </Button>
              </div>
            )
          })}
        </div>

        <FieldDescription>{form.formState.errors.permissions?.message}</FieldDescription>
      </div>

      <Separator />

      {/* ===============================
       * Actions
       * =============================== */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
        <DrawerClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DrawerClose>

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Role'}
        </Button>
      </div>
    </form>
  )
}

export default CreateRoleForm
