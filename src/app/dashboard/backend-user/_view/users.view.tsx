/* eslint-disable no-restricted-imports */
'use client'

import { useState } from 'react'

import { useBackendUsers } from '@/features/user/backendUsers/backendUser.hook'
import { usePermissions } from '@/lib/csal/usePermission'

import UserTable from '../_widget/user-table'

import AddUser from './addUser.view'
import UserDetailView from './userDetail.view'

const UsersView = () => {
  const [open, setOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data } = useBackendUsers({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  })

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId)
    setOpen(true)
  }

  const {canReadUser, canCreateUser} = usePermissions()

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
        {canCreateUser && (
          <AddUser />
        )}
      </div>

      {/* ===== Table Card ===== */}
      <div className="w-full">
        <UserTable
          data={data?.users ?? []}
          totalCount={data?.total ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          // isLoading={isLoading}
          onViewUser={handleViewUser}
        />
      </div>

      <UserDetailView open={open} onOpenChange={setOpen} userId={selectedUserId} />
    </div>
  )
}

export default UsersView
