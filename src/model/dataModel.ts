import { MiniSignal } from 'mini-signals';
import { MainConfig } from 'src/mainConfig';
import { CommonTool } from 'src/util/commonTool';
import { GlobalEventNames, GlobalEventDispatcher } from 'src/util/globalEventDispatcher';
import { Container, Singleton } from 'typescript-ioc';
import { TSMap } from 'typescript-map';

@Singleton
export class DataModel {
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
    CommonTool.showLog('Debug mode turns on.');
    chrome.storage.local.set({ [this.mainConfig.storageNames.debug]: true }).then(() => {
      this.onDebugModeChangeSignal.dispatch();
    });
  }

  private onDebugModeOff (): void {
    CommonTool.showLog('Debug mode turns off.');
    chrome.storage.local.set({ [this.mainConfig.storageNames.debug]: false }).then(() => {
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
    const storageData = await chrome.storage.local.get([this.mainConfig.storageNames.blacklist]);
    const jsonContent = storageData[this.mainConfig.storageNames.blacklist];
    if (!jsonContent) {
      this._blacklistMap = new TSMap<string, string[]>();
    } else {
      this._blacklistMap = new TSMap<string, string[]>(Object.entries(JSON.parse(jsonContent)));
    }
  }

  protected async initShowBlacklistGame (): Promise<void> {
    const storageData = await chrome.storage.local.get([this.mainConfig.storageNames.showblacklistGames]);
    const showBlacklistGames: boolean = storageData[this.mainConfig.storageNames.showblacklistGames];
    if (showBlacklistGames == null) {
      await chrome.storage.local.set({ [this.mainConfig.storageNames.showblacklistGames]: true });
      this._showBlacklistGame = true;
    } else {
      this._showBlacklistGame = showBlacklistGames;
    }
  }

  protected async initDebugMode (): Promise<void> {
    const storageData = await chrome.storage.local.get([this.mainConfig.storageNames.debug]);
    const debug: boolean = storageData[this.mainConfig.storageNames.debug];
    if (debug == null) {
      await chrome.storage.local.set({ [this.mainConfig.storageNames.debug]: false });
      this._debug = false;
    } else {
      this._debug = debug;
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

  public async addGameToBlacklist (gameTitle: string): Promise<void> {
    const key = gameTitle[0].toLowerCase();
    if (!this._blacklistMap.has(key)) {
      this._blacklistMap.set(key, [gameTitle]);
    } else {
      const list = this._blacklistMap.get(key)!;
      list.push(gameTitle.toLowerCase());
      this._blacklistMap.set(key, list);
    }
    await chrome.storage.local.set({ [this.mainConfig.storageNames.blacklist]: JSON.stringify(Object.fromEntries(this._blacklistMap.entries())) });
    CommonTool.showLog('Add "' + gameTitle + '" to blacklist. ');
  }

  public async removeGameFromBlacklist (gameTitle: string): Promise<void> {
    const key = gameTitle[0];
    if (!this._blacklistMap.has(key)) {
      return;
    }
    const list = this._blacklistMap.get(key)!;
    const index = list.findIndex(e => e === gameTitle);
    if (index < 0) {
      return;
    }
    list.splice(index, 1);
    this._blacklistMap.set(key, list);
    await chrome.storage.local.set({ [this.mainConfig.storageNames.blacklist]: JSON.stringify(Object.fromEntries(this._blacklistMap.entries())) });
    CommonTool.showLog('Removed "' + gameTitle + '" from blacklist. ');
  }

  public getGameStatus (gameTitle: string): boolean {
    gameTitle = gameTitle.toLowerCase();
    const key = gameTitle[0];
    if (!this._blacklistMap.has(key)) {
      return false;
    }
    return this._blacklistMap.get(key)!.includes(gameTitle);
  }
}
