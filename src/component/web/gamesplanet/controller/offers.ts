import { ComponentController } from './../../../../core/component/component-controller';
import { GamesplanetOfferModulesTaskHandler } from '../task/offer-modules';

export class GamesplanetOffersController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GamesplanetOfferModulesTaskHandler(this.componentConfig, this.dataModel));
  }
}
