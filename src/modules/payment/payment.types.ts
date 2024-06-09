export interface PaymentService {
  pay(
    params: PaymentTransactionParams
  ): Promise<PaymentTransactionResult>
}

export interface PaymentTransactionParams {
  userId: number
  amount: number
}

export interface PaymentTransactionResult {
  success: boolean
}