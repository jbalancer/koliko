import fastifySwagger from "@fastify/swagger";
import { FastifyInstance } from "fastify";
import packageInfo from '../../../package.json';
import fastifySwaggerUi from "@fastify/swagger-ui";
import { globalConfig } from "@/shared/configs";

export const swaggerPlugin = async (app: FastifyInstance) => {
  await app.register(fastifySwagger, {
    swagger: {
      info: {
        title: packageInfo.name,
        description: packageInfo.description,
        version: packageInfo.version
      }
    }
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: globalConfig.docsPrefix,
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    },
    staticCSP: true,
    transformSpecificationClone: true
  });
};