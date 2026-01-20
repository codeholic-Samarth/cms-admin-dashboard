export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://codecms.codeholic.in";

export const IMAGE_URL = `${BASE_URL}/static/products`;

/**
 * Construct a valid image URL from different input types
 */
export const getImageUrl = (imagePath?: string): string => {
  if (!imagePath) return "";

  // Local blob (file upload preview)
  if (imagePath.startsWith("blob:")) return imagePath;

  // Base64 / data URL
  if (imagePath.startsWith("data:")) return imagePath;

  // Already absolute URL
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Server-stored image
  return `${IMAGE_URL}/${imagePath}`;
};

/* 
 * API Endpoints
*/

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/backend-user/login",
    LOGOUT: "/backend-user/logout-all",
    FORGOT_PASSWORD_TOKEN: "/backend-user/send-token",
    CREATE_PASSWORD: "/backend-user/create-password",
    PROFILE: "/backend-user/profile",
    UPDATE_PROFILE: "/backend-user/update-profile",
    CHANGE_PASSWORD: "/backend-user/change-password",
    REFRESH: "/backend-user/refresh"
  },
  BACKEND_USER: {
    GET_ALL: "/backend-user/get-all",
    ADD_USER: "/backend-user/register",
    DETAIL: (user_id: string) => `/backend-user/get/${user_id}`,
    UPDATE_USER: "/backend-user/update-user",
  },
  ROLES_AND_PERMISSION: {
    GET_ALL_ROLES: "/backend-user/roles"
  },
  SUBSCRIPTION: {
    SUB_LIST: "/backend-user/subscriptions",
    ADD_SUBSCRIPTION: "/backend-user/add-subscription",
    FEATURES: "/backend-user/features",
    SUB_DETAIL: (suid: string) => `/backend-user/subscriptions/${suid}`,
    UPDATE_SUB: "/backend-user/update-subscription",
    DEACTIVATE_SUB: (suid: string) => `/backend-user/deactivate-subscription/${suid}`
  }
} as const;
