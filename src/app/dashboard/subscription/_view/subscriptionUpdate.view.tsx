import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useSubscriptionById } from '@/features/subscription/subscription.hook'
import SubscriptionUpdateForm from '@/features/subscription/subscription.updateForm'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  suid: string | null
  onClose: () => void
}

const SubscriptionUpdateView = ({ open, onOpenChange, suid, onClose }: Props) => {
  const { data: subData, isLoading, isError } = useSubscriptionById(suid!)

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-screen p-0 data-[vaul-drawer-direction=right]:xs:max-w-full data-[vaul-drawer-direction=right]:md:max-w-1/2 data-[vaul-drawer-direction=right]:lg:max-w-1/3 data-[vaul-drawer-direction=right]:xl:max-w-1/4">
        <div className="flex h-full flex-col">
          {/* ===== Header (fixed) ===== */}
          <div className="px-5 pt-6">
            <DrawerHeader className="p-0">
              <DrawerTitle className="text-2xl font-bold">
                Update Subscription
              </DrawerTitle>
              <DrawerDescription className="text-sm text-muted-foreground">
                Fill in the form below to update a subscription
              </DrawerDescription>
            </DrawerHeader>

            <Separator className="my-4" />
          </div>

          {/* ===== Scrollable Content ===== */}
          <ScrollArea className="flex-1 px-5 pb-6 h-[80%]">
            {isLoading && <div>Loading user details...</div>}
        {isError && <div>Failed to load user details.</div>}
        {subData && <SubscriptionUpdateForm subData={subData} onClose={onClose} />}
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default SubscriptionUpdateView
