import { TSMap } from 'typescript-map';
import { ComponentConfig } from '../component/component-config';
import { ComponentController } from '../component/component-controller';

export enum ControllerType {
  PRODUCT = 'PRODUCT',
  SEARCH = 'SEARCH'
}

export interface IWebObserverConfig {
  urlTypeMap: TSMap<RegExp, string>;
  configClassMap: TSMap<string, new () => ComponentConfig>
  controllerClassMap: TSMap<string, new (componentConfig: ComponentConfig) => ComponentController>
}

export class WebObserverConfig implements IWebObserverConfig {
  public urlTypeMap = new TSMap<RegExp, string>([
    // [
    //   'https://*/', ControllerType.PRODUCT
    // ],
    // [
    //   'https://*/', ControllerType.SEARCH
    // ]
  ]);

  public configClassMap = new TSMap<string, new() => ComponentConfig>([
    // [
    //   ControllerType.PRODUCT, ProductConfig
    // ],
    // [
    //   ControllerType.SEARCH, SearchConfig
    // ]
  ]);

  public controllerClassMap = new TSMap<string, new(componentConfig: ComponentConfig) => ComponentController>([
    // [
    //   ControllerType.PRODUCT, ProductController
    // ],
    // [
    //   ControllerType.SEARCH, SearchController
    // ]
  ]);
}
