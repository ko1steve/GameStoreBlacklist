import { Singleton } from 'typescript-ioc';

export interface IMainConfig {
  storageNames: IStorageNames;
}

export interface IStorageNames {
  blacklist: string;
  showblacklistGames: string;
  debug: string;
}

@Singleton
export class MainConfig implements IMainConfig {
  public storageNames: IStorageNames = {
    blacklist: 'Blacklist',
    showblacklistGames: 'ShowBlacklistdGames',
    debug: 'Debug'
  };
}
