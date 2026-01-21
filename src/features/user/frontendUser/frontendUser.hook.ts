import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constant/query_keys";
import { queryClient } from "@/lib/query-client";

import { frontendUserService } from "./frontendUser.api";
import { FrontendUser, FrontendUserListResponse, FrontendUserUpdatePayload, UseFrontendUsersParams } from "./frontendUser.type";

export const useFrontendUsers = (params: UseFrontendUsersParams) => {
  return useQuery<FrontendUserListResponse>({
    queryKey: [...QUERY_KEYS.FRONTEND_USER.LIST, params],
    queryFn: () => frontendUserService.getAllUsers(params),
    placeholderData: keepPreviousData,
  });
};

export const useFrontendUserById = (userId: string) => {
  return useQuery<FrontendUser>({
    queryKey: QUERY_KEYS.FRONTEND_USER.DETAIL(userId),
    queryFn: () => frontendUserService.getUserById(userId),
    enabled: !!userId,
  });
};

export const useUpdateFrontendUser = () => {
  return useMutation<
    FrontendUser,
    Error,
    FrontendUserUpdatePayload
  >({
    mutationFn: (payload) => frontendUserService.updateUser(payload),

    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FRONTEND_USER.LIST,
        exact: false,
      });

      queryClient.setQueryData(
        QUERY_KEYS.FRONTEND_USER.DETAIL(updatedUser.uuid),
        updatedUser
      );
    },
  });
};