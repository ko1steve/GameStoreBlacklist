import { ComponentConfig, ITextHandleConfig } from './../../../../core/component-config';

export class YuplayMainPageConfig extends ComponentConfig {
  public texthandle: ITextHandleConfig = {
    startWords: [],
    endWords: [],
    cutToEndWords: ['(Xbox '],
    excludeTitleWords: []
  };
}
