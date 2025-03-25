import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { GamivoProductTaskHandler } from '../task/product';
import { GamivoRecommendTaskHandler } from '../task/recommend';
import { ComponentConfig, ITextHandleConfig } from './../../../../core/component/component-config';

export class GamivoProductConfig extends ComponentConfig {
  public componentId: string = 'gamivo-product';
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

  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    GamivoProductTaskHandler,
    GamivoRecommendTaskHandler
  ];
}
