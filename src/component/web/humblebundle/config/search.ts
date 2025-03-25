import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { HumbleBundleChunkEntityListTaskHandler } from '../task/chunk-entity-list';
import { ComponentConfig } from './../../../../core/component/component-config';

export class HumbleBundleSearchConfig extends ComponentConfig {
  public componentId: string = 'humblebundle-search';
  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    HumbleBundleChunkEntityListTaskHandler
  ];
}
