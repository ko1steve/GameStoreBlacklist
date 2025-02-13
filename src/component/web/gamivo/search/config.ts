import { ComponentConfig, IComponentConfig, ITextHandleConfig } from './../../../../core/componentConfig';

export class GamivoSearchConfig extends ComponentConfig implements IGamivoSearchConfig {
  public texthandle: ITextHandleConfig = {
    startWords: [],
    cutToEndWords: [
      ' EN/', ' EU/', ' DE/', ' FR/', ' IT/', ' ZH/', ' JA/', ' ES/', ' RU/', ' PL/', ' CS/', 'ROW/',
      ' EN ', ' EU ', ' DE ', ' FR ', ' IT ', ' ZH ', ' JA ', ' ES ', ' RU ', ' PL ', ' CS ', ' ROW ',
      ' Steam Account'
    ],
    excludeTitleWords: [
      'Steam Gift', 'Global Steam Gift', 'Global Steam', 'Asia Steam'
    ],
    endWords: [
      ' EN', ' EU', ' DE', ' FR', ' IT', ' ZH', ' JA', ' ES', ' RU', ' PL', ' CS', ' ROW'
    ]
  };

  public matchUrls: string[] = [
    'https://www.gamivo.com/store/games/*',
    'https://www.gamivo.com/search*'
  ];
}

export interface IGamivoSearchConfig extends IComponentConfig {
  matchUrls: string[];
}
