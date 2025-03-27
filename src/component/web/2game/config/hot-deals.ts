import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { ComponentConfig } from './../../../../core/component/component-config';
import { TwoGameProductListPageTaskHandler } from '../task/product-list-page';

export class TwoGameHotDealsConfig extends ComponentConfig {
  public componentId: string = '2game-hot-deals';
  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    TwoGameProductListPageTaskHandler
  ];
}
