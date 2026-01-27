// src/types/roles-permission.ts

export interface RoleCreator {
  uuid: string
  username: string
  email: string
}

export interface RolesListParams {
  limit?: number
  offset?: number
}

export interface BackendRole {
  ruid: string
  title: string
  is_deleted: boolean
  creator: RoleCreator
  created_at: string
  updated_at: string
  permissions: BackendPermission[]
}

export interface BackendRoleListResponse {
  roles: BackendRole[]
  total: number
}

// src/types/roles-permission.ts
export interface BackendPermission {
  permission: {
    permission: string
    type: number
    codename: string
  }
}

export interface BackendPermissionforList {
  permission: string
  type: number
  codename: string
}

export type BackendPermissionListResponse = BackendPermissionforList[]

export interface CreateRolePayload {
  title: string
  permissions: string[]
}

export interface UpdateRolePayload {
  ruid: string;
  title: string;
  permissions: string[];
}
