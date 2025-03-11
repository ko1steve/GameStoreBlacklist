import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/component/component-config';
import { ComponentController } from './../../../core/component/component-controller';
import { YuplayMainPageConfig } from './config/main-page';
import { YuplayProductConfig } from './config/product';
import { YuplaySearchConfig } from './config/search';
import { YuplayMainPageController } from './controller/main-page';
import { YuplayProductController } from './controller/product';
import { YuplaySearchController } from './controller/search';

export enum ControllerType {
  MAIN_PAGE = 'MAIN_PAGE',
  PRODUCT = 'PRODUCT',
  SEARCH = 'SEARCH'
}

export const UrlTypeMap = new TSMap<RegExp, ControllerType>([
  [
    /^https:\/\/www\.yuplay\.com\/$/, ControllerType.MAIN_PAGE
  ],
  [
    /^https:\/\/www\.yuplay\.com\/product\/.*$/, ControllerType.PRODUCT
  ],
  [
    /^https:\/\/www\.yuplay\.com\/products\/.*$/, ControllerType.SEARCH
  ]
]);

export const ConfigClassMap = new TSMap<string, new() => ComponentConfig>([
  [
    ControllerType.MAIN_PAGE, YuplayMainPageConfig
  ],
  [
    ControllerType.PRODUCT, YuplayProductConfig
  ],
  [
    ControllerType.SEARCH, YuplaySearchConfig
  ]
]);

export const ControllerClassMap = new TSMap<string, new(componentConfig: ComponentConfig) => ComponentController>([
  [
    ControllerType.MAIN_PAGE, YuplayMainPageController
  ],
  [
    ControllerType.PRODUCT, YuplayProductController
  ],
  [
    ControllerType.SEARCH, YuplaySearchController
  ]
]);
