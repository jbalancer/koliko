import { globalConfig } from "@/shared/configs";

export class AmountUtils {

  static toAmount(value: number): number {
    return Math.floor(
      value * globalConfig.amount.multiplier
    );
  }

  static toValidAmountOrFail(amount: number): number {
    if (amount < globalConfig.amount.min) {
      throw new Error(
        `Value(${amount}) is less than expected. ` +
          `Minimum: ${globalConfig.amount.min}`
      );
    }

    return AmountUtils.toAmount(amount);
  }

}