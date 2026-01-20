import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constant/query_keys";

import { frontendUserService } from "./frontendUser.api";
import { FrontendUserListResponse, UseFrontendUsersParams } from "./frontendUser.type";

export const useFrontendUsers = (params: UseFrontendUsersParams) => {
  return useQuery<FrontendUserListResponse>({
    queryKey: [...QUERY_KEYS.FRONTEND_USER.LIST, params],
    queryFn: () => frontendUserService.getAllUsers(params),
    placeholderData: keepPreviousData,
  });
};