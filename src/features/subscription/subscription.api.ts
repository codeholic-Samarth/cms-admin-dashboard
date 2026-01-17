// src/lib/api/services/subscription.service.ts

import { axiosFetch } from '@/lib/api/axiosFetch'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

import {
  AddSubscriptionPayload,
  SubscriptionDetailResponse,
  SubscriptionFeatureListResponse,
  SubscriptionListResponse,
  UseSubscriptionListParams,
} from './subscription.types'

export const subscriptionService = {
  getSubscriptions: async (
    params: UseSubscriptionListParams,
  ): Promise<SubscriptionListResponse> => {
    const response = await axiosFetch.get<SubscriptionListResponse>(
      API_ENDPOINTS.SUBSCRIPTION.SUB_LIST,
      {
        params: {
          limit: params.limit ?? 10,
          offset: params.offset ?? 0,
        },
      },
    )

    return response.data
  },

  addSubscription: async (
    payload: AddSubscriptionPayload,
  ): Promise<SubscriptionDetailResponse> => {
    const response = await axiosFetch.post<SubscriptionDetailResponse>(
      API_ENDPOINTS.SUBSCRIPTION.ADD_SUBSCRIPTION,
      payload,
    )

    return response.data
  },

  getFeatures: async (): Promise<SubscriptionFeatureListResponse> => {
    const response = await axiosFetch.get<SubscriptionFeatureListResponse>(
      API_ENDPOINTS.SUBSCRIPTION.FEATURES,
    )

    return response.data
  },
}
