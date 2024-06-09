declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        APP_PORT?: string
        API_SKINPORT_BASE_URL?: string
        REDIS_HOST?: string
        REDIS_PORT?: string
      }
    }
  }
}
