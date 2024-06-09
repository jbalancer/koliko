import { SkinportService, SkinportServiceGetListResult } from "./skinport.types";

export default class SkinportController {

  constructor(
    private readonly skinportService: SkinportService
  ) {}

  async getList(): SkinportServiceGetListResult {
    return this.skinportService.getList();
  }

}