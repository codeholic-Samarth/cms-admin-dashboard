import { Plus } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import CreateSubscriptionForm from '@/features/subscription/subscription.form'

const CreateSubscriptionView = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary">
          <Plus strokeWidth={3} />
          Create Subscription
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-screen p-0 data-[vaul-drawer-direction=right]:xs:max-w-full data-[vaul-drawer-direction=right]:md:max-w-1/2 data-[vaul-drawer-direction=right]:lg:max-w-1/3 data-[vaul-drawer-direction=right]:xl:max-w-1/4">
        <div className="flex h-full flex-col">
          {/* ===== Header (fixed) ===== */}
          <div className="px-5 pt-6">
            <DrawerHeader className="p-0">
              <DrawerTitle className="text-2xl font-bold">
                Create Subscription
              </DrawerTitle>
              <DrawerDescription className="text-sm text-muted-foreground">
                Fill in the form below to create a subscription
              </DrawerDescription>
            </DrawerHeader>

            <Separator className="my-4" />
          </div>

          {/* ===== Scrollable Content ===== */}
          <ScrollArea className="flex-1 px-5 pb-6 h-[80%]">
            <CreateSubscriptionForm Close={() => setOpen(false)} />
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default CreateSubscriptionView
