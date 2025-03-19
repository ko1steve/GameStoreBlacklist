import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/component/component-config';
import { ComponentController } from './../../../core/component/component-controller';
import { WebObserverConfig } from '../../../core/web-observer/web-observer-config';
import { GamesplanetMainPageConfig } from './config/main-page';
import { GamesplanetSearchConfig } from './config/search';
import { GamesplanetOffersConfig } from './config/offers';
import { GamesplanetChartsConfig } from './config/charts';
import { GamesplanetMainPageController } from './controller/main-page';
import { GamesplanetSearchController } from './controller/search';
import { GamesplanetOffersController } from './controller/offers';
import { GamesplanetChartsController } from './controller/charts';

export enum ControllerType {
  MAIN_PAGE = 'MAIN_PAGE',
  SEARCH = 'SEARCH',
  OFFERS = 'OFFERS',
  CHART = 'CHART'
}

export class GamesplanetWebObserverConfig extends WebObserverConfig {
  public urlTypeMap = new TSMap<RegExp, ControllerType>([
    [
      /^https:\/\/.+\.gamesplanet\.com\/$/, ControllerType.MAIN_PAGE
    ],
    [
      /^https:\/\/.+\.gamesplanet\.com\/search\?.*$/, ControllerType.SEARCH
    ],
    [
      /^https:\/\/.+\.gamesplanet\.com\/games\/offers$/, ControllerType.OFFERS
    ],
    [
      /^https:\/\/.+\.gamesplanet\.com\/games\/charts$/, ControllerType.CHART
    ]
  ]);

  public configClassMap = new TSMap<string, new() => ComponentConfig>([
    [
      ControllerType.MAIN_PAGE, GamesplanetMainPageConfig
    ],
    [
      ControllerType.SEARCH, GamesplanetSearchConfig
    ],
    [
      ControllerType.OFFERS, GamesplanetOffersConfig
    ],
    [
      ControllerType.CHART, GamesplanetChartsConfig
    ]
  ]);

  public controllerClassMap = new TSMap<string, new(componentConfig: ComponentConfig) => ComponentController>([
    [
      ControllerType.MAIN_PAGE, GamesplanetMainPageController
    ],
    [
      ControllerType.SEARCH, GamesplanetSearchController
    ],
    [
      ControllerType.OFFERS, GamesplanetOffersController
    ],
    [
      ControllerType.CHART, GamesplanetChartsController
    ]
  ]);
}
