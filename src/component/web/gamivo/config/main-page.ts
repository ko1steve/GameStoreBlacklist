import { ComponentConfig, ITextHandleConfig } from './../../../../core/component/component-config';

export class GamivoMainPageConfig extends ComponentConfig {
  public componentId: string = 'gamivo-main-page';
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
