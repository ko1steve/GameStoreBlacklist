import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/component/component-config';
import { ComponentController } from './../../../core/component/component-controller';
import { GamesplanetSearchConfig } from './config/search';
import { GamesplanetSearchController } from './controller/search';
import { WebObserverConfig } from '../../../core/web-observer/web-observer-config';
import { GamesplanetMainPageConfig } from './config/main-page';
import { GamesplanetMainPageController } from './controller/main-page';

export enum ControllerType {
  MAIN_PAGE = 'MAIN_PAGE',
  SEARCH = 'SEARCH'
}

export class GamesplanetWebObserverConfig extends WebObserverConfig {
  public urlTypeMap = new TSMap<RegExp, ControllerType>([
    [
      /^https:\/\/.+\.gamesplanet\.com\/$/, ControllerType.MAIN_PAGE
    ],
    [
      /^https:\/\/.+\.gamesplanet\.com\/search\?.*$/, ControllerType.SEARCH
    ]
  ]);

  public configClassMap = new TSMap<string, new() => ComponentConfig>([
    [
      ControllerType.MAIN_PAGE, GamesplanetMainPageConfig
    ],
    [
      ControllerType.SEARCH, GamesplanetSearchConfig
    ]
  ]);

  public controllerClassMap = new TSMap<string, new(componentConfig: ComponentConfig) => ComponentController>([
    [
      ControllerType.MAIN_PAGE, GamesplanetMainPageController
    ],
    [
      ControllerType.SEARCH, GamesplanetSearchController
    ]
  ]);
}
