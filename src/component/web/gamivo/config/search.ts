import { ComponentConfig, ITextHandleConfig } from './../../../../core/component-config';

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
