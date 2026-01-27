'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { DrawerClose } from '@/components/ui/drawer'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  useBackendPermissions,
  useUpdateRole,
} from '@/features/roles/roles.hook'
import { parseAPIError } from '@/lib/parseApiError'

import { UpdateRoleFormValues, updateRoleSchema } from './roles.schema'
import { BackendPermission, BackendRole } from './roles.types'


type Props = {
  role: BackendRole
  Close: () => void
}

const extractPermissionCodenames = (
  permissions: BackendPermission[],
): string[] =>
  permissions.map((p) => p.permission.codename)

const UpdateRoleForm = ({ role, Close }: Props) => {
  const { data: permissionData } = useBackendPermissions()
  const { mutateAsync, isPending } = useUpdateRole()

  const [selectedPermission, setSelectedPermission] = React.useState('')

  const form = useForm<UpdateRoleFormValues>({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: {
      ruid: role.ruid,
      title: role.title,
      permissions: extractPermissionCodenames(role.permissions),
    },
  })

  const permissions = form.watch('permissions')

  const onSubmit = async (values: UpdateRoleFormValues) => {
    await mutateAsync(values, {
      onSuccess: () => {
        toast.success('Role updated successfully')
        Close()
      },
      onError: (err) => {
        toast.error(parseAPIError(err))
      },
    })
  }

  return (
    <form className="space-y-8" 
    onSubmit={form.handleSubmit(onSubmit)}
    >
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
              render={({ field }) => (
                <Input {...field} id="title" placeholder="Admin" />
              )}
            />
            <FieldDescription>
              {form.formState.errors.title?.message}
            </FieldDescription>
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
            Update permissions assigned to this role
          </p>
        </div>

        {/* Add Permission */}
        <FieldGroup>
          <Field>
            <Select
              value={selectedPermission}
              onValueChange={(value) => {
                if (!permissions.includes(value)) {
                  form.setValue('permissions', [...permissions, value], {
                    shouldValidate: true,
                  })
                }
                setSelectedPermission('')
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select permission" />
              </SelectTrigger>

              <SelectContent
                position="popper"
                side="bottom"
                sideOffset={4}
                align="end"
              >
                {permissionData?.map((item) => (
                  <SelectItem
                    key={item.codename}
                    value={item.codename}
                    disabled={permissions.includes(item.codename)}
                  >
                    {item.permission}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>

        {/* Selected Permissions */}
        <div className="space-y-3">
          {permissions.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No permissions added yet
            </p>
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
                  <p className="text-xs text-muted-foreground">
                    {codename}
                  </p>
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

        <FieldDescription>
          {form.formState.errors.permissions?.message}
        </FieldDescription>
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
          {isPending ? 'Updating...' : 'Update Role'}
        </Button>
      </div>
    </form>
  )
}

export default UpdateRoleForm
