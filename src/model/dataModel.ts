import Pako from 'pako';
import { TSMap } from 'typescript-map';
import { MiniSignal } from 'mini-signals';
import { Container, Singleton } from 'typescript-ioc';
import { MainConfig } from './../mainConfig';
import { CommonUtil } from './../util/commonUtil';
import { StringFormatter } from './../util/stringFormatter';
import { DataStorage, DataVersion, StorageDataType, StorageType } from './../util/dataStorage';

@Singleton
export class DataModel {
  protected mainConfig: MainConfig;

  protected blacklistMap: TSMap<string, string[]>;

  private _numberOfGame: number;
  public get numberOfGame (): number {
    return this._numberOfGame;
  }

  private _showBlacklistGame: boolean = true;
  public get showBlacklistGame (): boolean {
    return this._showBlacklistGame;
  }

  private _debug: boolean;
  public get debug (): boolean {
    return this._debug;
  }

  protected tempLegacyBlacklistData: string;

  protected dataVersion: DataVersion;

  public onInitializeBlacklistCompleteSignal: MiniSignal;

  constructor () {
    this.mainConfig = Container.get(MainConfig);
    this.blacklistMap = new TSMap<string, string[]>();
    this.onInitializeBlacklistCompleteSignal = new MiniSignal();
    this.dataVersion = DataVersion.V_180_ABOVE;
    this.tempLegacyBlacklistData = StringFormatter.EMPTY_STRING;
    this._numberOfGame = 0;
    this._debug = false;
    this.initialize();
  }

  protected async initialize (): Promise<void> {
    await this.initBlacklist();
    await this.initShowBlacklistGame();
    await this.initDebugMode();
    this.initNumberOfGame();
    this.onInitializeBlacklistCompleteSignal.dispatch();
  }

  protected async initBlacklist (): Promise<void> {
    const blacklistData: StorageType | undefined = await this.getBlacklistDataFromStorage();
    let jsonContent: string | undefined;
    if (blacklistData instanceof Array) {
      /** version 1.8 and above */
      jsonContent = Pako.inflate(Uint8Array.from(blacklistData), { to: 'string' });
    } else if (typeof blacklistData === 'string') {
      /** version 1.7.1 and below */
      this.dataVersion = DataVersion.V_171_BELOW;
      jsonContent = blacklistData;
    }
    if (!jsonContent) {
      this.blacklistMap = new TSMap<string, string[]>();
    } else {
      this.blacklistMap = new TSMap<string, string[]>(Object.entries(JSON.parse(jsonContent)));
      if (this.dataVersion === DataVersion.V_171_BELOW) {
        await this.clearLegacyStorageData();
        await this.updateBlacklistDataToStorage();
      }
    }
  }

  protected async initShowBlacklistGame (): Promise<void> {
    const showBlacklistGames = await DataStorage.getItem(this.mainConfig.storageNames.showblacklistGames);
    if (showBlacklistGames === undefined) {
      await DataStorage.setItem(this.mainConfig.storageNames.showblacklistGames, true);
      this._showBlacklistGame = true;
    } else {
      this._showBlacklistGame = showBlacklistGames as boolean;
    }
  }

  protected async initDebugMode (): Promise<void> {
    const debug = await DataStorage.getItem(this.mainConfig.storageNames.debug);
    if (debug === undefined) {
      await DataStorage.setItem(this.mainConfig.storageNames.debug, false);
      this._debug = false;
    } else {
      this._debug = debug as boolean;
    }
  }

  protected initNumberOfGame (): void {
    this._numberOfGame = 0;
    this.blacklistMap.forEach(list => {
      this._numberOfGame += list.length;
    });
  }

  public async addGameToBlacklist (gameTitle: string): Promise<void> {
    return new Promise<void>(resolve => {
      const lowerCaseTitle = gameTitle.toLowerCase();
      const key = lowerCaseTitle[0];
      if (!this.blacklistMap.has(key)) {
        this.blacklistMap.set(key, [lowerCaseTitle]);
      } else {
        const list = this.blacklistMap.get(key)!;
        list.push(lowerCaseTitle);
        this.blacklistMap.set(key, list);
      }
      this.updateBlacklistDataToStorage().then(() => {
        CommonUtil.showLog('Add "' + gameTitle + '" to blacklist. ');
        this._numberOfGame++;
        resolve();
      });
    });
  }

  public async removeGameFromBlacklist (gameTitle: string): Promise<void> {
    return new Promise<void>(resolve => {
      const lowerCaseTitle = gameTitle.toLowerCase();
      const key = lowerCaseTitle[0];
      if (!this.blacklistMap.has(key)) {
        return;
      }
      const list = this.blacklistMap.get(key)!;
      const index = list.findIndex(e => e === lowerCaseTitle);
      if (index < 0) {
        return;
      }
      list.splice(index, 1);
      this.blacklistMap.set(key, list);

      this.updateBlacklistDataToStorage().then(() => {
        CommonUtil.showLog('Remove "' + gameTitle + '" to blacklist. ');
        this._numberOfGame--;
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

  protected async updateBlacklistDataToStorage (jsonContent?: string): Promise<void> {
    let saveChunks: number = 0;
    const base64Chunks = this.getBlacklistJsonChunk(jsonContent);
    if (base64Chunks.length === 0) {
      return await this.recoverLegacyBlacklistData();
    }
    for (let i = 0; i < base64Chunks.length; i++) {
      try {
        await DataStorage.setItem(this.mainConfig.storageNames.blacklist + '_' + i.toString(), base64Chunks[i]);
        saveChunks++;
      } catch (ex) {
        console.error(ex);
        CommonUtil.showLog('DataStorage.setItem "Blacklist_' + i.toString() + '" failed.');
        break;
      }
    }
    if (saveChunks === base64Chunks.length) {
      await DataStorage.setItem(this.mainConfig.storageNames.blacklistChunks, saveChunks);
    } else {
      for (let i = 0; i < saveChunks; i++) {
        await DataStorage.remove(this.mainConfig.storageNames.blacklist + '_' + i.toString());
        await DataStorage.remove(this.mainConfig.storageNames.blacklistChunks);
      }
      await this.recoverLegacyBlacklistData();
    }
    this.dataVersion = DataVersion.V_180_ABOVE;
  }

  protected async clearLegacyStorageData (): Promise<void> {
    if (this.dataVersion === DataVersion.V_171_BELOW) {
      /** Clear data below version 1.7.0 */
      const jsonContent = await DataStorage.getItem(this.mainConfig.storageNames.blacklist);
      this.tempLegacyBlacklistData = jsonContent as string;
      await DataStorage.remove(this.mainConfig.storageNames.blacklist, 'all');
    } else if (this.dataVersion === DataVersion.V_180_ABOVE) {
      const numberOfChunkData: StorageType | undefined = await DataStorage.getItem(this.mainConfig.storageNames.blacklistChunks);
      if (numberOfChunkData !== undefined) {
        const numberOfChunk: number = numberOfChunkData as number;
        for (let i = 0; i < numberOfChunk; i++) {
          await DataStorage.remove(this.mainConfig.storageNames.blacklist + '_' + i.toString(), 'all');
        }
      }
    }
  }

  protected async getBlacklistDataFromStorage (): Promise<StorageType | undefined> {
    const numberOfChunkData: StorageType | undefined = await DataStorage.getItem(this.mainConfig.storageNames.blacklistChunks);
    if (!numberOfChunkData) {
      return await DataStorage.getItem(this.mainConfig.storageNames.blacklist);
    }
    const numberOfChunk: number = numberOfChunkData as number;
    let base64FullData: string = '';
    for (let i = 0; i < numberOfChunk; i++) {
      const base64Chunk = await DataStorage.getItem(this.mainConfig.storageNames.blacklist + '_' + i.toString());
      if (!base64Chunk) {
        return [];
      }
      base64FullData += base64Chunk as string;
    }
    const uint8ArrayData = StringFormatter.stringToUint8Array(atob(base64FullData as string));
    return Array.from(uint8ArrayData);
  }

  protected getBlacklistJsonChunk (jsonContent?: string): string[] {
    if (!jsonContent) {
      jsonContent = JSON.stringify(Object.fromEntries(this.blacklistMap.entries()));
    }
    const compressedDataUint8Arr = Pako.deflate(jsonContent);
    const base64Data = btoa(StringFormatter.uint8ArrayToString(compressedDataUint8Arr));
    const chunkSize = DataStorage.MAX_STORAGE_BYTE_PER_KEY;
    const base64DataChunks: string[] = this.chunkStringToArray(base64Data, chunkSize);
    for (let i = 0; i < base64DataChunks.length; i++) {
      const blob = new Blob([base64DataChunks[i]], { type: 'text/plain' });
      CommonUtil.showLog('Blob [' + i + '] size : ' + blob.size);
      if (blob.size > DataStorage.MAX_STORAGE_BYTE_PER_KEY) {
        CommonUtil.showLog('Data size too big. Failed to update blacklist.');
        return [];
      }
    }
    return base64DataChunks;
  }

  protected async recoverLegacyBlacklistData (): Promise<void> {
    if (this.tempLegacyBlacklistData !== StringFormatter.EMPTY_STRING) {
      await DataStorage.setItem(this.mainConfig.storageNames.blacklist, this.tempLegacyBlacklistData);
      this.tempLegacyBlacklistData = StringFormatter.EMPTY_STRING;
    }
  }

  protected chunkStringToArray (base64Data: string, chunkSize: number, start: number = 0, chunks: string[] = []): string[] {
    if (start === base64Data.length) {
      return chunks;
    }
    const end: number = (start + chunkSize < base64Data.length) ? start + chunkSize : base64Data.length;
    chunks.push(base64Data.slice(start, end));
    return this.chunkStringToArray(base64Data, chunkSize, end, chunks);
  }

  public getBlacklistData (): Promise<string> {
    return new Promise<string>(resolve => {
      resolve(JSON.stringify(Object.fromEntries(this.blacklistMap.entries())));
    });
  }

  public async updateBlacklistDataFromPopup (content: string): Promise<void> {
    await this.clearLegacyStorageData();
    await this.updateBlacklistDataToStorage(content);
  }

  public updateShowBlacklistGame (show: boolean): Promise<void> {
    return new Promise<void>(resolve => {
      DataStorage.setItem(this.mainConfig.storageNames.showblacklistGames, show).then(() => {
        resolve();
      });
    });
  }

  public updateDebugMode (debug: boolean): Promise<void> {
    return new Promise<void>(resolve => {
      this._debug = debug;
      DataStorage.setItem(this.mainConfig.storageNames.debug, debug).then(() => {
        resolve();
      });
    });
  }

  public clearData (type: StorageDataType = 'all'): Promise<void> {
    return new Promise<void>(resolve => {
      DataStorage.clear(type).then(() => {
        resolve();
      });
    });
  }

  public async showAllBlaclistData (): Promise<void> {
    await DataStorage.getItem(this.mainConfig.storageNames.blacklist, 'local').then((storageData) => {
      CommonUtil.showLog('Local blacklist data : ' + storageData);
    });
    await DataStorage.getItem(this.mainConfig.storageNames.blacklist, 'sync').then((storageData) => {
      CommonUtil.showLog('Sync blacklist data : ' + storageData);
    });
  }

  public async fixDataCaseSensitive (): Promise<void> {
    const entries = this.blacklistMap.entries();
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
  }
}
