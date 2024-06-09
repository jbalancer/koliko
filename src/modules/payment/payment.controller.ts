import { FastifyRequest } from "fastify";
import {
  PaymentPayResult,
  PaymentService,
  PaymentTransactionParams
} from "./payment.types";

export default class PaymentController {

  constructor(
    private readonly paymentService: PaymentService
  ) {}

  async postPay(
    request: FastifyRequest<{
      Body: PaymentTransactionParams
    }>
  ): PaymentPayResult {
    return this.paymentService.pay(request.body);
  }

}