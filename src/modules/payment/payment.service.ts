import { AmountUtils } from "@/shared/utils";
import {
  PaymentPayResult,
  PaymentService,
  PaymentTransactionParams
} from "./payment.types";
import { DBClient } from "@/infra/db";
import { usersTableSQL } from "./db/users.sql";
import { DBQuery } from "@/shared/types/db.types";

export default class PaymentServiceImpl implements PaymentService {

  protected async getUserBalance(
    userId: number,
    query: DBQuery
  ): Promise<number> {
    const { rows } = await query(
      usersTableSQL.getUserBalance, [ userId ]
    );

    return +(rows[0]?.balance || 0);
  }

  protected async setUserBalance(
    { amount, userId }: PaymentTransactionParams,
    query: DBQuery
  ) {
    await query(
      usersTableSQL.updateUserBalance, [ userId, amount ]
    );
  }

  async decreaseUserBalanceOrFail(
    params: PaymentTransactionParams
  ) {
    const amount = AmountUtils.toValidAmountOrFail(params.amount);

    await DBClient.transaction(
      async query => {
        const balance = await this.getUserBalance(
          params.userId, query
        );

        const newBalance = balance - amount;

        if (newBalance < 0) {
          // TODO Replace text to codes and user custom Exception
          throw new Error('Insufficient funds');
        }

        await this.setUserBalance(
          {
            userId: params.userId,
            amount: newBalance
          },
          query
        );
      }
    );
  }

  async pay(
    params: PaymentTransactionParams
  ): PaymentPayResult {
    try {
      await this.decreaseUserBalanceOrFail(params);
    } catch (error) {
      const typedError = error as Error;

      return {
        errorMessage: typedError.message
      };
    }

    return { success: true };
  }

}