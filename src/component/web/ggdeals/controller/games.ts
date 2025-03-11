import { ComponentController } from './../../../../core/component/component-controller';
import { GgdealsGamesListItemsTaskHandler } from './../task/games-list-item';

export class GgdealsGamesController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GgdealsGamesListItemsTaskHandler(this.componentConfig, this.dataModel));
  }
}
