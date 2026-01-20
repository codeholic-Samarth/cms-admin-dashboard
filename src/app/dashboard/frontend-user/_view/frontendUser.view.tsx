"use client"

import React, { useState } from 'react'

import { useFrontendUsers } from '@/features/user/frontendUser/frontendUser.hook'

// eslint-disable-next-line no-restricted-imports
import FrontendUserTable from '../_widget/frontendUser-table'

const FrontendUserView = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading } = useFrontendUsers({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
  })

  const handleViewUser = (suid: string) => {
    console.log('View user with id:', suid)
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

        {/* <AddUser /> */}
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

      {/* <UserDetailView
        open={open}
        onOpenChange={setOpen}
        userId={selectedUserId}
      /> */}
    </div>
  )
}

export default FrontendUserView
