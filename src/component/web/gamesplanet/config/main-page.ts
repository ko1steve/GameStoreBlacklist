import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { GamesplanetFlexMdWrapTaskHandler } from '../task/flex-md-wrap';
import { GamesplanetFrontHighlightsTaskHandler } from '../task/front-highlights';
import { GamesplanetGameOfferHighlightsTaskHandler } from '../task/game-offer-highlights';
import { GamesplanetGameListTabTaskHandler } from '../task/main-page/game-list-tab';
import { GamesplanetRowPageCtnTaskHandler } from '../task/row-page-ctn';
import { GamesplanetSlickTrackTaskHandler } from '../task/slick-track';
import { GamesplanetWeeklyDealsTaskHandler } from '../task/weekly-deals';
import { ComponentConfig } from './../../../../core/component/component-config';

export class GamesplanetMainPageConfig extends ComponentConfig {
  public componentId: string = 'gamesplanet-main-page';
  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    GamesplanetFlexMdWrapTaskHandler,
    GamesplanetSlickTrackTaskHandler,
    GamesplanetFrontHighlightsTaskHandler,
    GamesplanetGameOfferHighlightsTaskHandler,
    GamesplanetWeeklyDealsTaskHandler,
    GamesplanetRowPageCtnTaskHandler,
    GamesplanetGameListTabTaskHandler
  ];
}
