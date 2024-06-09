import { SkinportCommonItem, SkinportItem } from "../skinport.types";

export default class SkinportItemMapper {

  static toCommonItem(
    tradableItem: SkinportItem,
    nonTradableItem?: SkinportItem
  ): SkinportCommonItem {
    return {
      name: tradableItem.market_hash_name,
      currency: tradableItem.currency,
      minPriceNonTradable: nonTradableItem?.min_price || null,
      minPriceTradable: tradableItem.min_price
    };
  }

}