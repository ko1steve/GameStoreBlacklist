import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/component-config';
import { ComponentController } from './../../../core/component-controller';
import { GamivoSearchConfig } from './../gamivo/config/search';
import { GamivoSearchController } from './../gamivo/controller/search';

export enum ControllerType {
  SEARCH = 'SEARCH'
}

export const UrlTypeMap = new TSMap<string, ControllerType>([
  [
    'https://*.gamesplanet.com/search?*', ControllerType.SEARCH
  ]
]);

export const ConfigClassMap = new TSMap<string, new() => ComponentConfig>([
  [
    ControllerType.SEARCH, GamivoSearchConfig
  ]
]);

export const ControllerClassMap = new TSMap<string, new(componentConfig: ComponentConfig) => ComponentController>([
  [
    ControllerType.SEARCH, GamivoSearchController
  ]
]);
