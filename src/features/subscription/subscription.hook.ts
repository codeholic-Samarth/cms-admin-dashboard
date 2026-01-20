// src/hooks/queries/use-subscriptions.ts

import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constant/query_keys";
import { queryClient } from "@/lib/query-client";

import { subscriptionService } from "./subscription.api";
import { AddSubscriptionPayload, DeactivateSubscriptionParams, SubscriptionDetailResponse, SubscriptionFeatureListResponse, SubscriptionListResponse, UpdateSubscriptionPayload, UseSubscriptionListParams } from "./subscription.types";

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

export const useSubscriptionById = (suid: string) => {
  return useQuery<SubscriptionDetailResponse>({
    queryKey: QUERY_KEYS.SUBSCRIPTION.DETAIL(suid),
    queryFn: () => subscriptionService.getSubscriptionById(suid),
    enabled: !!suid,
  });
};

export const useUpdateSubscription = () => {
  return useMutation<SubscriptionDetailResponse, Error, UpdateSubscriptionPayload>({
    mutationFn: (payload) =>
      subscriptionService.updateSubscription(payload),

    onSuccess: (updatedSubscription) => {
      // Invalidate subscription list (table, pagination)
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SUBSCRIPTION.LIST,
        exact: false,
      });

      // Update subscription detail cache
      queryClient.setQueryData(
        QUERY_KEYS.SUBSCRIPTION.DETAIL(updatedSubscription.suid),
        updatedSubscription
      );
    },
  });
};

export const useDeactivateSubscription = () => {
  return useMutation<
    SubscriptionDetailResponse,
    Error,
    DeactivateSubscriptionParams
  >({
    mutationFn: (params) =>
      subscriptionService.deactivateSubscription(params),

    onSuccess: (updatedSubscription) => {
      // Refresh subscription list (tables, pagination)
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SUBSCRIPTION.LIST,
        exact: false,
      });

      // Sync subscription detail cache
      queryClient.setQueryData(
        QUERY_KEYS.SUBSCRIPTION.DETAIL(updatedSubscription.suid),
        updatedSubscription
      );
    },
  });
};
