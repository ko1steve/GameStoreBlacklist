import { MiniSignal } from 'mini-signals';
import { MainConfig } from 'src/mainConfig';
import { Container, Singleton } from 'typescript-ioc';
import { PopupMessageDispatcher } from '../util/popupMessageDispatcher';
import { MessageType } from 'src/data/messageData';
import { IPopupInitData } from '../data/popupCommonData';

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
}
