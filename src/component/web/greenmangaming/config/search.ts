import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { GreenManGamingSearchTaskHandler } from '../task/search';
import { ComponentConfig } from './../../../../core/component/component-config';

export class GreenManGamingSearchConfig extends ComponentConfig {
  public componentId: string = 'greenmangaming-search';
  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    GreenManGamingSearchTaskHandler
  ];
}
