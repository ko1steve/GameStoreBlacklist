import { GamivoCarouselInnerTaskHandler } from './../task/carouselInner';
import { GamivoHomeRecommendTaskHandler } from './../task/homeRecommend';
import { ComponentController } from './../../../../core/componentController';

export class GamivoMainPageController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GamivoHomeRecommendTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new GamivoCarouselInnerTaskHandler(this.componentConfig, this.dataModel));
  }
}
