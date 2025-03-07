import { ComponentConfig, ITextHandleConfig } from './../../../../core/component-config';

export class YuplayMainPageConfig extends ComponentConfig {
  public componentId: string = 'yuplay-main-page';
  public texthandle: ITextHandleConfig = {
    startWords: [],
    endWords: [],
    cutToEndWords: ['(Xbox '],
    excludeTitleWords: []
  };
}
