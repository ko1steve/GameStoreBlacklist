import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/componentConfig';

export enum ControllerType {
  GENERAL = 'GENERAL',
  PRODUCT = 'PRODUCT',
  SEARCH = 'SEARCH'
}

export const ControllerTypeMap = new TSMap<string, ControllerType>([
  [
    'https://www.fanatical.com/*/', ControllerType.GENERAL
  ],
  [
    'https://www.fanatical.com/*/?*', ControllerType.GENERAL
  ],
  [
    'https://www.fanatical.com/*/on-sale', ControllerType.GENERAL
  ],
  [
    'https://www.fanatical.com/*/game/*', ControllerType.PRODUCT
  ],
  [
    'https://www.fanatical.com/*/search*', ControllerType.SEARCH
  ]
]);

export class FanaticalGeneralConfig extends ComponentConfig {
}

export class FanaticalProductConfig extends ComponentConfig {
}

export class FanaticalSearchConfig extends ComponentConfig {
}
