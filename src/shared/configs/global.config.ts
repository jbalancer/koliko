export const globalConfig = {
  appPort: +(process.env.APP_PORT || 8000),
  apiPrefix: '/api/v1',
  docsPrefix: '/docs',
  apiBaseUrls: {
    skinport: `${process.env.API_SKINPORT_BASE_URL}/v1`
  },
  redisUrl: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
} as const;