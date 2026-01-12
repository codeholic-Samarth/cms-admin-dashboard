// src/hooks/queries/use-backend-users.ts

import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constant/query_keys";

import { backendUserService } from "./backendUser.api";
import { BackendUserListResponse, UseBackendUsersParams } from "./backendUser.types";


export const useBackendUsers = (params: UseBackendUsersParams) => {
  return useQuery<BackendUserListResponse>({
    queryKey: [...QUERY_KEYS.BACKEND_USER.LIST, params],
    queryFn: () => backendUserService.getAllUsers(params),
    placeholderData: keepPreviousData,
  });
};
