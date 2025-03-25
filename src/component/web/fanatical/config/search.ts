import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { FanaticalSearchTaskHandler } from '../task/search';
import { ComponentConfig } from './../../../../core/component/component-config';

export class FanaticalSearchConfig extends ComponentConfig {
  public componentId: string = 'fanatical-search';
  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    FanaticalSearchTaskHandler
  ];
}
