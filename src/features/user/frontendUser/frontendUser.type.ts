// src/types/frontend-user.ts

export interface FrontendUserSubscription {
  suid: string;
  title: string;
  validity: number;
  is_deleted: boolean;
  created_at: string;
}

export interface FrontendUser {
  uuid: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  language: string;
  timezone: string;
  profile_photo: string;
  email_verified_at: string | null;
  storage_token: string;
  storage_platform: string;
  subscription: FrontendUserSubscription | null;
  social_token: string;
  social_platform: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface FrontendUserListResponse {
  total: number;
  users: FrontendUser[];
}

export interface UseFrontendUsersParams {
  limit?: number;
  offset?: number;
}
