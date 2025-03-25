import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { GreenManGamingLargeProductBlockExcludeFirstTaskHandler } from '../task/large-product-block-exclude-first';
import { GreenManGamingMediumProductBlockModuleContentTaskHandler } from '../task/medium-product-block-module-content';
import { ComponentConfig } from './../../../../core/component/component-config';

export class GreenManGamingMainPageConfig extends ComponentConfig {
  public componentId: string = 'greenmangaming-main-page';
  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    GreenManGamingLargeProductBlockExcludeFirstTaskHandler,
    GreenManGamingMediumProductBlockModuleContentTaskHandler
  ];
}
