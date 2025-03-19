import { ComponentController } from './../../../../core/component/component-controller';
import { GamesplanetFlexMdWrapTaskHandler } from '../task/flex-md-wrap';
import { GamesplanetSlickTrackTaskHandler } from '../task/slick-track';
import { GamesplanetFrontHighlightsTaskHandler } from '../task/front-highlights';
import { GamesplanetGameOfferHighlightsTaskHandler } from '../task/game-offer-highlights';
import { GamesplanetRowPageCtnTaskHandler } from '../task/row-page-ctn';
import { GamesplanetGameListTabTaskHandler } from '../task/main-page/game-list-tab';

export class GamesplanetMainPageController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GamesplanetFlexMdWrapTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new GamesplanetSlickTrackTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new GamesplanetFrontHighlightsTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new GamesplanetGameOfferHighlightsTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new GamesplanetRowPageCtnTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new GamesplanetGameListTabTaskHandler(this.componentConfig, this.dataModel));
  }
}
