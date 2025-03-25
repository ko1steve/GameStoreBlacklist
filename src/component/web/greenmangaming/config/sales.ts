import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { GreenManGamingMediumProductBlockModuleContentTaskHandler } from '../task/medium-product-block-module-content';
import { GreenManGamingThirdOneBlockTaskHandler } from '../task/third-one-block';
import { ComponentConfig, ITextHandleConfig } from './../../../../core/component/component-config';

export class GreenManGamingSalesConfig extends ComponentConfig {
  public componentId: string = 'greenmangaming-sales';
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
    GreenManGamingMediumProductBlockModuleContentTaskHandler,
    GreenManGamingThirdOneBlockTaskHandler

  ];
}
