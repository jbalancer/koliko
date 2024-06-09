import { StatusCodes } from "http-status-codes";

export class HttpCodeUtils {

  static checkIsSuccessCode(
    code: number
  ): boolean {
    return StatusCodes.OK <= code
      && StatusCodes.MULTIPLE_CHOICES > code;
  }

}