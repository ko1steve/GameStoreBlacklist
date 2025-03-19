import { ComponentController } from './../../../../core/component/component-controller';
import { GreenManGamingMediumProductBlockModuleContentTaskHandler } from '../task/medium-product-block-module-content';
import { GreenManGamingThirdOneBlockTaskHandler } from '../task/third-one-block';

export class GreenManGamingSalesController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GreenManGamingMediumProductBlockModuleContentTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new GreenManGamingThirdOneBlockTaskHandler(this.componentConfig, this.dataModel));
  }
}
