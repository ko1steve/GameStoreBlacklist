import { TSMap } from 'typescript-map';
import { ComponentConfig, ITextHandleConfig } from './../../../core/componentConfig';

export enum ControllerType {
  MAIN_PAGE = 'MAIN_PAGE',
  PRODUCT = 'PRODUCT',
  SEARCH = 'SEARCH'
}

export const ControllerTypeMap = new TSMap<string, ControllerType>([
  [
    'https://www.gamivo.com/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.gamivo.com/fr/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.gamivo.com/pl/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.gamivo.com/de/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.gamivo.com/es/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.gamivo.com/it/', ControllerType.MAIN_PAGE
  ],
  [
    'https://www.gamivo.com/product/*', ControllerType.PRODUCT
  ],
  [
    'https://www.gamivo.com/*/product/*', ControllerType.PRODUCT
  ],
  [
    'https://www.gamivo.com/store/games/*', ControllerType.SEARCH
  ],
  [
    'https://www.gamivo.com/*/store/games/*', ControllerType.SEARCH
  ],
  [
    'https://www.gamivo.com/search*', ControllerType.SEARCH
  ],
  [
    'https://www.gamivo.com/*/search*', ControllerType.SEARCH
  ]
]);

export class GamivoMainPageConfig extends ComponentConfig {
  public componentId: string = 'GamivoMainPage';
  public texthandle: ITextHandleConfig = {
    startWords: ['Buy '],
    endWords: [' EN', ' EU', ' DE', ' FR', ' IT', ' ZH', ' JA', ' ES', ' RU', ' PL', ' CS', ' ROW'],
    cutToEndWords: [
      ' EN/', ' EU/', ' DE/', ' FR/', ' IT/', ' ZH/', ' JA/', ' ES/', ' RU/', ' PL/', ' CS/', 'ROW/',
      ' EN ', ' EU ', ' DE ', ' FR ', ' IT ', ' ZH ', ' JA ', ' ES ', ' RU ', ' PL ', ' CS ', ' ROW ',
      ' PRE-ORDER', ' Steam Account'
    ],
    excludeTitleWords: [
      'Steam Gift', 'Global Steam Gift', 'Global Steam', 'Asia Steam'
    ]
  };
}

export class GamivoProductConfig extends ComponentConfig {
  public componentId: string = 'GamivoProduct';
  public texthandle: ITextHandleConfig = {
    startWords: ['Buy '],
    endWords: [' EN', ' EU', ' DE', ' FR', ' IT', ' ZH', ' JA', ' ES', ' RU', ' PL', ' CS', ' ROW'],
    cutToEndWords: [
      ' EN/', ' EU/', ' DE/', ' FR/', ' IT/', ' ZH/', ' JA/', ' ES/', ' RU/', ' PL/', ' CS/', 'ROW/',
      ' EN ', ' EU ', ' DE ', ' FR ', ' IT ', ' ZH ', ' JA ', ' ES ', ' RU ', ' PL ', ' CS ', ' ROW ',
      ' PRE-ORDER', ' Steam Account'
    ],
    excludeTitleWords: [
      'Steam Gift', 'Global Steam Gift', 'Global Steam', 'Asia Steam'
    ]
  };
}

export class GamivoSearchConfig extends ComponentConfig {
  public componentId: string = 'GamivoSearch';
  public texthandle: ITextHandleConfig = {
    startWords: [],
    cutToEndWords: [
      ' EN/', ' EU/', ' DE/', ' FR/', ' IT/', ' ZH/', ' JA/', ' ES/', ' RU/', ' PL/', ' CS/', 'ROW/',
      ' EN ', ' EU ', ' DE ', ' FR ', ' IT ', ' ZH ', ' JA ', ' ES ', ' RU ', ' PL ', ' CS ', ' ROW ',
      ' PRE-ORDER', ' Steam Account'
    ],
    excludeTitleWords: [
      'Steam Gift', 'Global Steam Gift', 'Global Steam', 'Asia Steam'
    ],
    endWords: [
      ' EN', ' EU', ' DE', ' FR', ' IT', ' ZH', ' JA', ' ES', ' RU', ' PL', ' CS', ' ROW'
    ]
  };
}
