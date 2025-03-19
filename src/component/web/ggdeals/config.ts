import { TSMap } from 'typescript-map';
import { ComponentConfig } from './../../../core/component/component-config';
import { ComponentController } from './../../../core/component/component-controller';
import { GgdealsProductConfig } from './config/product';
import { GgdealsDealsConfig } from './config/deals';
import { GgdealsGamesConfig } from './config/games';
import { GgdealsProductController } from './controller/product';
import { GgdealsDealsController } from './controller/deals';
import { GgdealsGamesController } from './controller/games';
import { WebObserverConfig } from '../../../core/web-observer/web-observer-config';

export enum ControllerType {
  PRODUCT = 'PRODUCT',
  DEALS = 'DEALS',
  GAMES = 'GAMES'
}

export class GgdealsWebObserverConfig extends WebObserverConfig {
  public urlTypeMap = new TSMap<RegExp, ControllerType>([
    [
      /^https:\/\/gg\.deals\/game\/.+$/, ControllerType.PRODUCT
    ],
    [
      /^https:\/\/gg\.deals\/dlc\/.+$/, ControllerType.PRODUCT
    ],
    [
      /^https:\/\/gg\.deals\/pack\/.+$/, ControllerType.PRODUCT
    ],
    [
      /^https:\/\/gg\.deals\/deals\/$/, ControllerType.DEALS
    ],
    [
      /^https:\/\/gg\.deals\/games\/$/, ControllerType.GAMES
    ]
  ]);

  public configClassMap = new TSMap<string, new() => ComponentConfig>([
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

  public controllerClassMap = new TSMap<string, new(componentConfig: ComponentConfig) => ComponentController>([
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
}
