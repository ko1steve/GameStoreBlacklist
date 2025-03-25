import { ComponentConfig, ITextHandleConfig } from '../../../../core/component/component-config';
import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { GgdealsDealsListItemsTaskHandler } from '../task/deals-list-items';

export class GgdealsDealsConfig extends ComponentConfig {
  public componentId: string = 'ggdeals-deals';
  public texthandle: ITextHandleConfig = {
    startWords: [],
    endWords: [],
    cutToEndWords: [
      ' (US)', ' (ROW)', ' (PC)', ' (PC /', ' RoW Steam CD Key', ' EU/NA Steam CD Key', ' EU Steam CD Key', ' NA Steam CD Key', ' Steam CD Key', ' Steam Altergift', ' Steam Gift', ' (Steam)'
    ],
    excludeTitleWords: []
  };

  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    GgdealsDealsListItemsTaskHandler
  ];
}
