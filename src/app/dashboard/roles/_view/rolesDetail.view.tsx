/* eslint-disable no-restricted-imports */
import React from 'react'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import { useBackendRoleById } from '@/features/roles/roles.hook'

import RolesDetailCard from '../_widget/rolesDetailCard'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  ruid: string | null
}


const RolesDetailView = ({ open, onOpenChange, ruid }: Props) => {
    const {
        data: role,
        isLoading,
        isError,
    } = useBackendRoleById(ruid!)

    console.log("RolesDetailView role:", ruid)

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="px-5 data-[vaul-drawer-direction=right]:md:max-w-1/2 data-[vaul-drawer-direction=right]:lg:max-w-1/3 data-[vaul-drawer-direction=right]:xl:max-w-1/4">
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
        {role && <RolesDetailCard role={role} />}
        <div className='flex justify-end mt-5'>
        <DrawerClose asChild>
          <Button className='px-7' variant={"secondary"}>
            Close
          </Button>
        </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default RolesDetailView
