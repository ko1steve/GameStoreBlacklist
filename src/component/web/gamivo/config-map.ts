import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/component-config';
import { ComponentController } from './../../../core/component-controller';
import { GamivoMainPageConfig } from './config/main-page';
import { GamivoProductConfig } from './config/product';
import { GamivoSearchConfig } from './config/search';
import { GamivoMainPageController } from './controller/main-page';
import { GamivoProductController } from './controller/product';
import { GamivoSearchController } from './controller/search';

export enum ControllerType {
  MAIN_PAGE = 'MAIN_PAGE',
  PRODUCT = 'PRODUCT',
  SEARCH = 'SEARCH'
}

export const UrlTypeMap = new TSMap<string, ControllerType>([
  [
    'https://www.gamivo.com/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.gamivo.com/fr/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.gamivo.com/pl/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.gamivo.com/de/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.gamivo.com/es/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.gamivo.com/it/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.gamivo.com/product/*', ControllerType.PRODUCT
  ],
  [
    'https://www.gamivo.com/*/product/*', ControllerType.PRODUCT
  ],
  [
    'https://www.gamivo.com/store/games/*', ControllerType.SEARCH
  ],
  [
    'https://www.gamivo.com/*/store/games/*', ControllerType.SEARCH
  ],
  [
    'https://www.gamivo.com/search*', ControllerType.SEARCH
  ],
  [
    'https://www.gamivo.com/*/search*', ControllerType.SEARCH
  ]
]);

export const ConfigClassMap = new TSMap<string, new () => ComponentConfig>([
  [
    ControllerType.MAIN_PAGE, GamivoMainPageConfig
  ],
  [
    ControllerType.PRODUCT, GamivoProductConfig
  ],
  [
    ControllerType.SEARCH, GamivoSearchConfig
  ]
]);

export const ControllerClassMap = new TSMap<string, new (componentConfig: ComponentConfig) => ComponentController>([
  [
    ControllerType.MAIN_PAGE, GamivoMainPageController
  ],
  [
    ControllerType.PRODUCT, GamivoProductController
  ],
  [
    ControllerType.SEARCH, GamivoSearchController
  ]
]);
