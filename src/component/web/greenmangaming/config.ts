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
import { WebObserverConfig } from '../../../core/web-observer/web-observer-config';

export enum ControllerType {
  COMING_SOON = 'COMING_SOON',
  MAIN_PAGE = 'MAIN_PAGE',
  SALES = 'SALES',
  SEARCH = 'SEARCH'
}

export class GreenManGamingWebObserverConfig extends WebObserverConfig {
  public urlTypeMap = new TSMap<RegExp, ControllerType>([
    [
      /^https:\/\/www\.greenmangaming\.com(\/(de|fr|es|pt|zh|ja|ko|ru|tr))?\/all-games\/$/, ControllerType.COMING_SOON
    ],
    [
      /^https:\/\/www\.greenmangaming\.com(\/(de|fr|es|pt|zh|ja|ko|ru|tr))?\/coming-soon\/$/, ControllerType.COMING_SOON
    ],
    [
      /^https:\/\/www\.greenmangaming\.com(\/(de|fr|es|pt|zh|ja|ko|ru|tr))?\/top-upcoming-games\/$/, ControllerType.COMING_SOON
    ],
    [
      /^https:\/\/www\.greenmangaming\.com(\/(de|fr|es|pt|zh|ja|ko|ru|tr))?\/new-gmg\/$/, ControllerType.COMING_SOON
    ],
    [
      /^https:\/\/www\.greenmangaming\.com(\/(de|fr|es|pt|zh|ja|ko|ru|tr))?\/$/, ControllerType.MAIN_PAGE
    ],
    [
      /^https:\/\/www\.greenmangaming\.com(\/(de|fr|es|pt|zh|ja|ko|ru|tr))?\/sales\/$/, ControllerType.SALES
    ],
    [
      /^https:\/\/www\.greenmangaming\.com(\/(de|fr|es|pt|zh|ja|ko|ru|tr))?\/hot-deals\/$/, ControllerType.SALES
    ],
    [
      /^https:\/\/www\.greenmangaming\.com(\/(de|fr|es|pt|zh|ja|ko|ru|tr))?\/all-games\/$/, ControllerType.SEARCH
    ],
    [
      /^https:\/\/www\.greenmangaming\.com(\/(de|fr|es|pt|zh|ja|ko|ru|tr))?\/top-upcoming-games\/pre-purchase\/$/, ControllerType.SEARCH
    ],
    [
      /^https:\/\/www\.greenmangaming\.com(\/(de|fr|es|pt|zh|ja|ko|ru|tr))?\/new-gmg\/all-results\/$/, ControllerType.SEARCH
    ],
    [
      /^https:\/\/www\.greenmangaming\.com(\/(de|fr|es|pt|zh|ja|ko|ru|tr))?\/search\?(\/.+)?$/, ControllerType.SEARCH
    ]
  ]);

  public configClassMap = new TSMap<string, new() => ComponentConfig>([
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

  public controllerClassMap = new TSMap<string, new(componentConfig: ComponentConfig) => ComponentController>([
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
}
