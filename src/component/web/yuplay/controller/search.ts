import { ComponentController } from './../../../../core/component/component-controller';
import { YuplaySearchTaskHandler } from './../task/search';

export class YuplaySearchController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new YuplaySearchTaskHandler(this.componentConfig, this.dataModel));
  }
}
