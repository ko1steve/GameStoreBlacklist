import { MiniSignal } from 'mini-signals';
import Pako from 'pako';
import { MainConfig } from 'src/mainConfig';
import { CommonUtil } from 'src/util/commonUtil';
import { DataStorage, StorageType } from 'src/util/dataStorage';
import { GlobalEventNames, GlobalEventDispatcher } from 'src/util/globalEventDispatcher';
import { Container, Singleton } from 'typescript-ioc';
import { TSMap } from 'typescript-map';

@Singleton
export class PopupDataModel {
  protected mainConfig: MainConfig;

  private _showBlacklistGame: boolean = true;
  public get showBlacklistGame (): boolean {
    return this._showBlacklistGame;
  }

  public set showBlacklistGame (value: boolean) {
    this._showBlacklistGame = value;
  }

  public onInitializeBlacklistCompleteSignal: MiniSignal;

  private _prevNumberOfGame: number;
  private _numberOfGame: number;
  public get numberOfGame (): number {
    return this._numberOfGame;
  }

  public updateNumberOfGameSignal: MiniSignal;

  private _blacklistMap: TSMap<string, string[]>;

  private _debug: boolean;
  public get debug (): boolean {
    return this._debug;
  }

  public onDebugModeChangeSignal: MiniSignal;

  constructor () {
    this.mainConfig = Container.get(MainConfig);
    this._blacklistMap = new TSMap<string, string[]>();
    this.onInitializeBlacklistCompleteSignal = new MiniSignal();
    this.updateNumberOfGameSignal = new MiniSignal();
    this.onDebugModeChangeSignal = new MiniSignal();
    this._prevNumberOfGame = 0;
    this._numberOfGame = 0;
    this._debug = false;
    this.initialize().then(() => {
      this.addListener();
    });
  }

  protected addListener (): void {
    GlobalEventDispatcher.addListener(GlobalEventNames.DEBUG_MODE_ON, this.onDebugModeOn.bind(this));
    GlobalEventDispatcher.addListener(GlobalEventNames.DEBUG_MODE_OFF, this.onDebugModeOff.bind(this));
  }

  private onDebugModeOn (): void {
    CommonUtil.showLog('Debug mode turns on.');
    DataStorage.setItem(this.mainConfig.storageNames.debug, true).then(() => {
      this.onDebugModeChangeSignal.dispatch();
    });
  }

  private onDebugModeOff (): void {
    CommonUtil.showLog('Debug mode turns off.');
    DataStorage.setItem(this.mainConfig.storageNames.debug, false).then(() => {
      this.onDebugModeChangeSignal.dispatch();
    });
  }

  protected async initialize (): Promise<void> {
    await this.initBlacklist();
    await this.initShowBlacklistGame();
    await this.initDebugMode();
    this.updateNumberOfGame();
    this.onInitializeBlacklistCompleteSignal.dispatch();
  }

  protected async initBlacklist (): Promise<void> {
    const blacklistData: StorageType | undefined = await DataStorage.getItem(this.mainConfig.storageNames.blacklist);
    let jsonContent: string | undefined;
    if (blacklistData instanceof Array) {
      /** version 1.8 and above */
      jsonContent = Pako.inflate(Uint8Array.from(blacklistData), { to: 'string' });
    } else if (typeof blacklistData === 'string') {
      /** version 1.7.1 and below */
      jsonContent = blacklistData;
      await DataStorage.setItem(this.mainConfig.storageNames.blacklist, Array.from(Pako.deflate(jsonContent)));
    }
    if (!jsonContent) {
      this._blacklistMap = new TSMap<string, string[]>();
      const jsonContent = JSON.stringify(Object.fromEntries(this._blacklistMap.entries()));
      await DataStorage.setItem(this.mainConfig.storageNames.blacklist, Array.from(Pako.deflate(jsonContent)));
    } else {
      this._blacklistMap = new TSMap<string, string[]>(Object.entries(JSON.parse(jsonContent)));
    }
  }

  protected async initShowBlacklistGame (): Promise<void> {
    const showBlacklistGames = await DataStorage.getItem(this.mainConfig.storageNames.showblacklistGames);
    if (showBlacklistGames == null) {
      const defaultValue = this.mainConfig.storageDefault.showblacklistGames
      await DataStorage.setItem(this.mainConfig.storageNames.showblacklistGames, defaultValue);
      this._showBlacklistGame = defaultValue;
    } else {
      this._showBlacklistGame = showBlacklistGames as boolean;
    }
  }

  protected async initDebugMode (): Promise<void> {
    const debug = await DataStorage.getItem(this.mainConfig.storageNames.debug);
    if (debug == null) {
      const defaultValue = this.mainConfig.storageDefault.showblacklistGames
      await DataStorage.setItem(this.mainConfig.storageNames.debug, defaultValue);
      this._debug = defaultValue;
    } else {
      this._debug = debug as boolean;
    }
  }

  public updateNumberOfGame (): void {
    this._prevNumberOfGame = this._numberOfGame;
    this._numberOfGame = 0;
    this._blacklistMap.forEach(list => {
      this._numberOfGame += list.length;
    });
    if (this._numberOfGame !== this._prevNumberOfGame) {
      this.updateNumberOfGameSignal.dispatch(this._numberOfGame);
    }
  }

  public async normalizationBlacklistData (): Promise<void> {
    const entries = this._blacklistMap.entries();
    for (let i = 0; i < entries.length; i++) {
      const capital = entries[i][0] as string;
      const gameList = entries[i][1] as string[];
      for (const j in gameList) {
        gameList[j] = gameList[j].toLowerCase();
      }
      const lowerCapital = capital.toLowerCase();
      if (capital !== lowerCapital) {
        const lowerCaseEntry = entries.find(entry => entry[0] === lowerCapital);
        if (lowerCaseEntry) {
          (lowerCaseEntry[1] as string[]).push(...gameList);
        } else {
          entries.push([lowerCapital, [...gameList]]);
        }
        entries.splice(+i, 1);
        i--;
      }
    }
    const newJsonContent = JSON.stringify(Object.fromEntries(entries));
    await DataStorage.setItem(this.mainConfig.storageNames.blacklist, Array.from(Pako.deflate(newJsonContent)));
    chrome.tabs.reload();
  }
}
