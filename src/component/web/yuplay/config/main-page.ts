import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { YuplayComingSoonTaskHandler } from '../task/coming-soon';
import { YuplayJustArrivedTaskHandler } from '../task/just-arrived';
import { YuplayMidweekMadnessTaskHandler } from '../task/midweek-madness';
import { YuplayMostWantedTaskHandler } from '../task/most-wanted';
import { YuplayRecommendedTaskHandler } from '../task/recommended';
import { ComponentConfig, ITextHandleConfig } from './../../../../core/component/component-config';

export class YuplayMainPageConfig extends ComponentConfig {
  public componentId: string = 'yuplay-main-page';
  public texthandle: ITextHandleConfig = {
    startWords: [],
    endWords: [],
    cutToEndWords: ['(Xbox '],
    excludeTitleWords: []
  };

  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    YuplayRecommendedTaskHandler,
    YuplayMostWantedTaskHandler,
    YuplayMidweekMadnessTaskHandler,
    YuplayJustArrivedTaskHandler,
    YuplayComingSoonTaskHandler
  ];
}
