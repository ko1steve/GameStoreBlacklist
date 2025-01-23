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

  /**
   * Normalize blacklist data below version 1.7.0 to 1.8.0
   *
   * @return {*}  {Promise<void>}
   * @memberof PopupDataModel
   */
  public async normalizationBlacklistData (): Promise<void> {
    // const entries = this.blacklistMap.entries();
    // for (let i = 0; i < entries.length; i++) {
    //   const capital = entries[i][0] as string;
    //   const gameList = entries[i][1] as string[];
    //   for (const j in gameList) {
    //     gameList[j] = gameList[j].toLowerCase();
    //   }
    //   const lowerCapital = capital.toLowerCase();
    //   if (capital !== lowerCapital) {
    //     const lowerCaseEntry = entries.find(entry => entry[0] === lowerCapital);
    //     if (lowerCaseEntry) {
    //       (lowerCaseEntry[1] as string[]).push(...gameList);
    //     } else {
    //       entries.push([lowerCapital, [...gameList]]);
    //     }
    //     entries.splice(+i, 1);
    //     i--;
    //   }
    // }
    // const newJsonContent = JSON.stringify(Object.fromEntries(entries));
    // await DataStorage.setItem(this.mainConfig.storageNames.blacklist, Array.from(Pako.deflate(newJsonContent)));
    // chrome.tabs.reload();
  }
}
