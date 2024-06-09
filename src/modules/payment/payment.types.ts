import { HttpClientResponse } from "@/shared/types/http-client.types";

export interface PaymentService {
  pay(
    params: PaymentTransactionParams
  ): PaymentPayResult
}

export interface PaymentTransactionParams {
  userId: number
  amount: number
}

export interface PaymentTransactionResult {
  success: boolean
}

export type PaymentPayResult = Promise<
  PaymentTransactionResult | HttpClientResponse
>
