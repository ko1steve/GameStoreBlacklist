import { ComponentController } from './../../../../core/component/component-controller';
import { GamivoSearchTaskHandler } from './../task/search';

export class GamivoSearchController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GamivoSearchTaskHandler(this.componentConfig, this.dataModel));
  }
}
