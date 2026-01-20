import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import { useSubscriptionById } from '@/features/subscription/subscription.hook'

// eslint-disable-next-line no-restricted-imports
import SubscriptionDetailCard from '../_widget/subscriptionDetailCard'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  suid: string | null
}

const SubscriptionDetailView = ({ open, onOpenChange, suid }: Props) => {
  const {
    data: user,
    isLoading,
    isError,
  } = useSubscriptionById(suid!)

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
        {user && <SubscriptionDetailCard subscription={user} />}
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

export default SubscriptionDetailView
