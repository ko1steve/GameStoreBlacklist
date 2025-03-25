import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { GamesplanetOfferModulesTaskHandler } from '../task/offer-modules';
import { ComponentConfig } from './../../../../core/component/component-config';

export class GamesplanetOffersConfig extends ComponentConfig {
  public componentId: string = 'gamesplanet-offers';
  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    GamesplanetOfferModulesTaskHandler
  ];
}
