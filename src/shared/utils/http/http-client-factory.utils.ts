import { HttpClientResponse } from "@/shared/types/http-client.types";
import { request } from "undici";
import { HttpCodeUtils } from "./http-code.utils";

export class HttpClientFactoryUtils {

  static async handleRequest<T>(
    path: string,
    options: Parameters<typeof request>[1]
  ): Promise<HttpClientResponse<T>> {
    try {
      const {
        body,
        statusCode
      } = await request(path, options);

      if (HttpCodeUtils.checkIsSuccessCode(statusCode)) {
        return {
          // TODO Check Content-Type from response header
          data: await body.json() as T
        };
      }
    } catch {
      // TODO Handle exception
    }

    return {
      errorMessage: 'Request failed'
    };
  }

  static create(baseUrl: string) {
    return async <T>(
      path: string,
      options: Parameters<typeof request>[1]
    ): Promise<HttpClientResponse<T>> => HttpClientFactoryUtils
      .handleRequest<T>(`${baseUrl}/${path}`, options);
  }

}