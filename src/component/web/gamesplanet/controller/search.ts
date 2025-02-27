import { ComponentController } from './../../../../core/componentController';
import { GamesplanetSearchTaskHandler } from '../task/search';

export class GamesplanetSearchController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GamesplanetSearchTaskHandler(this.componentConfig, this.dataModel));
  }
}
