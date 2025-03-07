import { ComponentConfig, ITextHandleConfig } from './../../../../core/component-config';

export class YuplayProductConfig extends ComponentConfig {
  public componentId: string = 'yuplay-product';
  public texthandle: ITextHandleConfig = {
    startWords: [],
    endWords: [],
    cutToEndWords: ['(Xbox '],
    excludeTitleWords: []
  };
}
