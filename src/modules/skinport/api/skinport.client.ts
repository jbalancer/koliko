import { SkinportItem, SkinportItemsFetchParams } from "../skinport.types";
import { apiSkinportRequest } from "./instance";
import { HttpClientResponse } from "@/shared/types/http-client.types";

export default class SkinportClient {

  static async fetchItems(
    query: SkinportItemsFetchParams
  ): Promise<HttpClientResponse<SkinportItem[]>> {
    return apiSkinportRequest('items', { query });
  }

}