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
}
