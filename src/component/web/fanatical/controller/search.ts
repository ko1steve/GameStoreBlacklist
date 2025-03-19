import { ComponentController } from './../../../../core/component/component-controller';
import { FanaticalSearchTaskHandler } from './../task/search';

export class FanaticalSearchController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new FanaticalSearchTaskHandler(this.componentConfig, this.dataModel));
  }
}
