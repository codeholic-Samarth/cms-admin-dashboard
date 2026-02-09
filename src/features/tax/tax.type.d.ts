export interface TaxModelCreator {
  uuid: string
  username: string
  email: string
}

export interface TaxModel {
  taxuid: string
  title: string
  creator: TaxModelCreator
  is_active: boolean
  is_deleted: boolean
  created_at: string
  updated_at: string
}

export interface TaxModelListResponse {
  total: number
  tax_models: TaxModel[]
}

export interface UseTaxModelsParams {
  limit?: number
  offset?: number
}
