import { ComponentController } from './../../../../core/component/component-controller';
import { GamesplanetGameListTabTaskHandler } from '../task/charts/game-list-tab';

export class GamesplanetChartsController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GamesplanetGameListTabTaskHandler(this.componentConfig, this.dataModel));
  }
}
