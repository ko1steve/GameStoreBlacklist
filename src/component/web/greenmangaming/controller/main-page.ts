import { ComponentController } from './../../../../core/component/component-controller';
import { GreenManGamingMediumProductBlockModuleContentTaskHandler } from '../task/medium-product-block-module-content';
import { GreenManGamingLargeProductBlockExcludeFirstTaskHandler } from './../task/large-product-block-exclude-first';

export class GreenManGamingMainPageController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GreenManGamingLargeProductBlockExcludeFirstTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new GreenManGamingMediumProductBlockModuleContentTaskHandler(this.componentConfig, this.dataModel));
  }
}
