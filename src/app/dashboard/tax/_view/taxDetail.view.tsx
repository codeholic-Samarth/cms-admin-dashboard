/* eslint-disable no-restricted-imports */
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import { useTaxModelById } from '@/features/tax/tax.hook'

import TaxModalDetailCard from '../_widget/taxModalDetailCard'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  tax_id: string | null
}

const TaxDetailView = ({ open, onOpenChange, tax_id }: Props) => {
  const { data: tax, isLoading, isError } = useTaxModelById(tax_id || '')

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className="
    px-5
    overflow-hidden
    flex
    flex-col
    data-[vaul-drawer-direction=right]:md:max-w-1/2
    data-[vaul-drawer-direction=right]:lg:max-w-1/3
    data-[vaul-drawer-direction=right]:xl:max-w-1/4
  "
      >
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
        {tax && <TaxModalDetailCard tax={tax} />}
      </DrawerContent>
    </Drawer>
  )
}

export default TaxDetailView
