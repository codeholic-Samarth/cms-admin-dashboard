// src/types/auth.ts

export interface AuthProfileRole {
  ruid: string;
  title: string;
}

export interface AuthProfileResponse {
  uuid: string;
  username: string;
  email: string;
  is_active: boolean;
  created_at: string;
  role: AuthProfileRole;
}

export interface CreatePasswordPayload {
  old_password: string;
  new_password: string;
}

export interface CreatePasswordResponse {
  message: string;
}

export interface UserPermission {
  permission: string;
  type: number;
  codename: string;
}

export interface UserPermissionListResponse {
  user_permissions: UserPermission[];
}
