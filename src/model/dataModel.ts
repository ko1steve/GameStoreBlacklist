import { MiniSignal } from 'mini-signals';
import { MainConfig } from 'src/mainConfig';
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

  public updateShowBlacklistGameSignal: MiniSignal;

  private _prevNumberOfGame: number;
  private _numberOfGame: number;
  public get numberOfGame (): number {
    return this._numberOfGame;
  }

  public updateNumberOfGameSignal: MiniSignal;

  private _blacklistMap: TSMap<string, string[]>;
  public get blacklistMap (): TSMap<string, string[]> {
    return this._blacklistMap;
  }

  private _debug: boolean;
  public get debug (): boolean {
    return this._debug;
  }

  public set debug (value: boolean) {
    this._debug = value;
  }

  constructor () {
    this.mainConfig = Container.get(MainConfig);
    this._blacklistMap = new TSMap<string, string[]>();
    this.updateShowBlacklistGameSignal = new MiniSignal();
    this.updateNumberOfGameSignal = new MiniSignal();
    this._prevNumberOfGame = 0;
    this._numberOfGame = 0;
    this._debug = false;
    this.initBlacklist();
  }

  protected async initBlacklist (): Promise<void> {
    let storageData = await chrome.storage.local.get([this.mainConfig.storageNames.blacklist]);
    const jsonContent = storageData[this.mainConfig.storageNames.blacklist];
    if (!jsonContent) {
      this._blacklistMap = new TSMap<string, string[]>();
    } else {
      this._blacklistMap = new TSMap<string, string[]>(Object.entries(JSON.parse(jsonContent)));
    }
    this.updateNumberOfGame();
    storageData = await chrome.storage.local.get([this.mainConfig.storageNames.showblacklistGames]);
    const showBlacklistGames: boolean = storageData[this.mainConfig.storageNames.showblacklistGames];
    if (showBlacklistGames == null) {
      await chrome.storage.local.set({ [this.mainConfig.storageNames.showblacklistGames]: true });
      this._showBlacklistGame = true;
    } else {
      this._showBlacklistGame = showBlacklistGames;
    }
    this.updateShowBlacklistGameSignal.dispatch(this._showBlacklistGame);
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
}
