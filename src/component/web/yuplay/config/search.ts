import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { YuplaySearchTaskHandler } from '../task/search';
import { ComponentConfig } from './../../../../core/component/component-config';

export class YuplaySearchConfig extends ComponentConfig {
  public componentId: string = 'yuplay-search';
  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    YuplaySearchTaskHandler
  ];
}
