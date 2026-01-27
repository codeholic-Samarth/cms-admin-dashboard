import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useBackendRoleById } from '@/features/roles/roles.hook'
import UpdateRoleForm from '@/features/roles/roles.updateForm'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  ruid: string | null
  onClose: () => void
}

const RolesUpdateView = ({ open, onOpenChange, ruid, onClose }: Props) => {
  const { data: role, isLoading, isError } = useBackendRoleById(ruid!)

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-screen p-0 data-[vaul-drawer-direction=right]:xs:max-w-full data-[vaul-drawer-direction=right]:md:max-w-1/2 data-[vaul-drawer-direction=right]:lg:max-w-1/3 data-[vaul-drawer-direction=right]:xl:max-w-1/4">
        <div className="flex h-full flex-col">
          {/* ===== Header (fixed) ===== */}
          <div className="px-5 pt-6">
            <DrawerHeader className="p-0">
              <DrawerTitle className="text-2xl font-bold">
                Update Role
              </DrawerTitle>
              <DrawerDescription className="text-sm text-muted-foreground">
                Fill in the form below to update a role
              </DrawerDescription>
            </DrawerHeader>

            <Separator className="my-4" />
          </div>

          {/* ===== Scrollable Content ===== */}
          <ScrollArea className="flex-1 px-5 pb-6 h-[80%]">
            {isLoading && <div>Loading user details...</div>}
            {isError && <div>Failed to load user details.</div>}
            {role && <UpdateRoleForm role={role} Close={onClose} />}
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default RolesUpdateView
