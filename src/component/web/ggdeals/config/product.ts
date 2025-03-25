import { TaskHandler } from '../../../../core/task/task-handler';
import { DataModel } from '../../../../model/data-model';
import { GgdealsProductTaskHandler } from '../task/product';
import { ComponentConfig, ICheckBoxContainer } from './../../../../core/component/component-config';

export class GgdealsProductConfig extends ComponentConfig {
  public componentId: string = 'ggdeals-product';
  public checkboxContainer: ICheckBoxContainer = {
    className: 'checkboxContainer-right',
    checkbox: {
      className: 'checkboxImg',
      sourceName: 'image/checkbox_across_enabled.png',
      disabledSourceName: 'image/checkbox_across_disabled.png',
      action: 'actionCheckboxEnabled',
      disabledAction: 'actionCheckboxDisabled'
    }
  };

  public taskClasses: (new (componentConfig: ComponentConfig, dataModel: DataModel) => TaskHandler)[] = [
    GgdealsProductTaskHandler
  ];
}
