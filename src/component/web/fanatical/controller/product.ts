import { ComponentController } from './../../../../core/component-controller';
import { FanaticalProductTaskHandler } from './../task/product';

export class FanaticalProductController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new FanaticalProductTaskHandler(this.componentConfig, this.dataModel));
  }
}
