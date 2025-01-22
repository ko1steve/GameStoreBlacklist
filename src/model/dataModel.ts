import Pako from 'pako';
import { MiniSignal } from 'mini-signals';
import { MainConfig } from 'src/mainConfig';
import { CommonUtil } from 'src/util/commonUtil';
import { DataStorage, StorageType } from 'src/util/dataStorage';
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

  protected blacklistMap: TSMap<string, string[]>;

  protected debug: boolean;

  public onInitializeBlacklistCompleteSignal: MiniSignal;

  constructor () {
    this.mainConfig = Container.get(MainConfig);
    this.blacklistMap = new TSMap<string, string[]>();
    this.onInitializeBlacklistCompleteSignal = new MiniSignal();
    this.debug = false;
    this.initialize();
  }

  protected async initialize (): Promise<void> {
    await this.initBlacklist();
    await this.initShowBlacklistGame();
    await this.initDebugMode();
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
      this.blacklistMap = new TSMap<string, string[]>();
      const jsonContent = JSON.stringify(Object.fromEntries(this.blacklistMap.entries()));
      await DataStorage.setItem(this.mainConfig.storageNames.blacklist, Array.from(Pako.deflate(jsonContent)));
    } else {
      this.blacklistMap = new TSMap<string, string[]>(Object.entries(JSON.parse(jsonContent)));
    }
  }

  protected async initShowBlacklistGame (): Promise<void> {
    const showBlacklistGames = await DataStorage.getItem(this.mainConfig.storageNames.showblacklistGames);
    if (showBlacklistGames == null) {
      await DataStorage.setItem(this.mainConfig.storageNames.showblacklistGames, true);
      this._showBlacklistGame = true;
    } else {
      this._showBlacklistGame = showBlacklistGames as boolean;
    }
  }

  protected async initDebugMode (): Promise<void> {
    const debug = await DataStorage.getItem(this.mainConfig.storageNames.debug);
    if (debug == null) {
      await DataStorage.setItem(this.mainConfig.storageNames.debug, false);
      this.debug = false;
    } else {
      this.debug = debug as boolean;
    }
  }

  public async addGameToBlacklist (gameTitle: string): Promise<void> {
    return new Promise<void>(resolve => {
      const key = gameTitle[0].toLowerCase();
      if (!this.blacklistMap.has(key)) {
        this.blacklistMap.set(key, [gameTitle]);
      } else {
        const list = this.blacklistMap.get(key)!;
        list.push(gameTitle.toLowerCase());
        this.blacklistMap.set(key, list);
      }
      const jsonContent = JSON.stringify(Object.fromEntries(this.blacklistMap.entries()));
      DataStorage.setItem(this.mainConfig.storageNames.blacklist, Array.from(Pako.deflate(jsonContent))).then(() => {
        CommonUtil.showLog('Add "' + gameTitle + '" to blacklist. ');
        resolve();
      });
    });
  }

  public async removeGameFromBlacklist (gameTitle: string): Promise<void> {
    return new Promise<void>(resolve => {
      const key = gameTitle[0];
      if (!this.blacklistMap.has(key)) {
        return;
      }
      const list = this.blacklistMap.get(key)!;
      const index = list.findIndex(e => e === gameTitle);
      if (index < 0) {
        return;
      }
      list.splice(index, 1);
      this.blacklistMap.set(key, list);
      const jsonContent = JSON.stringify(Object.fromEntries(this.blacklistMap.entries()));
      DataStorage.setItem(this.mainConfig.storageNames.blacklist, Array.from(Pako.deflate(jsonContent))).then(() => {
        CommonUtil.showLog('Removed "' + gameTitle + '" from blacklist. ');
        resolve();
      });
    });
  }

  public getGameStatus (gameTitle: string): boolean {
    gameTitle = gameTitle.toLowerCase();
    const key = gameTitle[0];
    if (!this.blacklistMap.has(key)) {
      return false;
    }
    return this.blacklistMap.get(key)!.includes(gameTitle);
  }
}
