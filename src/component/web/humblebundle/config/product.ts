import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { HumbleBundleProductTaskHandler } from '../task/product';
import { HumbleBundleRecommendSlickTrackTaskHandler } from '../task/recommend-slick-track';
import { ComponentConfig } from './../../../../core/component/component-config';

export class HumbleBundleProductConfig extends ComponentConfig {
  public componentId: string = 'humblebundle-product';
  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    HumbleBundleProductTaskHandler,
    HumbleBundleRecommendSlickTrackTaskHandler
  ];
}
