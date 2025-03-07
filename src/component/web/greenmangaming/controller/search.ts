import { ComponentController } from './../../../../core/component-controller';
import { GreenManGamingSearchTaskHandler } from './../task/search';

export class GreenManGamingSearchController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GreenManGamingSearchTaskHandler(this.componentConfig, this.dataModel));
  }
}
