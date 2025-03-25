import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { GreenManGamingMediumProductBlockModuleContentTaskHandler } from '../task/medium-product-block-module-content';
import { ComponentConfig, ITextHandleConfig } from './../../../../core/component/component-config';

export class GreenManGamingMainPageConfig extends ComponentConfig {
  public componentId: string = 'greenmangaming-main-page';
  public texthandle: ITextHandleConfig = {
    startWords: [],
    endWords: ['- PC'],
    cutToEndWords: [],
    excludeTitleWords: [],
    excludeClassNames: [
      '/publisher-sale/', '/spring-sale/'
    ]
  };

  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    GreenManGamingMediumProductBlockModuleContentTaskHandler
  ];
}
