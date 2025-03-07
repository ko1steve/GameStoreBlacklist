import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/component-config';
import { ComponentController } from './../../../core/component-controller';
import { HumbleBundleMainPageConfig } from './config/main-page';
import { HumbleBundleProductConfig } from './config/product';
import { HumbleBundlePromoConfig } from './config/promo';
import { HumbleBundleSearchConfig } from './config/search';
import { HumbleBundleMainPageController } from './controller/main-page';
import { HumbleBundleProductController } from './controller/product';
import { HumbleBundlePromoController } from './controller/promo';
import { HumbleBundleSearchController } from './controller/search';

export enum ControllerType {
  MAIN_PAGE = 'MAIN_PAGE',
  PRODUCT = 'PRODUCT',
  PROMO = 'PROMO',
  SEARCH = 'SEARCH'
}

export const UrlTypeMap = new TSMap<RegExp, ControllerType>([
  [
    /^https:\/\/www\.humblebundle\.com\/$/, ControllerType.MAIN_PAGE
  ],
  [
    /^https:\/\/www\.humblebundle\.com\/store\/(?!search(\?.*)?$|promo\/|c\/).+$/, ControllerType.PRODUCT
  ],
  [
    /^https:\/\/www\.humblebundle\.com\/store\/promo\/.*$/, ControllerType.PROMO
  ],
  [
    /^https:\/\/www\.humblebundle\.com\/store\/search(\?.*)?$/, ControllerType.SEARCH
  ],
  [
    /^https:\/\/www\.humblebundle\.com\/store\/c\/.+$/, ControllerType.SEARCH
  ]
]);

export const ConfigClassMap = new TSMap<string, new () => ComponentConfig>([
  [
    ControllerType.MAIN_PAGE, HumbleBundleMainPageConfig
  ],
  [
    ControllerType.PRODUCT, HumbleBundleProductConfig
  ],
  [
    ControllerType.PROMO, HumbleBundlePromoConfig
  ],
  [
    ControllerType.SEARCH, HumbleBundleSearchConfig
  ]
]);

export const ControllerClassMap = new TSMap<string, new (componentConfig: ComponentConfig) => ComponentController>([
  [
    ControllerType.MAIN_PAGE, HumbleBundleMainPageController
  ],
  [
    ControllerType.PRODUCT, HumbleBundleProductController
  ],
  [
    ControllerType.PROMO, HumbleBundlePromoController
  ],
  [
    ControllerType.SEARCH, HumbleBundleSearchController
  ]
]);
