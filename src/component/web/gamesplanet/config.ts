import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/component/component-config';
import { WebObserverConfig } from '../../../core/web-observer/web-observer-config';
import { GamesplanetMainPageConfig } from './config/main-page';
import { GamesplanetSearchConfig } from './config/search';
import { GamesplanetOffersConfig } from './config/offers';
import { GamesplanetChartsConfig } from './config/charts';

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
}
