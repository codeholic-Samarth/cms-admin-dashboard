import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constant/query_keys";

import { authService } from "./profile.api";
import { AuthProfileResponse } from "./profile.type";

export const useAuthProfile = () => {
  return useQuery<AuthProfileResponse>({
    queryKey: QUERY_KEYS.AUTH.PROFILE,
    queryFn: () => authService.getProfile(),
    staleTime: 1000 * 60 * 5,
  });
};
