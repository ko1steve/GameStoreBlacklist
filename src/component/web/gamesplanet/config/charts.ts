import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { GamesplanetGameListTabTaskHandler } from '../task/main-page/game-list-tab';
import { ComponentConfig } from './../../../../core/component/component-config';

export class GamesplanetChartsConfig extends ComponentConfig {
  public componentId: string = 'gamesplanet-chart-page';
  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    GamesplanetGameListTabTaskHandler
  ];
}
