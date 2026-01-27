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
