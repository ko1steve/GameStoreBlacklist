import { ComponentConfig, ITextHandleConfig } from './../../../../core/componentConfig';

export class YuplayProductConfig extends ComponentConfig {
  public texthandle: ITextHandleConfig = {
    startWords: [],
    endWords: [],
    cutToEndWords: ['(Xbox '],
    excludeTitleWords: []
  };
}
