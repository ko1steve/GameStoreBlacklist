import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { GamesplanetSearchTaskHandler } from '../task/search';
import { ComponentConfig } from './../../../../core/component/component-config';

export class GamesplanetSearchConfig extends ComponentConfig {
  public componentId: string = 'gamesplanet-search';
  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    GamesplanetSearchTaskHandler
  ];
}
