/* eslint-disable no-restricted-imports */

'use client'

import React, { useState } from 'react'

import { useTaxModels } from '@/features/tax/tax.hook'

import TaxTable from '../_widget/tax-table'

import TaxDetailView from './taxDetail.view'

const TaxView = () => {
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedTaxId, setSelectedTaxId] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading } = useTaxModels({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
  })

  const handleViewUser = (tax_id: string) => {
    setSelectedTaxId(tax_id)
    setViewOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ===== Page Header ===== */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tax Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage Tax Model, tax field, and tax region.
          </p>
        </div>

        {/* <AddUser /> */}
      </div>

      {/* ===== Table Card ===== */}
      <div className="w-full">
        <TaxTable
          data={data?.tax_models ?? []}
          totalCount={data?.total ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          isLoading={isLoading}
          onViewTax={handleViewUser}
        />
      </div>

      <TaxDetailView open={viewOpen} onOpenChange={setViewOpen} tax_id={selectedTaxId} />
    </div>
  )
}

export default TaxView
