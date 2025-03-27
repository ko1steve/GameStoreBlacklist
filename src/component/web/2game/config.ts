import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/component/component-config';
import { WebObserverConfig } from '../../../core/web-observer/web-observer-config';
import { TwoGameMainPageConfig } from './config/main-page';

export enum ControllerType {
  MAIN_PAGE = 'MAIN_PAGE'
}

export class TwoGameWebObserverConfig extends WebObserverConfig {
  public urlTypeMap = new TSMap<RegExp, ControllerType>([
    [
      /^https:\/\/2game\.com\/$/, ControllerType.MAIN_PAGE
    ]
  ]);

  public configClassMap = new TSMap<string, new() => ComponentConfig>([
    [
      ControllerType.MAIN_PAGE, TwoGameMainPageConfig
    ]
  ]);
}
