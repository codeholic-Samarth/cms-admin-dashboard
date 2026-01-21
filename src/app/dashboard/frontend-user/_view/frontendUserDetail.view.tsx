/* eslint-disable no-restricted-imports */
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { useFrontendUserById } from "@/features/user/frontendUser/frontendUser.hook"

import FrontendUserDetailCard from "../_widget/frontendUserDetailCard"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: string | null
}

const FrontendUserDetailView = ({ open, onOpenChange, userId }: Props) => {
  const {
    data: user,
    isLoading,
    isError,
  } = useFrontendUserById(userId || '')

  return (
    <Drawer direction='right' open={open} onOpenChange={onOpenChange} >
      <DrawerContent className="px-5 data-[vaul-drawer-direction=right]:md:max-w-1/2 data-[vaul-drawer-direction=right]:lg:max-w-1/3 data-[vaul-drawer-direction=right]:xl:max-w-1/4" >
        <DrawerHeader className="my-5 p-0">
          <DrawerTitle className="text-2xl font-bold">User Details</DrawerTitle>
          <DrawerDescription className="text-muted-foreground text-sm">
            View and manage user information
          </DrawerDescription>
        </DrawerHeader>

        <Separator className="mb-5" />

        {/* ===== States ===== */}
        {isLoading && <div>Loading user details...</div>}
        {isError && <div>Failed to load user details.</div>}
        {user && <FrontendUserDetailCard user={user} />}
      </DrawerContent>
    </Drawer>
  )
}

export default FrontendUserDetailView
