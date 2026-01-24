/* eslint-disable no-restricted-imports */

"use client"

import React, { useState } from 'react'

import { useBackendRoles } from '@/features/roles/roles.hook'

import RolesTable from '../_widget/roles-table'

import RolesDetailView from './rolesDetail.view'

const RolesView = () => {
  const [openView, setOpenView] = useState(false)
  const [selectedRuId, setselectedRuId] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading } = useBackendRoles({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
  })

  const handleViewUser = (ruid: string) => {
    setselectedRuId(ruid)
    setOpenView(true)
  }

  const handleEditDrawer = (suid: string) => {
    console.log(suid)
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
      </div>

      {/* ===== Table ===== */}
      <div className="w-full">
        <RolesTable
          data={data?.roles ?? []}
          recordCount={data?.total ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          isLoading={isLoading}
          onViewRole={handleViewUser}
          onEditSub={handleEditDrawer}
        />
      </div>

      <RolesDetailView
        open={openView}
        onOpenChange={setOpenView}
        ruid={selectedRuId}
      />
    </div>
  )
}

export default RolesView
