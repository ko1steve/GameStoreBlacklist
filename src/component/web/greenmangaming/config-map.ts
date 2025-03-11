import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/component/component-config';
import { ComponentController } from './../../../core/component/component-controller';
import { GreenManGamingComingSoonConfig } from './config/coming-soon';
import { GreenManGamingMainPageConfig } from './config/main-page';
import { GreenManGamingSalesConfig } from './config/sales';
import { GreenManGamingSearchConfig } from './config/search';
import { GreenManGamingComingSoonController } from './controller/coming-soon';
import { GreenManGamingMainPageController } from './controller/main-page';
import { GreenManGamingSalesController } from './controller/sales';
import { GreenManGamingSearchController } from './controller/search';

export enum ControllerType {
  COMING_SOON = 'COMING_SOON',
  MAIN_PAGE = 'MAIN_PAGE',
  SALES = 'SALES',
  SEARCH = 'SEARCH'
}

export const UrlTypeMap = new TSMap<string, ControllerType>([
  [
    'https://www.greenmangaming.com*/all-games/', ControllerType.COMING_SOON
  ],
  [
    'https://www.greenmangaming.com*/coming-soon/', ControllerType.COMING_SOON
  ],
  [
    'https://www.greenmangaming.com*/top-upcoming-games/', ControllerType.COMING_SOON
  ],
  [
    'https://www.greenmangaming.com*/new-gmg/', ControllerType.COMING_SOON
  ],
  [
    'https://www.greenmangaming.com/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.greenmangaming.com/de/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.greenmangaming.com/fr/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.greenmangaming.com/es/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.greenmangaming.com/pt/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.greenmangaming.com/zh/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.greenmangaming.com/ja/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.greenmangaming.com/ko/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.greenmangaming.com/ru/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.greenmangaming.com/tr/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.greenmangaming.com*/sales/*', ControllerType.SALES
  ],
  [
    'https://www.greenmangaming.com*/hot-deals/*', ControllerType.SALES
  ],
  [
    'https://www.greenmangaming.com*/all-games/*', ControllerType.SEARCH
  ],
  [
    'https://www.greenmangaming.com*/top-upcoming-games/pre-purchase/', ControllerType.SEARCH
  ],
  [
    'https://www.greenmangaming.com*/new-gmg/all-results/', ControllerType.SEARCH
  ],
  [
    'https://www.greenmangaming.com*/search?*', ControllerType.SEARCH
  ]
]);

export const ConfigClassMap = new TSMap<string, new() => ComponentConfig>([
  [
    ControllerType.COMING_SOON, GreenManGamingComingSoonConfig
  ],
  [
    ControllerType.MAIN_PAGE, GreenManGamingMainPageConfig
  ],
  [
    ControllerType.SALES, GreenManGamingSalesConfig
  ],
  [
    ControllerType.SEARCH, GreenManGamingSearchConfig
  ]
]);

export const ControllerClassMap = new TSMap<string, new(componentConfig: ComponentConfig) => ComponentController>([
  [
    ControllerType.COMING_SOON, GreenManGamingComingSoonController
  ],
  [
    ControllerType.MAIN_PAGE, GreenManGamingMainPageController
  ],
  [
    ControllerType.SALES, GreenManGamingSalesController
  ],
  [
    ControllerType.SEARCH, GreenManGamingSearchController
  ]
]);
