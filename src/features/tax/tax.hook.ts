// src/hooks/queries/use-tax-models.ts

import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/constant/query_keys"
import { queryClient } from "@/lib/query-client"

import { taxService } from "./tax.api"
import { CreateTaxModelPayload, TaxModelDetail, TaxModelListResponse, UseTaxModelsParams } from "./tax.type"


export const useTaxModels = (params: UseTaxModelsParams) => {
  return useQuery<TaxModelListResponse>({
    queryKey: [...QUERY_KEYS.TAX.LIST, params],
    queryFn: () => taxService.getAll(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10,
  })
}

export const useTaxModelById = (taxId: string) => {
  return useQuery<TaxModelDetail>({
    queryKey: QUERY_KEYS.TAX.DETAIL(taxId),
    queryFn: () => taxService.getById(taxId),
    enabled: !!taxId,
  })
}

export const useCreateTaxModel = () => {
  return useMutation<
    TaxModelDetail,
    Error,
    CreateTaxModelPayload
  >({
    mutationFn: (payload) => taxService.create(payload),

    onSuccess: (createdTaxModel) => {
      // Invalidate tax models list
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.TAX.LIST,
        exact: false,
      })

      // Prime tax model detail cache
      queryClient.setQueryData(
        QUERY_KEYS.TAX.DETAIL(createdTaxModel.taxuid),
        createdTaxModel
      )
    },
  })
}
