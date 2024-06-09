import { FastifyRequest } from "fastify";
import {
  PaymentService,
  PaymentTransactionParams,
  PaymentTransactionResult
} from "./payment.types";

export default class PaymentController {

  constructor(
    private readonly paymentService: PaymentService
  ) {}

  async postPay(
    request: FastifyRequest<{
      Body: PaymentTransactionParams
    }>
  ): Promise<PaymentTransactionResult> {
    return this.paymentService.pay(request.body);
  }

}