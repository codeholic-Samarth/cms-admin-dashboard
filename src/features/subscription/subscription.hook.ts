// src/hooks/queries/use-subscriptions.ts

import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constant/query_keys";

import { subscriptionService } from "./subscription.api";
import { SubscriptionListResponse, UseSubscriptionListParams } from "./subscription.types";

export const useSubscriptions = (params: UseSubscriptionListParams) => {
  return useQuery<SubscriptionListResponse>({
    queryKey: [...QUERY_KEYS.SUBSCRIPTION.LIST, params],
    queryFn: () => subscriptionService.getSubscriptions(params),
    placeholderData: keepPreviousData,
  });
};
