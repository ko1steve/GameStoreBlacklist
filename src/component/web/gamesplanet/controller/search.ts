import { ComponentController } from './../../../../core/component/component-controller';
import { GamesplanetSearchTaskHandler } from '../task/search';

export class GamesplanetSearchController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GamesplanetSearchTaskHandler(this.componentConfig, this.dataModel));
  }
}
