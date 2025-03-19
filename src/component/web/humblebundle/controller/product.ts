import { ComponentController } from './../../../../core/component/component-controller';
import { HumbleBundleProductTaskHandler } from './../task/product';
import { HumbleBundleRecommendSlickTrackTaskHandler } from './../task/recommend-slick-track';

export class HumbleBundleProductController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new HumbleBundleProductTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new HumbleBundleRecommendSlickTrackTaskHandler(this.componentConfig, this.dataModel));
  }
}
