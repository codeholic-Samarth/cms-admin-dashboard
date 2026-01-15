export interface BackendUserRole {
  ruid: string;
  title: string;
}

export type BackendUser = {
  uuid: string
  username: string
  email: string
  role: BackendUserRole
  email_verified_at: string | null
  is_active: boolean
  is_deleted: boolean
  created_at: string
  updated_at: string
}

export interface BackendUserListResponse {
  users: BackendUser[];
  total: number;
}

export interface UseBackendUsersParams {
  page?: number;
  limit?: number;
  offset?: number;
  search?: string;
}

export interface BackendUserCreatePayload {
  username: string;
  email: string;
  password: string;
  role_id?: string;
}

export interface BackendUserUpdatePayload {
  user_id: string;
  role_id: string;
  is_deleted: boolean;
  is_active: boolean;
}
