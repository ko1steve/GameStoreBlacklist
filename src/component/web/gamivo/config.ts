import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/component/component-config';
import { ComponentController } from './../../../core/component/component-controller';
import { GamivoMainPageConfig } from './config/main-page';
import { GamivoProductConfig } from './config/product';
import { GamivoSearchConfig } from './config/search';
import { GamivoMainPageController } from './controller/main-page';
import { GamivoProductController } from './controller/product';
import { GamivoSearchController } from './controller/search';
import { WebObserverConfig } from '../../../core/web-observer/web-observer-config';

export enum ControllerType {
  MAIN_PAGE = 'MAIN_PAGE',
  PRODUCT = 'PRODUCT',
  SEARCH = 'SEARCH'
}

export class GamivoWebObserverConfig extends WebObserverConfig {
  public urlTypeMap = new TSMap<RegExp, ControllerType>([
    [
      /^https:\/\/www\.gamivo\.com\/(fr|pl|de|es|it)?$/, ControllerType.MAIN_PAGE
    ],
    [
      /^https:\/\/www\.gamivo\.com(\/.+)?\/product\/.+$/, ControllerType.PRODUCT
    ],
    [
      /^https:\/\/www\.gamivo\.com(\/.+)?\/store\/games\/.+$/, ControllerType.SEARCH
    ],
    [
      /^https:\/\/www\.gamivo\.com(\/.+)?\/search.+$/, ControllerType.SEARCH
    ]
  ]);

  public configClassMap = new TSMap<string, new() => ComponentConfig>([
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

  public controllerClassMap = new TSMap<string, new(componentConfig: ComponentConfig) => ComponentController>([
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
}
