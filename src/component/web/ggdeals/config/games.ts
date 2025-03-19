import { ComponentConfig, ITextHandleConfig } from './../../../../core/component/component-config';

export class GgdealsGamesConfig extends ComponentConfig {
  public componentId: string = 'ggdeals-games';

  public texthandle: ITextHandleConfig = {
    startWords: [],
    endWords: [],
    cutToEndWords: [
      ' (US)', ' (ROW)', ' (PC)', ' (PC /', ' RoW Steam CD Key', ' EU/NA Steam CD Key', ' EU Steam CD Key', ' NA Steam CD Key', ' Steam CD Key', ' Steam Altergift', ' Steam Gift', ' (Steam)'
    ],
    excludeTitleWords: []
  };
}
