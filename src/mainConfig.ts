import { Singleton } from 'typescript-ioc';

export interface IMainConfig {
  storageNames: {
    blacklist: string,
    showblacklistGames: string
    debug: string
  }
}

@Singleton
export class MainConfig implements IMainConfig {
  public storageNames = {
    blacklist: 'Blacklist',
    showblacklistGames: 'ShowBlacklistdGames',
    debug: 'Debug'
  };
}
