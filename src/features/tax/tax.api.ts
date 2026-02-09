import { axiosFetch } from '@/lib/api/axiosFetch'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

import { TaxModelListResponse, UseTaxModelsParams } from './tax.type'

export const taxService = {
  getAll: async (
    params: UseTaxModelsParams
  ): Promise<TaxModelListResponse> => {
    const response = await axiosFetch.get<TaxModelListResponse>(
      API_ENDPOINTS.TAX.GET_ALL,
      {
        params: {
          limit: params.limit ?? 10,
          offset: params.offset ?? 0,
        },
      }
    )

    return response.data
  },
}
