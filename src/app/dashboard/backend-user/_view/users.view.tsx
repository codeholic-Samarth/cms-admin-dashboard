"use client"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useBackendUsers } from "@/features/user/backendUsers/backendUser.hook"

// eslint-disable-next-line no-restricted-imports
import UserTable from "../_widget/user-table"

const UsersView = () => {
  const { data } = useBackendUsers({
    page: 1,
    limit: 10,
  })

  const users = data?.users ?? []

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

        <Button variant={"secondary"}>
          <Plus className="stroke-background" strokeWidth={2} />
          Add User
        </Button>
      </div>

      {/* ===== Table Card ===== */}
      <div>
          <UserTable data={users} />
      </div>
  
    </div>
  )
}

export default UsersView
