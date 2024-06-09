export const globalConfig = {
  appPort: +(process.env.APP_PORT || 8000),
  apiPrefix: '/api/v1',
  docsPrefix: '/docs',
  apiBaseUrls: {
    skinport: `${process.env.API_SKINPORT_BASE_URL}/v1`
  },
  redisUrl: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  postgres: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.REDIS_HOST,
    database: process.env.POSTGRES_DB,
    port: +(process.env.POSTGRES_PORT || 5432)
  },
  amount: {
    multiplier: 100,
    min: 0.01
  }
} as const;