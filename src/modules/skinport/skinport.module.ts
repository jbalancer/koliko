import { FastifyInstance } from "fastify";
import SkinportController from "./skinport.controller";
import SkinportServiceImpl from "./services/skinport.service";
import SkinportCacheServiceImpl from "./services/skinport-cache.service";

const skinportController = new SkinportController(
  new SkinportServiceImpl(
    new SkinportCacheServiceImpl()
  )
);

export const registerSkinportController = (
  app: FastifyInstance
) => {
  app.get(
    '/skinport/list',
    skinportController.getList.bind(skinportController)
  );
};
