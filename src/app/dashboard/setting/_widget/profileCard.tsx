import { Check, Copy } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AuthProfileResponse } from "@/features/profile/profile.type"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"

type Props = {
  profile: AuthProfileResponse
}

const ProfileDetailCard = ({ profile }: Props) => {
  const { copy, isCopied } = useCopyToClipboard()

  return (
    <Card className="w-full max-w-full mx-auto rounded-2xl shadow-sm py-0 bg-background">
      <CardContent className="p-6 space-y-6">
        {/* ===== Header ===== */}
        <div className="flex flex-col sm:flex-row items-start gap-4">

          <div className="space-y-1">
            <h2 className="text-base font-semibold leading-none">Profile</h2>
            <p className="text-xs text-muted-foreground">
              This is how others will see you on the site.
            </p>
          </div>
        </div>

        {/* ===== Tabs ===== */}
            <div className="grid grid-cols-2 gap-y-8 text-sm">
              <div className="space-y-2">
                <p className="text-muted-foreground">Username</p>
                <p className="font-medium capitalize">{profile.username}</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground">Role</p>
                <p className="font-medium capitalize">{profile.role.title}</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground">Created At</p>
                <p className="font-medium">
                  {new Date(profile.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground capitalize">Account Status</p>
                <Badge variant="outline">
                  {profile.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>

            {/* ===== Email ===== */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Email</p>
              <div className="flex items-center gap-2">
                <p className="text-sm truncate">{profile.email}</p>

                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => copy(profile.email)}
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
      </CardContent>
    </Card>
  )
}

export default ProfileDetailCard
