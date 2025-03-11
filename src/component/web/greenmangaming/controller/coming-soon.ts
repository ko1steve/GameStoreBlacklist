import { ComponentController } from './../../../../core/component/component-controller';
import { GreenManGamingComingSoonTaskHandler as GreenManGamingLargeProductBlockTaskHandler } from '../task/large-product-block';
import { GreenManGamingSliderListTaskHandler } from '../task/slider-list';

export class GreenManGamingComingSoonController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GreenManGamingLargeProductBlockTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new GreenManGamingSliderListTaskHandler(this.componentConfig, this.dataModel));
  }
}
