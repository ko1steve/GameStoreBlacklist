import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/component/component-config';
import { ComponentController } from './../../../core/component/component-controller';
import { FanaticalGeneralConfig } from './config/general';
import { FanaticalProductConfig } from './config/product';
import { FanaticalSearchConfig } from './config/search';
import { WebObserverConfig } from '../../../core/web-observer/web-observer-config';

export enum ControllerType {
  GENERAL = 'GENERAL',
  PRODUCT = 'PRODUCT',
  SEARCH = 'SEARCH'
}

export class FanaticalWebObserverConfig extends WebObserverConfig {
  public urlTypeMap = new TSMap<RegExp, ControllerType>([
    [
      /^https:\/\/www\.fanatical\.com\/.+\/(\?.*)?$/, ControllerType.GENERAL
    ],
    [
      /^https:\/\/www\.fanatical\.com\/.+\/on-sale\/$/, ControllerType.GENERAL
    ],
    [
      /^https:\/\/www\.fanatical\.com\/.+\/game\/.*$/, ControllerType.PRODUCT
    ],
    [
      /^https:\/\/www\.fanatical\.com\/.+\/search(\?.*)?$/, ControllerType.SEARCH
    ]
  ]);

  public configClassMap = new TSMap<string, new() => ComponentConfig>([
    [
      ControllerType.GENERAL, FanaticalGeneralConfig
    ],
    [
      ControllerType.PRODUCT, FanaticalProductConfig
    ],
    [
      ControllerType.SEARCH, FanaticalSearchConfig
    ]
  ]);
}
