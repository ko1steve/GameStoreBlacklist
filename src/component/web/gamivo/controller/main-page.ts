import { GamivoCarouselInnerTaskHandler } from './../task/carousel-inner';
import { GamivoHomeRecommendTaskHandler } from './../task/home-recommend';
import { ComponentController } from './../../../../core/component/component-controller';

export class GamivoMainPageController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GamivoHomeRecommendTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new GamivoCarouselInnerTaskHandler(this.componentConfig, this.dataModel));
  }
}
