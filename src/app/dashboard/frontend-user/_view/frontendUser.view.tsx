/* eslint-disable no-restricted-imports */
"use client"

import React, { useState } from 'react'

import { useFrontendUsers } from '@/features/user/frontendUser/frontendUser.hook'
import { usePermissions } from '@/lib/csal/usePermission'

import FrontendUserTable from '../_widget/frontendUser-table'

import FrontendUserDetailView from './frontendUserDetail.view'

const FrontendUserView = () => {
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading } = useFrontendUsers({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
  })

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId)
    setViewOpen(true)
  }

  const {canReadUser, canUpdateUser} = usePermissions()

  if (!canReadUser) {
  return <div>You do not have permission to view users.</div>
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ===== Page Header ===== */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage users, roles, and account status.
          </p>
        </div>
      </div>

      {/* ===== Table Card ===== */}
      <div className="w-full">
        <FrontendUserTable
          data={data?.users ?? []}
          totalCount={data?.total ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          isLoading={isLoading}
          onViewUser={handleViewUser}
        />
      </div>

      <FrontendUserDetailView
        open={viewOpen}
        onOpenChange={setViewOpen}
        userId={selectedUserId}
        canUpdateUser={canUpdateUser}
      />
    </div>
  )
}

export default FrontendUserView
