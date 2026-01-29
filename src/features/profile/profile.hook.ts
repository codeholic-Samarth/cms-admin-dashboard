import { useMutation, useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constant/query_keys";

import { authService } from "./profile.api";
import { AuthProfileResponse, CreatePasswordPayload, CreatePasswordResponse, UserPermissionListResponse } from "./profile.type";

export const useAuthProfile = () => {
  return useQuery<AuthProfileResponse>({
    queryKey: QUERY_KEYS.AUTH.PROFILE,
    queryFn: () => authService.getProfile(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreatePassword = () => {
  return useMutation<
    CreatePasswordResponse,
    Error,
    CreatePasswordPayload
  >({
    mutationFn: (payload) =>
      authService.createPassword(payload),
  });
};

export const useUserPermissions = (userId: string) => {
  return useQuery<UserPermissionListResponse>({
    queryKey: QUERY_KEYS.AUTH.USER_PERMISSIONS(userId),
    queryFn: () => authService.getUserPermissions(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 10,
  });
};