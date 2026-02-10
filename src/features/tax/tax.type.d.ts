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

export interface TaxRegion {
  txruid: string
  country: string
  state: string
}

export interface TaxField {
  txfuid: string
  title: string
  value: number
  value_type: number
}

export interface TaxModelDetail {
  taxuid: string
  title: string
  creator: {
    uuid: string
    username: string
    email: string
  }
  is_active: boolean
  is_deleted: boolean
  regions: TaxRegion[]
  fields: TaxField[]
  created_at: string
  updated_at: string
}

export interface CreateTaxRegionPayload {
  country: string
  state: string
}

export interface CreateTaxFieldPayload {
  title: string
  value: number
  value_type: number
}

export interface CreateTaxModelPayload {
  title: string
  regions: CreateTaxRegionPayload[]
  fields: CreateTaxFieldPayload[]
}

export interface AddTaxRegionPayload {
  tax_id: string
  country: string
  state: string
}

export interface AddTaxFieldPayload {
  tax_id: string
  title: string
  value: number
  value_type: number
}
