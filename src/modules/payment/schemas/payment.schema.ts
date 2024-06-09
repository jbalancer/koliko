export const paymentTransactionSchema = {
  type: 'object',
  properties: {
    userId: {
      type: 'integer'
    },
    amount: {
      type: 'integer'
    }
  },
  required: [
    'userId',
    'amount'
  ]
} as const;