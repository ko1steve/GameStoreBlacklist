import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { FanaticalHitCardsRowTaskHandler } from '../task/hitCardsRow';
import { FanaticalSlickTrackTaskHandler } from '../task/slickTrack';
import { ComponentConfig } from './../../../../core/component/component-config';

export class FanaticalGeneralConfig extends ComponentConfig {
  public componentId: string = 'fanatical-general';

  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    FanaticalHitCardsRowTaskHandler,
    FanaticalSlickTrackTaskHandler
  ];
}
