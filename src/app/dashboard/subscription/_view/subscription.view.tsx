'use client'

import React, { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSubscriptions } from '@/features/subscription/subscription.hook'
import { Currency } from '@/features/subscription/subscription.types'

// eslint-disable-next-line no-restricted-imports
import SubscriptionTable from '../_widget/subscription.table'

import CreateSubscriptionView from './createSubscription.view'

const SubscriptionView = () => {
  const [currency, setCurrency] = useState<Currency>('INR')
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading } = useSubscriptions({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
  })

  return (
    <div className="flex flex-col gap-6">
      {/* ===== Page Header ===== */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Subscriptions</h1>
          <p className="text-sm text-muted-foreground">
            Manage subscription plans, pricing, and features.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={currency}
            onValueChange={(value) => setCurrency(value as Currency)}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent position="popper" side="bottom" sideOffset={4} align="end">
              <SelectItem value="INR">INR (₹)</SelectItem>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="EUR">EUR (€)</SelectItem>
              <SelectItem value="GBP">GBP (£)</SelectItem>
            </SelectContent>
          </Select>

          <CreateSubscriptionView />
        </div>
      </div>

      {/* ===== Table ===== */}
      <div className="w-full">
        <SubscriptionTable
          data={data?.subscriptions ?? []}
          recordCount={data?.total ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          isLoading={isLoading}
          currency={currency}
        />
      </div>
    </div>
  )
}

export default SubscriptionView
