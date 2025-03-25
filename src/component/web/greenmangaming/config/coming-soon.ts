import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { GreenManGamingLargeProductBlockTaskHandler } from '../task/large-product-block';
import { GreenManGamingSliderListTaskHandler } from '../task/slider-list';
import { ComponentConfig } from './../../../../core/component/component-config';

export class GreenManGamingComingSoonConfig extends ComponentConfig {
  public componentId: string = 'greenmangaming-coming-soon';
  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    GreenManGamingLargeProductBlockTaskHandler,
    GreenManGamingSliderListTaskHandler
  ];
}
