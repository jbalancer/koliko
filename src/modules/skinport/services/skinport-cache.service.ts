import { RedisClient } from "@/infra/redis";
import { SkinportCommonItem, SkinportItem, SkinportRedisKeys } from "../skinport.types";
import { skinportConfig } from "../skinport.config";

export default class SkinportCacheServiceImpl {

  async cacheList(list: SkinportCommonItem[]) {
    await RedisClient.set(
      SkinportRedisKeys.ITEMS,
      JSON.stringify(list),
      {
        EX: skinportConfig.itemsCacheExpiryInSeconds
      }
    );
  }

  async fetchCachedList(): Promise<SkinportCommonItem[]> {
    try {
      const list = await RedisClient
        .get(SkinportRedisKeys.ITEMS);

      return list ? JSON.parse(list) : [];
    } catch {
      // TODO Handle error
    }

    return [];
  }

}