import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/component/component-config';
import { WebObserverConfig } from '../../../core/web-observer/web-observer-config';
import { TwoGameMainPageConfig } from './config/main-page';
import { TwoGameSearchConfig } from './config/search';
import { TwoGamePoductConfig } from './config/product';

export enum ControllerType {
  MAIN_PAGE = 'MAIN_PAGE',
  SEARCH = 'SEARCH',
  PRODUCT = 'PRODUCT'
}

export class TwoGameWebObserverConfig extends WebObserverConfig {
  public urlTypeMap = new TSMap<RegExp, ControllerType>([
    [
      /^https:\/\/2game\.com\/$/, ControllerType.MAIN_PAGE
    ],
    [
      /^https:\/\/2game\.com\/((en|zh)\/)?bestsellers$/, ControllerType.SEARCH
    ],
    [
      /^https:\/\/2game\.com\/((en|zh)\/)?coming-soon$/, ControllerType.SEARCH
    ],
    [
      /^https:\/\/2game\.com\/((en|zh)\/)?new-in$/, ControllerType.SEARCH
    ],
    [
      /^https:\/\/2game\.com\/((en|zh)\/)?search\/.+$/, ControllerType.SEARCH
    ],
    [
      /^https:\/\/2game\.com\/(?!en\/|zh\/)(.+[^/])$/, ControllerType.PRODUCT
    ]
  ]);

  public configClassMap = new TSMap<string, new() => ComponentConfig>([
    [
      ControllerType.MAIN_PAGE, TwoGameMainPageConfig
    ],
    [
      ControllerType.SEARCH, TwoGameSearchConfig
    ],
    [
      ControllerType.PRODUCT, TwoGamePoductConfig
    ]
  ]);
}
