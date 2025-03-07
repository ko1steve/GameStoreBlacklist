import { ComponentController } from './../../../../core/component-controller';
import { YuplayProductTaskHandler } from './../task/product';
import { YuplayRecommendedTaskHandler } from './../task/recommended';

export class YuplayProductController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new YuplayProductTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new YuplayRecommendedTaskHandler(this.componentConfig, this.dataModel));
  }
}
