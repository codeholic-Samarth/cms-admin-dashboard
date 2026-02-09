// src/hooks/queries/use-tax-models.ts

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/constant/query_keys"

import { taxService } from "./tax.api"
import { TaxModelListResponse, UseTaxModelsParams } from "./tax.type"


export const useTaxModels = (params: UseTaxModelsParams) => {
  return useQuery<TaxModelListResponse>({
    queryKey: [...QUERY_KEYS.TAX.LIST, params],
    queryFn: () => taxService.getAll(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10,
  })
}
