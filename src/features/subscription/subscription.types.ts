export type SubscriptionCreator = {
  uuid: string
  username: string
  email: string
}

export type SubscriptionFeature = {
  quantity: number
  feature: FeatureDefinition
}

export type FeatureDefinition = {
  feature_type: string
  feature_code: string
}

export type SubscriptionDetailResponse = {
  suid: string
  title: string
  description: string

  price_inr: number
  sale_price_inr: number

  price_usd: number
  sale_price_usd: number

  price_pond: number
  sale_price_pond: number

  price_euro: number
  sale_price_euro: number

  validity: number

  creator: SubscriptionCreator

  is_deleted: boolean
  is_active: boolean

  created_at: string
  features: SubscriptionFeature[]
}

export interface SubscriptionListResponse {
  total: number;
  subscriptions: SubscriptionDetailResponse[];
}

export interface UseSubscriptionListParams {
  limit?: number;
  offset?: number;
}

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP'

export type AddSubscriptionFeature = {
  quantity: number
  feature_code: string
}

export type AddSubscriptionPayload = {
  title: string
  description: string

  price_inr: number
  sale_price_inr: number

  price_usd: number
  sale_price_usd: number

  price_pond: number
  sale_price_pond: number

  price_euro: number
  sale_price_euro: number

  validity: number

  features: AddSubscriptionFeature[]
}

export interface SubscriptionFeatureMaster {
  feature_type: string;
  feature_code: string;
}

export type SubscriptionFeatureListResponse = SubscriptionFeatureMaster[];
