import {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyPluginOptions
} from "fastify";
import { registerSkinportController } from '@/modules/skinport';
import { registerPaymentController } from "@/modules/payment";

const controllerRegistrars: FastifyPluginCallback[] = [
  registerSkinportController,
  registerPaymentController
];

export const controllersPlugin = (
  app: FastifyInstance,
  options: FastifyPluginOptions,
  done: (err?: Error) => void
) => {
  controllerRegistrars.forEach(
    callback => callback(app, options, done)
  );

  done();
};