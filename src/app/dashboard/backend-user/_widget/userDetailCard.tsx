'use client'

import { Check, Copy, Trash2 } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BackendUser } from '@/features/user/backendUsers/backendUser.types'
import BackendUserUpdateForm from '@/features/user/backendUsers/backendUser.updateForm'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { usePermissions } from '@/lib/csal/usePermission'

type Props = {
  user: BackendUser
}

const UserDetailCard = ({ user }: Props) => {
  const { copy, isCopied } = useCopyToClipboard()

  const { canUpdateUser } = usePermissions()

  return (
    <Card className="w-full max-w-full mx-auto rounded-2xl shadow-sm py-0">
      <CardContent className="p-6 space-y-6">
        {/* ===== Header ===== */}
        <div className="relative">
          <Button
            appearance={'ghost'}
            mode={'icon'}
            size="icon"
            variant="destructive"
            className="absolute right-0 top-0 h-9 w-9"
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <h2 className="text-base font-semibold leading-none">{user.username}</h2>
              <p className="text-xs text-muted-foreground truncate max-w-[120px] sm:max-w-[220px]">
                {user.uuid}
              </p>

              <div className="flex gap-2 pt-1">
                <Badge variant="secondary">{user.role.title}</Badge>
                <Badge
                  variant={user.is_active ? 'success' : 'destructive'}
                  appearance={'outline'}
                >
                  {user.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Tabs ===== */}
        <Tabs defaultValue="overview" className="w-full">
          {canUpdateUser ? (
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          ) : (
            <TabsList className="grid grid-cols-1 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>
          )}

          {/* ===== Overview Tab ===== */}
          <TabsContent value="overview" className="pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-y-8 text-sm">
              <div className="space-y-2">
                <p className="text-muted-foreground">Username</p>
                <p className="font-medium">{user.username}</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground">Phone Number</p>
                <p className="font-medium">N/A</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground">Created At</p>
                <p className="font-medium">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground">Updated At</p>
                <p className="font-medium">
                  {new Date(user.updated_at).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground">Email Verified</p>
                <Badge variant="outline">{user.email_verified_at ? 'Yes' : 'No'}</Badge>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground">Is Active</p>
                <Badge variant="outline">{user.is_active ? 'Yes' : 'No'}</Badge>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <div className="flex items-center gap-2">
                <p className="text-sm truncate">{user.email}</p>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => copy(user.email)}
                  aria-label="Copy email"
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-chart-2" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* ===== Settings Tab ===== */}
          <TabsContent value="settings" className="pt-4 space-y-5">
            {/* Role */}
            <BackendUserUpdateForm user={user} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default UserDetailCard
