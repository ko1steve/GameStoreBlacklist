import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { ComponentConfig } from './../../../../core/component/component-config';
import { TwoGameProductTaskHandler } from '../task/product';
import { TwoGameProductListPageTaskHandler } from '../task/product-list-page';

export class TwoGamePoductConfig extends ComponentConfig {
  public componentId: string = '2game-product';
  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    TwoGameProductTaskHandler,
    TwoGameProductListPageTaskHandler
  ];
}
