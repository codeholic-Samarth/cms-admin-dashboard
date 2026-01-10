export interface LoginRequest {
  username_or_email: string
  password: string
  details: {
    ip_address: string
    browser: string
    system: string
  }
}

export interface AuthRole {
  ruid: string
  title: string
}

export interface AuthUser {
  uuid: string
  username: string
  email: string
  role: AuthRole
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  refresh_expires_in: number
  user: AuthUser
}
