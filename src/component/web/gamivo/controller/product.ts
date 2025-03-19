import { ComponentController } from './../../../../core/component/component-controller';
import { GamivoProductTaskHandler } from './../task/product';
import { GamivoRecommendTaskHandler } from './../task/recommend';

export class GamivoProductController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GamivoProductTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new GamivoRecommendTaskHandler(this.componentConfig, this.dataModel));
  }
}
