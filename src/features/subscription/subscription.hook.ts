// src/hooks/queries/use-subscriptions.ts

import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constant/query_keys";
import { queryClient } from "@/lib/query-client";

import { subscriptionService } from "./subscription.api";
import { AddSubscriptionPayload, SubscriptionDetailResponse, SubscriptionFeatureListResponse, SubscriptionListResponse, UseSubscriptionListParams } from "./subscription.types";

export const useSubscriptions = (params: UseSubscriptionListParams) => {
  return useQuery<SubscriptionListResponse>({
    queryKey: [...QUERY_KEYS.SUBSCRIPTION.LIST, params],
    queryFn: () => subscriptionService.getSubscriptions(params),
    placeholderData: keepPreviousData,
  });
};

export const useCreateSubscription = () => {
  return useMutation<SubscriptionDetailResponse, Error, AddSubscriptionPayload>({
    mutationFn: (payload) => subscriptionService.addSubscription(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SUBSCRIPTION.LIST,
        exact: false,
      });
    },
  });
};

export const useSubscriptionFeatures = () => {
  return useQuery<SubscriptionFeatureListResponse>({
    queryKey: QUERY_KEYS.SUBSCRIPTION.FEATURES,
    queryFn: () => subscriptionService.getFeatures(),
    staleTime: 1000 * 60 * 30,
  });
};
