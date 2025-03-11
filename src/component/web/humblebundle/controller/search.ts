import { ComponentController } from './../../../../core/component/component-controller';
import { HumbleBundleChunkEntityListTaskHandler } from '../task/chunk-entity-list';

export class HumbleBundleSearchController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new HumbleBundleChunkEntityListTaskHandler(this.componentConfig, this.dataModel));
  }
}
