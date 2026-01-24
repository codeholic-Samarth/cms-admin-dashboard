'use client'

import { Check, Copy, Trash2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BackendRole } from '@/features/roles/roles.types'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

type Props = {
  role: BackendRole
}

const RolesDetailCard = ({ role }: Props) => {
  const { copy, isCopied } = useCopyToClipboard()

  return (
    <Card className="w-full rounded-2xl shadow-sm py-0">
      <CardContent className="p-6 space-y-6">
        {/* ===============================
         * Header
         * =============================== */}
        <div className="relative">
          <Button
            appearance="ghost"
            mode="icon"
            size="icon"
            variant="destructive"
            className="absolute right-0 top-0 h-9 w-9"
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <div className="space-y-1">
            <h2 className="text-lg font-semibold leading-none">
              {role.title}
            </h2>

            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground truncate max-w-[220px]">
                {role.ruid}
              </p>

              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => copy(role.ruid)}
              >
                {isCopied ? (
                  <Check className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>

            <div className="flex gap-2 pt-1">
              <Badge variant="secondary">Role</Badge>
              <Badge
                variant={role.is_deleted ? 'destructive' : 'success'}
                appearance="outline"
              >
                {role.is_deleted ? 'Deleted' : 'Active'}
              </Badge>
            </div>
          </div>
        </div>

        {/* ===============================
         * Tabs
         * =============================== */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>

          {/* ===============================
           * Overview
           * =============================== */}
          <TabsContent value="overview" className="pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-y-6 text-sm">
              <div>
                <p className="text-muted-foreground">Created At</p>
                <p className="font-medium">
                  {new Date(role.created_at).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Updated At</p>
                <p className="font-medium">
                  {new Date(role.updated_at).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Created By</p>
                <p className="font-medium">
                  {role.creator.username}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium truncate">
                  {role.creator.email}
                </p>
              </div>
            </div>
          </TabsContent>

          {/* ===============================
           * Permissions
           * =============================== */}
          <TabsContent value="permissions" className="pt-4 space-y-3">
            {role.permissions.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No permissions assigned
              </p>
            )}

            {role.permissions.map((permission, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium">
                    {permission.permission.permission}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {permission.permission.codename}
                  </p>
                </div>

                <Badge variant="outline">
                  Type {permission.permission.type}
                </Badge>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default RolesDetailCard
