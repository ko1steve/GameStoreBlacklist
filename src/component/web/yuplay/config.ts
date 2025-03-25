import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/component/component-config';
import { ComponentController } from './../../../core/component/component-controller';
import { YuplayMainPageConfig } from './config/main-page';
import { YuplayProductConfig } from './config/product';
import { YuplaySearchConfig } from './config/search';
import { WebObserverConfig } from '../../../core/web-observer/web-observer-config';

export enum ControllerType {
  MAIN_PAGE = 'MAIN_PAGE',
  PRODUCT = 'PRODUCT',
  SEARCH = 'SEARCH'
}

export class YuplayWebObserverConfig extends WebObserverConfig {
  public urlTypeMap = new TSMap<RegExp, ControllerType>([
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

  public configClassMap = new TSMap<string, new() => ComponentConfig>([
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
}
