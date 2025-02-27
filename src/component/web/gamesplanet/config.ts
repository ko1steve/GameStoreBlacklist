import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/componentConfig';
import { ComponentController } from './../../../core/componentController';
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
