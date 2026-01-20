'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DeleteConfirmation } from '@/components/widget/deleteConfirmation'
import {
  useDeactivateSubscription,
  useSubscriptions,
} from '@/features/subscription/subscription.hook'
import { Currency } from '@/features/subscription/subscription.types'
import { cn } from '@/lib/utils'

// eslint-disable-next-line no-restricted-imports
import SubscriptionTable from '../_widget/subscription.table'

import CreateSubscriptionView from './createSubscription.view'
import SubscriptionDetailView from './subscriptionDetail.view'
import SubscriptionUpdateView from './subscriptionUpdate.view'

const SubscriptionView = () => {
  const [open, setOpen] = useState(false)
  const [openEditDrawer, setOpenEditDrawer] = useState(false)
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false)
  const [selectedSubId, setselectedSubId] = useState<string | null>(null)
  const [selectedEditSubId, setselectedEditSubId] = useState<string | null>(null)
  const [toggleTarget, setToggleTarget] = useState<{
    suid: string
    isActive: boolean
  } | null>(null)

  const [currency, setCurrency] = useState<Currency>('INR')
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading } = useSubscriptions({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
  })

  const { mutate: deactivateSub, isPending: isDeactivating } = useDeactivateSubscription()

  const handleViewUser = (suid: string) => {
    setselectedSubId(suid)
    setOpen(true)
  }

  const handleEditDrawer = (suid: string) => {
    setselectedEditSubId(suid)
    setOpenEditDrawer(true)
  }

  const handleToggleSub = (suid: string, isActive: boolean) => {
    setToggleTarget({ suid, isActive })
    setOpenDeleteConfirmModal(true)
  }

  const handleConfirmToggle = () => {
    if (!toggleTarget) return

    deactivateSub(
      {
        suid: toggleTarget.suid,
        is_active: !toggleTarget.isActive,
      },
      {
        onSuccess: () => {
          toast.success(
            toggleTarget.isActive
              ? 'Subscription deactivated successfully'
              : 'Subscription activated successfully',
          )

          setOpenDeleteConfirmModal(false)
          setToggleTarget(null)

          // Close drawers if needed
          if (selectedSubId === toggleTarget.suid) {
            setOpen(false)
            setselectedSubId(null)
          }

          if (selectedEditSubId === toggleTarget.suid) {
            setOpenEditDrawer(false)
            setselectedEditSubId(null)
          }
        },
      },
    )
  }

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
          onViewUser={handleViewUser}
          onEditSub={handleEditDrawer}
          onToggleSub={handleToggleSub}
        />
      </div>

      <SubscriptionDetailView open={open} onOpenChange={setOpen} suid={selectedSubId} />

      <SubscriptionUpdateView
        open={openEditDrawer}
        onOpenChange={setOpenEditDrawer}
        suid={selectedEditSubId}
        onClose={() => setOpenEditDrawer(false)}
      />

      <DeleteConfirmation
        open={openDeleteConfirmModal}
        onOpenChange={setOpenDeleteConfirmModal}
        title={
          toggleTarget?.isActive ? 'Deactivate Subscription' : 'Activate Subscription'
        }
        description={
          toggleTarget?.isActive
            ? 'This will deactivate the subscription. Users will no longer be able to use it.'
            : 'This will activate the subscription and make it available to users.'
        }
        confirmText={toggleTarget?.isActive ? 'Deactivate' : 'Activate'}
        onConfirm={handleConfirmToggle}
        isLoading={isDeactivating}
        btnClassName={cn(toggleTarget?.isActive ? 'bg-destructive' : 'bg-secondary hover:bg-secondary/80')}
      />
    </div>
  )
}

export default SubscriptionView
