import { ComponentController } from './../../../../core/component/component-controller';
import { GreenManGamingMediumProductBlockTaskHandler } from './../task/mediumProductBlock';

export class GreenManGamingSalesController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GreenManGamingMediumProductBlockTaskHandler(this.componentConfig, this.dataModel));
  }
}
