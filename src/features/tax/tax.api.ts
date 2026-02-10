import { axiosFetch } from '@/lib/api/axiosFetch'
import { API_ENDPOINTS } from '@/lib/api/endpoints'

import {
  AddTaxFieldPayload,
  AddTaxRegionPayload,
  CreateTaxModelPayload,
  TaxModelDetail,
  TaxModelListResponse,
  UseTaxModelsParams,
} from './tax.type'

export const taxService = {
  getAll: async (params: UseTaxModelsParams): Promise<TaxModelListResponse> => {
    const response = await axiosFetch.get<TaxModelListResponse>(
      API_ENDPOINTS.TAX.GET_ALL,
      {
        params: {
          limit: params.limit ?? 10,
          offset: params.offset ?? 0,
        },
      },
    )

    return response.data
  },

  getById: async (taxId: string): Promise<TaxModelDetail> => {
    if (!taxId) {
      throw new Error('Tax ID is required')
    }

    const response = await axiosFetch.get<TaxModelDetail>(API_ENDPOINTS.TAX.DETAIL(taxId))

    return response.data
  },

  create: async (payload: CreateTaxModelPayload): Promise<TaxModelDetail> => {
    if (!payload?.title) {
      throw new Error('Tax model title is required')
    }

    const response = await axiosFetch.post<TaxModelDetail>(
      API_ENDPOINTS.TAX.CREATE_TAX_MODAL,
      payload,
    )

    return response.data
  },

  addRegion: async (payload: AddTaxRegionPayload): Promise<TaxModelDetail> => {
    if (!payload?.tax_id) {
      throw new Error('Tax ID is required')
    }

    const response = await axiosFetch.post<TaxModelDetail>(
      API_ENDPOINTS.TAX.ADD_REGION,
      payload,
    )

    return response.data
  },

  addField: async (
    payload: AddTaxFieldPayload
  ): Promise<TaxModelDetail> => {
    if (!payload?.tax_id) {
      throw new Error("Tax ID is required")
    }

    const response = await axiosFetch.post<TaxModelDetail>(
      API_ENDPOINTS.TAX.ADD_FIELDS,
      payload
    )

    return response.data
  },
}
