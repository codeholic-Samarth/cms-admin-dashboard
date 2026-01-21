import { Check, Copy, Trash2 } from 'lucide-react'
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FrontendUser } from '@/features/user/frontendUser/frontendUser.type'
import FrontendUserUpdateForm from '@/features/user/frontendUser/frontendUser.updateForm'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

type Props = {
  user: FrontendUser
  onDelete?: (user: FrontendUser) => void
}

const FrontendUserDetailCard = ({ user, onDelete }: Props) => {
  const { copy, isCopied } = useCopyToClipboard()



  return (
    <Card className="w-full max-w-full mx-auto rounded-2xl shadow-sm py-0">
      <CardContent className="p-6 space-y-6">
        {/* ===== Header ===== */}
        <div className="relative">
          <Button
            appearance="ghost"
            mode="icon"
            size="icon"
            variant="destructive"
            className="absolute right-0 top-0 h-9 w-9"
            onClick={() => onDelete?.(user)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Avatar className="h-12 w-12">
              {user.profile_photo ? (
                <AvatarImage src={user.profile_photo} alt={user.username} />
              ) : (
                <AvatarFallback>
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="space-y-1">
              <h2 className="text-base font-semibold leading-none">
                {user.first_name} {user.last_name}
              </h2>

              <div className="flex items-center gap-1">
              <p className="text-xs text-muted-foreground truncate max-w-[140px] sm:max-w-[240px]">
                {user.uuid}
              </p>
              <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => copy(user.uuid)}
                  aria-label="Copy email"
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-chart-2" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <Badge
                  variant={user.is_active ? 'success' : 'destructive'}
                  appearance="outline"
                >
                  {user.is_active ? 'Active' : 'Inactive'}
                </Badge>

                {user.is_deleted && (
                  <Badge variant="destructive" appearance="outline">
                    Deleted
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===== Tabs ===== */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* ===== Overview Tab ===== */}
          <TabsContent value="overview" className="pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-y-8 text-sm">
              <div className="space-y-2">
                <p className="text-muted-foreground">Username</p>
                <p className="font-medium truncate">{user.username}</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground">Language</p>
                <p className="font-medium">{user.language || 'N/A'}</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground">Subscription Plan</p>
                <p className="font-medium">
                  {user.subscription?.title
                    ? `${user.subscription.title}`
                    : 'N/A'}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground">Subscription Validity</p>
                <p className="font-medium">
                  {user.subscription?.validity
                    ? `${user.subscription.validity} days`
                    : '—'}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground">Timezone</p>
                <p className="font-medium">{user.timezone || 'N/A'}</p>
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
                <Badge variant="outline">
                  {user.email_verified_at ? 'Yes' : 'No'}
                </Badge>
              </div>

            </div>

            {/* Email */}
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
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* ===== Settings Tab ===== */}
          <TabsContent value="settings" className="pt-4 space-y-5">
            {/* Extend later:
                - Activate / Deactivate
                - Assign Subscription
                - Revoke social/storage tokens
            */}
            <FrontendUserUpdateForm user={user} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default FrontendUserDetailCard
