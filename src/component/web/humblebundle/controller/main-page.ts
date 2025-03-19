import { ComponentController } from './../../../../core/component/component-controller';
import { HumbleBundleThreeTaskHandler } from './../task/three';
import { HumbleBundleSlickTrackTaskHandler } from './../task/slick-track';

export class HumbleBundleMainPageController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new HumbleBundleThreeTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new HumbleBundleSlickTrackTaskHandler(this.componentConfig, this.dataModel));
  }
}
