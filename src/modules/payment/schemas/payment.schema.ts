import { globalConfig } from "@/shared/configs";

export const paymentTransactionSchema = {
  type: 'object',
  properties: {
    userId: {
      type: 'integer'
    },
    amount: {
      type: 'number',
      minimum: globalConfig.amount.min
    }
  },
  required: [
    'userId',
    'amount'
  ]
} as const;