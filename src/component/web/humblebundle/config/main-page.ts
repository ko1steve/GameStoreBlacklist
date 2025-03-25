import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { HumbleBundleSlickTrackTaskHandler } from '../task/slick-track';
import { HumbleBundleThreeTaskHandler } from '../task/three';
import { ComponentConfig } from './../../../../core/component/component-config';

export class HumbleBundleMainPageConfig extends ComponentConfig {
  public componentId: string = 'humblebundle-main-page';
  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    HumbleBundleThreeTaskHandler,
    HumbleBundleSlickTrackTaskHandler
  ];
}
