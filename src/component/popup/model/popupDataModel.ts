import { Container, Singleton } from 'typescript-ioc';
import { MiniSignal } from 'mini-signals';
import { MainConfig } from './../../../mainConfig';
import { PopupMessageDispatcher } from './../util/popupMessageDispatcher';
import { MessageType } from './../../../data/messageData';
import { IPopupInitData } from './../data/popupCommonData';

@Singleton
export class PopupDataModel {
  protected mainConfig: MainConfig;

  protected numberOfGame: number;

  private _showBlacklistGame: boolean = true;
  public get showBlacklistGame (): boolean {
    return this._showBlacklistGame;
  }

  public set showBlacklistGame (value: boolean) {
    this._showBlacklistGame = value;
  }

  protected debug: boolean;

  public onInitializeBlacklistCompleteSignal: MiniSignal;

  constructor () {
    this.mainConfig = Container.get(MainConfig);
    this.onInitializeBlacklistCompleteSignal = new MiniSignal();
    this.numberOfGame = 0;
    this.debug = false;
    this.initialize();
  }

  protected async initialize (): Promise<void> {
    const initData = await this.getPopupInitData();
    if (!initData) {
      return;
    }
    this.showBlacklistGame = initData.showBlacklistGame;
    this.numberOfGame = initData.numberOfGame;
    this.debug = initData.debug;
    this.onInitializeBlacklistCompleteSignal.dispatch(initData);
  }

  protected getPopupInitData (): Promise<IPopupInitData> {
    return new Promise<IPopupInitData>(resolve => {
      PopupMessageDispatcher.sendTabMessage({ name: MessageType.REQUEST_POPUP_INIT_DATA }, (response: IPopupInitData) => {
        resolve(response);
      });
    });
  }

  public fixDataCaseSensitive (): void {
    PopupMessageDispatcher.sendTabMessage({
      name: MessageType.FIX_DATA_CASE_SENSITIVE
    });
  }

  public clearLocalStorageData (): void {
    PopupMessageDispatcher.sendTabMessage({
      name: MessageType.CLEAR_LOCAL_STORAGE_DATA
    });
  }

  public clearSyncStorageData (): void {
    PopupMessageDispatcher.sendTabMessage({
      name: MessageType.CLEAR_SYNC_STORAGE_DATA
    });
  }
}
