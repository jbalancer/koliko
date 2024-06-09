export interface HttpClientResponse<T = unknown> {
  data?: T
  errorMessage?: string
}