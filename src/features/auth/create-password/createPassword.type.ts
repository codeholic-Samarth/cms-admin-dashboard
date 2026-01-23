// src/types/auth.ts

export interface ChangePasswordPayload {
  token: string;
  password: string;
}

// Backend returns backend-user–like response
export interface ChangePasswordResponse {
  uuid: string;
  username: string;
  email: string;
  role: {
    ruid: string;
    title: string;
  };
  email_verified_at: string | null;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}
