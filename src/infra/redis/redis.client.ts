import { globalConfig } from "@/shared/configs";
import { createClient, SetOptions } from "redis";

export class RedisClient {

  protected static client = createClient({
    url: globalConfig.redisUrl
  });

  static initListeners() {
    RedisClient
      .client
      .on('error', err => console.error('Redis Client Error', err));
  }

  static async init() {
    RedisClient.initListeners();
    await RedisClient.client.connect();
  }

  static async get(key: string) {
    return RedisClient.client.get(key);
  }

  static async set(
    key: string,
    value: string,
    options?: SetOptions
  ) {
    await RedisClient.client.set(key, value, options);
  }

}
