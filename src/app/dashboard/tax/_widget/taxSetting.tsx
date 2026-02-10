import React from 'react'

import { Separator } from '@/components/ui/separator'
import { TaxFieldCreateForm } from '@/features/tax/taxAddField.form'
import { TaxRegionCreateForm } from '@/features/tax/taxAddRegion.form'

type props = {
  taxId: string
}

const TaxSetting = ({ taxId }: props) => {
  return (
    <div className="space-y-6 h-[80%] pr-3 pl-5">
      <div>
        <h1 className="text-lg font-medium tracking-tight mb-1">Add Region</h1>
        <p className="text-sm text-muted-foreground">
          Add regions where this tax modal get applied.
        </p>
      </div>

      <Separator />

      <TaxRegionCreateForm taxId={taxId} />

      <Separator />

      <div className='h-full'>
        <h1 className="text-lg font-medium tracking-tight mb-1">Add Tax Field</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Configure how this tax is calculated.
        </p>

        <TaxFieldCreateForm taxId={taxId} />
      </div>
    </div>
  )
}

export default TaxSetting
