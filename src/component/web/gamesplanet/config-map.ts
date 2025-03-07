import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/component-config';
import { ComponentController } from './../../../core/component-controller';
import { GamesplanetSearchConfig } from './config/search';
import { GamesplanetSearchController } from './controller/search';

export enum ControllerType {
  SEARCH = 'SEARCH'
}

export const UrlTypeMap = new TSMap<RegExp, ControllerType>([
  [
    /^https:\/\/.+\.gamesplanet\.com\/search\?.*$/, ControllerType.SEARCH
  ]
]);

export const ConfigClassMap = new TSMap<string, new() => ComponentConfig>([
  [
    ControllerType.SEARCH, GamesplanetSearchConfig
  ]
]);

export const ControllerClassMap = new TSMap<string, new(componentConfig: ComponentConfig) => ComponentController>([
  [
    ControllerType.SEARCH, GamesplanetSearchController
  ]
]);
