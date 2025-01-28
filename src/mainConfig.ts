import { Singleton } from 'typescript-ioc';

export interface IMainConfig {
  storageNames: IStorageNames;
  storageDefault: IStorageDefault;
}

export interface IStorageNames {
  blacklist: string;
  blacklistChunks: string;
  showblacklistGames: string;
  debug: string;
}

export interface IStorageDefault {
  showblacklistGames: boolean;
  debug: boolean;
}

@Singleton
export class MainConfig implements IMainConfig {
  public storageNames: IStorageNames = {
    blacklist: 'Blacklist',
    blacklistChunks: 'BlacklistChunks',
    showblacklistGames: 'ShowBlacklistdGames',
    debug: 'Debug'
  };

  public storageDefault: IStorageDefault = {
    showblacklistGames: true,
    debug: false
  };
}
