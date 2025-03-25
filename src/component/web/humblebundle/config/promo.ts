import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { HumbleBundleChunkEntityListTaskHandler } from '../task/chunk-entity-list';
import { HumbleBundlePromoSlickTrackTaskHandler } from '../task/promo-slick-track';
import { ComponentConfig } from './../../../../core/component/component-config';

export class HumbleBundlePromoConfig extends ComponentConfig {
  public componentId: string = 'humblebundle-promo';
  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    HumbleBundlePromoSlickTrackTaskHandler,
    HumbleBundleChunkEntityListTaskHandler
  ];
}
