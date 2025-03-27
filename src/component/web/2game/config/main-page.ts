import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { ComponentConfig } from './../../../../core/component/component-config';
import { TwoGameSliderWidgetCardWrapperTaskHandler } from '../task/slider-widget-card-wrapper';
import { TwoGameProductListPageTaskHandler } from '../task/product-list-page';

export class TwoGameMainPageConfig extends ComponentConfig {
  public componentId: string = '2game-main-page';
  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    TwoGameSliderWidgetCardWrapperTaskHandler,
    TwoGameProductListPageTaskHandler
  ];
}
