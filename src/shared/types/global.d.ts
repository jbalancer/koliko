declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        APP_PORT?: string
        API_SKINPORT_BASE_URL?: string
        REDIS_HOST?: string
        REDIS_PORT?: string
        POSTGRES_USER?: string
        POSTGRES_PASSWORD?: string
        POSTGRES_HOST?: string
        POSTGRES_DB?: string
        POSTGRES_PORT?: string
      }
    }
  }
}
