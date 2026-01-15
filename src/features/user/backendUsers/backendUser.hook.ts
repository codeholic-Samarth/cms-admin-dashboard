// src/hooks/queries/use-backend-users.ts

import { useQuery, keepPreviousData, useMutation, UseQueryOptions } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constant/query_keys";
import { queryClient } from "@/lib/query-client";

import { backendUserService } from "./backendUser.api";
import { BackendUserUpdatePayload } from "./backendUser.schema";
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

export const useBackendUserById = (
  userId: string,
  options?: Omit<
    UseQueryOptions<BackendUser>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<BackendUser>({
    queryKey: QUERY_KEYS.BACKEND_USER.DETAIL(userId),
    queryFn: () => backendUserService.getUserById(userId),
    enabled: !!userId,
    ...options,
  })
}

export const useUpdateBackendUser = () => {
  return useMutation<BackendUser, Error, BackendUserUpdatePayload>({
    mutationFn: (payload) => backendUserService.updateUser(payload),

    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BACKEND_USER.LIST,
        exact: false,
      });

      queryClient.setQueryData(
        QUERY_KEYS.BACKEND_USER.DETAIL(updatedUser.uuid),
        updatedUser
      );
    },
  });
};
