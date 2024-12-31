import { ComponentConfig, ITextHandleConfig } from '../../../../core/componentConfig';

export class GgdealSearchConfig extends ComponentConfig {
  public texthandle: ITextHandleConfig = {
    startWords: [],
    endWords: [],
    cutToEndWords: [
      ' (US)', ' (ROW)', ' (PC)', ' (PC /', ' RoW Steam CD Key', ' EU/NA Steam CD Key', ' EU Steam CD Key', ' NA Steam CD Key', ' Steam CD Key', ' Steam Altergift', ' Steam Gift', ' (Steam)'
    ],
    excludeTitleWords: []
  };

  public isGameListPage: boolean = true;
}
