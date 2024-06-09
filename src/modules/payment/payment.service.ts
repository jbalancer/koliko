import {
  PaymentService,
  PaymentTransactionParams,
  PaymentTransactionResult
} from "./payment.types";

export default class PaymentServiceImpl implements PaymentService {

  async pay(
    params: PaymentTransactionParams
  ): Promise<PaymentTransactionResult> {
    console.log(params);

    return {
      success: true
    };
  }

}