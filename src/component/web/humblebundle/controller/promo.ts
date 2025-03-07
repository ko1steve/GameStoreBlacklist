import { ComponentController } from './../../../../core/component-controller';
import { HumbleBundlePromoSlickTrackTaskHandler } from '../task/promo-slick-track';
import { HumbleBundleChunkEntityListTaskHandler } from '../task/chunk-entity-list';

export class HumbleBundlePromoController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new HumbleBundlePromoSlickTrackTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new HumbleBundleChunkEntityListTaskHandler(this.componentConfig, this.dataModel));
  }
}
