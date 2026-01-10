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
    REFRESH: "/backend-user/refresh",
    LOGOUT: "/backend-user/logout-all",
    FORGOT_PASSWORD_TOKEN: "/backend-user/send-token",
    CREATE_PASSWORD: "/backend-user/create-password",
    PROFILE: "/backend-user/profile",
    UPDATE_PROFILE: "/backend-user/update-profile",
    CHANGE_PASSWORD: "/backend-user/change-password",
  },
  BACKEND_USER: {
    // GET_ALL: "/backend-user/get-all",
    // REGISTER: "/backend-user/register",
    // GET_BY_ID: (userId: string | number) =>
    //   `/backend-user/get/${userId}`,
    // UPDATE: "/backend-user/update-user",
    // DELETE: (userId: string | number) =>
    //   `/backend-user/delete/${userId}`,
    // ROLE: {
    //   GET_ALL: "/backend-user/roles",
    // },
  },
} as const;
