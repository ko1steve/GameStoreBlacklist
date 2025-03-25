import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { FanaticalProductTaskHandler } from '../task/product';
import { ComponentConfig } from './../../../../core/component/component-config';

export class FanaticalProductConfig extends ComponentConfig {
  public componentId: string = 'fanatical-product';

  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    FanaticalProductTaskHandler
  ];
}
