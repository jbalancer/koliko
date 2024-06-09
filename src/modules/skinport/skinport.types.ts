import { BooleanString } from "@/shared/types/common.types";
import { HttpClientResponse } from "@/shared/types/http-client.types";

export enum SkinportRedisKeys {
  ITEMS = 'skinport_items'
}

export interface SkinportService {
  getList(): SkinportServiceGetListResult
}

export interface SkinportCacheService {
  cacheList(list: SkinportCommonItem[]): Promise<void>
  fetchCachedList(): Promise<SkinportCommonItem[]>
}

export interface SkinportItemsFetchParams {
  app_id?: string
  currency?: string
  tradable?: BooleanString
}

export interface SkinportItem {
  market_hash_name: string
  currency: string
  min_price: number
}

export interface SkinportCommonItem {
  name: string
  currency: string
  minPriceTradable: number
  minPriceNonTradable: number | null
}

export type SkinportServiceGetListResult = Promise<
  SkinportCommonItem[] | HttpClientResponse
>