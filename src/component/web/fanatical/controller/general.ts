import { FanaticalHitCardsRowTaskHandler } from './../task/hitCardsRow';
import { FanaticalSlickTrackTaskHandler } from './../task/slickTrack';
import { ComponentController } from './../../../../core/component/component-controller';

export class FanaticalGeneralController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new FanaticalHitCardsRowTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new FanaticalSlickTrackTaskHandler(this.componentConfig, this.dataModel));
  }
}
