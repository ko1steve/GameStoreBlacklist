import { ComponentController } from './../../../../core/component/component-controller';
import { GgdealsProductTaskHandler } from './../task/product';

export class GgdealsProductController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GgdealsProductTaskHandler(this.componentConfig, this.dataModel));
  }
}
