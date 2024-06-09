import Fastify from 'fastify';
import { globalConfig } from '@/shared/configs';
import { controllersPlugin } from './plugins/controllers.plugin';
import { swaggerPlugin } from './plugins/swagger.plugin';
import { RedisClient } from '@/infra/redis';

export const bootstrap = async () => {
  const app = Fastify();

  await swaggerPlugin(app);

  app.register(controllersPlugin, {
    prefix: globalConfig.apiPrefix
  });

  try {
    await RedisClient.init();

    await app.listen({
      port: globalConfig.appPort
    });

    console.log(
      'Server started successfully:',
      `http://localhost:${globalConfig.appPort}`
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
