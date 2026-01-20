// src/lib/api/services/subscription.service.ts

import { axiosFetch } from '@/lib/api/axiosFetch'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

import {
  AddSubscriptionPayload,
  DeactivateSubscriptionParams,
  SubscriptionDetailResponse,
  SubscriptionFeatureListResponse,
  SubscriptionListResponse,
  UpdateSubscriptionPayload,
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

  getSubscriptionById: async (suid: string): Promise<SubscriptionDetailResponse> => {
    if (!suid) {
      throw new Error('Subscription ID (suid) is required')
    }

    const response = await axiosFetch.get<SubscriptionDetailResponse>(
      API_ENDPOINTS.SUBSCRIPTION.SUB_DETAIL(suid),
    )

    return response.data
  },

  updateSubscription: async (
    payload: UpdateSubscriptionPayload,
  ): Promise<SubscriptionDetailResponse> => {
    if (!payload?.suid) {
      throw new Error('Subscription ID (suid) is required')
    }

    const response = await axiosFetch.put<SubscriptionDetailResponse>(
      API_ENDPOINTS.SUBSCRIPTION.UPDATE_SUB,
      payload,
    )

    return response.data
  },

  deactivateSubscription: async ({
    suid,
    is_active,
  }: DeactivateSubscriptionParams): Promise<SubscriptionDetailResponse> => {
    if (!suid) {
      throw new Error('Subscription ID (suid) is required')
    }

    const response = await axiosFetch.post<SubscriptionDetailResponse>(
      API_ENDPOINTS.SUBSCRIPTION.DEACTIVATE_SUB(suid),
      null,
      {
        params: {
          is_active,
        },
      },
    )

    return response.data
  },
}
