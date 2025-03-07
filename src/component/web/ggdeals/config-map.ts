import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/component-config';
import { ComponentController } from './../../../core/component-controller';
import { GgdealsProductConfig } from './config/product';
import { GgdealsDealsConfig } from './config/deals';
import { GgdealsGamesConfig } from './config/games';
import { GgdealsProductController } from './controller/product';
import { GgdealsDealsController } from './controller/deals';
import { GgdealsGamesController } from './controller/games';

export enum ControllerType {
  PRODUCT = 'PRODUCT',
  DEALS = 'DEALS',
  GAMES = 'GAMES'
}

export const UrlTypeMap = new TSMap<string, ControllerType>([
  [
    'https://gg.deals/game/*', ControllerType.PRODUCT
  ],
  [
    'https://gg.deals/dlc/*', ControllerType.PRODUCT
  ],
  [
    'https://gg.deals/pack/*', ControllerType.PRODUCT
  ],
  [
    'https://gg.deals/deals/*', ControllerType.DEALS
  ],
  [
    'https://gg.deals/games/*', ControllerType.GAMES
  ]
]);

export const ConfigClassMap = new TSMap<string, new() => ComponentConfig>([
  [
    ControllerType.PRODUCT, GgdealsProductConfig
  ],
  [
    ControllerType.DEALS, GgdealsDealsConfig
  ],
  [
    ControllerType.GAMES, GgdealsGamesConfig
  ]
]);

export const ControllerClassMap = new TSMap<string, new(componentConfig: ComponentConfig) => ComponentController>([
  [
    ControllerType.PRODUCT, GgdealsProductController
  ],
  [
    ControllerType.DEALS, GgdealsDealsController
  ],
  [
    ControllerType.GAMES, GgdealsGamesController
  ]
]);
