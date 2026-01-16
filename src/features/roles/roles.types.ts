// src/types/roles-permission.ts

export interface RoleCreator {
  uuid: string;
  username: string;
  email: string;
}

export interface BackendRole {
  ruid: string;
  title: string;
  is_deleted: boolean;
  creator: RoleCreator;
  created_at: string;
  updated_at: string;
  permissions: unknown[];
}

export interface BackendRoleListResponse {
  roles: BackendRole[];
  totat: number;
} 
