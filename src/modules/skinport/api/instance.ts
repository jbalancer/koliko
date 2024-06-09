import { globalConfig } from "@/shared/configs";
import { HttpClientFactoryUtils } from "@/shared/utils";

export const apiSkinportRequest = HttpClientFactoryUtils
  .create(globalConfig.apiBaseUrls.skinport);
