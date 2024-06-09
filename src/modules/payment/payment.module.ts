import { FastifyInstance } from "fastify";
import PaymentController from "./payment.controller";
import PaymentServiceImpl from "./payment.service";
import { paymentTransactionSchema } from "./schemas/payment.schema";

const paymentController = new PaymentController(
  new PaymentServiceImpl()
);

export const registerPaymentController = (
  app: FastifyInstance
) => {
  app.post('/payment/transaction', {
    schema: {
      body: paymentTransactionSchema
    },
    handler: paymentController.postPay.bind(paymentController)
  });
};