// src/lib/api/services/subscription.service.ts

import { axiosFetch } from "@/lib/api/axiosFetch";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

import { SubscriptionListResponse, UseSubscriptionListParams } from "./subscription.types";

export const subscriptionService = {
  getSubscriptions: async (
    params: UseSubscriptionListParams
  ): Promise<SubscriptionListResponse> => {
    const response = await axiosFetch.get<SubscriptionListResponse>(
      API_ENDPOINTS.SUBSCRIPTION.SUB_LIST,
      {
        params: {
          limit: params.limit ?? 10,
          offset: params.offset ?? 0,
        },
      }
    );

    return response.data;
  },
};
