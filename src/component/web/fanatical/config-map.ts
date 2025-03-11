import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/component/component-config';
import { ComponentController } from './../../../core/component/component-controller';
import { FanaticalGeneralController } from './controller/general';
import { FanaticalProductController } from './controller/product';
import { FanaticalSearchController } from './controller/search';
import { FanaticalGeneralConfig } from './config/general';
import { FanaticalProductConfig } from './config/product';
import { FanaticalSearchConfig } from './config/search';

export enum ControllerType {
  GENERAL = 'GENERAL',
  PRODUCT = 'PRODUCT',
  SEARCH = 'SEARCH'
}

export const UrlTypeMap = new TSMap<RegExp, ControllerType>([
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

export const ConfigClassMap = new TSMap<string, new() => ComponentConfig>([
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

export const ControllerClassMap = new TSMap<string, new(componentConfig: ComponentConfig) => ComponentController>([
  [
    ControllerType.GENERAL, FanaticalGeneralController
  ],
  [
    ControllerType.PRODUCT, FanaticalProductController
  ],
  [
    ControllerType.SEARCH, FanaticalSearchController
  ]
]);
