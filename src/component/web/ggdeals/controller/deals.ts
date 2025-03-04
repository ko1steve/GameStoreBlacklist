import { ComponentController } from './../../../../core/component-controller';
import { GgdealsDealsListItemsTaskHandler } from './../task/deals-list-items';

export class GgdealsDealsController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GgdealsDealsListItemsTaskHandler(this.componentConfig, this.dataModel));
  }
}
