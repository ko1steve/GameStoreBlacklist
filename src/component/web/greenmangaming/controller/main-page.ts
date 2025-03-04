import { ComponentController } from './../../../../core/component-controller';
import { GreenManGamingMediumProductBlockTaskHandler } from './../task/mediumProductBlock';
import { GreenManGamingProductBlockTaskHandler } from './../task/productBlock';

export class GreenManGamingMainPageController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GreenManGamingMediumProductBlockTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new GreenManGamingProductBlockTaskHandler(this.componentConfig, this.dataModel));
  }
}
