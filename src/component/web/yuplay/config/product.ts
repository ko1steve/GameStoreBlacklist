import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { YuplayProductTaskHandler } from '../task/product';
import { YuplayRecommendedTaskHandler } from '../task/recommended';
import { ComponentConfig, ITextHandleConfig } from './../../../../core/component/component-config';

export class YuplayProductConfig extends ComponentConfig {
  public componentId: string = 'yuplay-product';
  public texthandle: ITextHandleConfig = {
    startWords: [],
    endWords: [],
    cutToEndWords: ['(Xbox '],
    excludeTitleWords: []
  };

  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    YuplayProductTaskHandler,
    YuplayRecommendedTaskHandler
  ];
}
