import {
  SkinportCacheService,
  SkinportCommonItem,
  SkinportItem,
  SkinportItemsFetchParams,
  SkinportService,
  SkinportServiceGetListResult
} from "../skinport.types";
import { BooleanString } from "@/shared/types/common.types";
import SkinportClient from "../api/skinport.client";
import SkinportItemMapper from "../mappers/skinport-item.mapper";

export default class SkinportServiceImpl implements SkinportService {

  protected readonly itemsCommonFetchParams:
    SkinportItemsFetchParams = {
      app_id: '730',
      currency: 'EUR'
    };

  constructor(
    private readonly skinportCacheService: SkinportCacheService
  ) {}

  async fetchList(): SkinportServiceGetListResult {
    const [
      tradableResponse,
      nonTradableResponse
    ] = await Promise.all([
      SkinportClient.fetchItems(
        this.getItemsFetchParams(BooleanString.TRUE)
      ),
      SkinportClient.fetchItems(
        this.getItemsFetchParams(BooleanString.FALSE)
      )
    ]);

    const errorMessage = tradableResponse.errorMessage
      || nonTradableResponse.errorMessage;

    if (errorMessage) return { errorMessage };

    return this.mergeLists(
      tradableResponse.data!,
      nonTradableResponse.data!
    );
  }

  findNonTradableItem(
    tradableItem: SkinportItem,
    nonTradableList: SkinportItem[],
    nonTradableItemCandidate?: SkinportItem
  ): SkinportItem | undefined {
    const tradableName = tradableItem.market_hash_name;

    const nonTradableName = nonTradableItemCandidate
      ?.market_hash_name;

    if (nonTradableName !== tradableName) {
      nonTradableItemCandidate = nonTradableList.find(
        ({ market_hash_name }) =>
          market_hash_name === tradableName
      );
    }

    return nonTradableItemCandidate;
  }

  mergeLists(
    tradableList: SkinportItem[],
    nonTradableList: SkinportItem[],
  ): SkinportCommonItem[] {
    return tradableList.map(
      (tradableItem, index) => SkinportItemMapper.toCommonItem(
        tradableItem,
        this.findNonTradableItem(
          tradableItem,
          nonTradableList,
          nonTradableList[index]
        )
      )
    );
  }

  async getList(): SkinportServiceGetListResult {
    const cachedList = await this
      .skinportCacheService
      .fetchCachedList();

    if (cachedList.length) return cachedList;

    const response = await this.fetchList();

    Array.isArray(response)
      && await this.skinportCacheService.cacheList(response);

    return response;
  }

  getItemsFetchParams(
    tradable: BooleanString
  ): SkinportItemsFetchParams {
    return {
      ...this.itemsCommonFetchParams,
      tradable
    }; 
  }

}