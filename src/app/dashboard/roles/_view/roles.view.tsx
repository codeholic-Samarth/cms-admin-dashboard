/* eslint-disable no-restricted-imports */

'use client'

import { useState } from 'react'

import { useBackendRoles } from '@/features/roles/roles.hook'
import { usePermissions } from '@/lib/csal/usePermission'

import RolesTable from '../_widget/roles-table'

import CreateRolesView from './createRole.view'
import RolesDetailView from './rolesDetail.view'
import RolesUpdateView from './roleUpdate.view'

const RolesView = () => {
  const [openView, setOpenView] = useState(false)
  const [openEditDrawer, setOpenEditDrawer] = useState(false)
  const [selectedEditRubId, setselectedEditRubId] = useState<string | null>(null)
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

  const handleEditDrawer = (ruid: string) => {
    setselectedEditRubId(ruid)
    setOpenEditDrawer(true)
  }

  const {canReadRole, canCreateRole, canUpdateRole} = usePermissions()

  if (!canReadRole) {
  return <div>You do not have permission to view roles.</div>
  }


  return (
    <div className="flex flex-col gap-6">
      {/* ===== Page Header ===== */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Roles and Permission</h1>
          <p className="text-sm text-muted-foreground">Manage roles and permission .</p>
        </div>
        {canCreateRole && (
          <CreateRolesView />
        )}
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
          onEditRole={handleEditDrawer}
          canUpdateRole={canUpdateRole}
        />
      </div>

      <RolesDetailView open={openView} onOpenChange={setOpenView} ruid={selectedRuId} />

      <RolesUpdateView
        open={openEditDrawer}
        onOpenChange={setOpenEditDrawer}
        ruid={selectedEditRubId}
        onClose={() => setOpenEditDrawer(false)}
      />
    </div>
  )
}

export default RolesView
