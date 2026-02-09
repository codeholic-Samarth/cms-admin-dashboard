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
import { Separator } from '@/components/ui/separator'
import { TaxCreateForm } from '@/features/tax/tax.form'

const AddTaxModalView = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary">
          <Plus strokeWidth={3} />
          Add Tax Modal
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-screen max-h-screen px-5 data-[vaul-drawer-direction=right]:xs:max-w-full data-[vaul-drawer-direction=right]:md:max-w-1/2 data-[vaul-drawer-direction=right]:lg:max-w-1/3 data-[vaul-drawer-direction=right]:xl:max-w-1/4">
        {/* ===== Header ===== */}
        <DrawerHeader className="my-5 p-0 shrink-0">
          <DrawerTitle className="text-2xl font-bold">Add Tax Modal</DrawerTitle>
          <DrawerDescription className="text-muted-foreground text-sm">
            Fill in the form below to add Tax Modal
          </DrawerDescription>
        </DrawerHeader>

        <Separator className="mb-4 shrink-0" />

        {/* ===== Scrollable Body ===== */}
        <div className="flex-1 overflow-y-auto pr-2 pb-5">
          <TaxCreateForm onClose={() => setOpen(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default AddTaxModalView
