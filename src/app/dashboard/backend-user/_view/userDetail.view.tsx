'use client'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import { useBackendUserById } from '@/features/user/backendUsers/backendUser.hook'

// eslint-disable-next-line no-restricted-imports
import UserDetailCard from '../_widget/userDetailCard'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: string | null
}

const UserDetailView = ({ open, onOpenChange, userId }: Props) => {
  const {
    data: user,
    isLoading,
    isError,
  } = useBackendUserById(userId!, {
    enabled: !!userId && open,
  })

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
        {user && <UserDetailCard user={user} />}
      </DrawerContent>
    </Drawer>
  )
}

export default UserDetailView
