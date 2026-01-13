// src/hooks/queries/use-backend-users.ts

import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constant/query_keys";
import { queryClient } from "@/lib/query-client";

import { backendUserService } from "./backendUser.api";
import { BackendUser, BackendUserCreatePayload, BackendUserListResponse, UseBackendUsersParams } from "./backendUser.types";


export const useBackendUsers = (params: UseBackendUsersParams) => {
  return useQuery<BackendUserListResponse>({
    queryKey: [...QUERY_KEYS.BACKEND_USER.LIST, params],
    queryFn: () => backendUserService.getAllUsers(params),
    placeholderData: keepPreviousData,
  });
};

export const useCreateBackendUser = () => {
  return useMutation<BackendUser, Error, BackendUserCreatePayload>({
    mutationFn: (payload) => backendUserService.addUser(payload),

    onSuccess: () => {
      // Invalidate backend user list
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BACKEND_USER.LIST,
        exact: false,
      });
    },
  });
};
