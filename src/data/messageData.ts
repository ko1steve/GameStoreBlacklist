export enum MessageType {
  SHOW_LOG = 'SHOW_LOG',
  NORMALIZATION_BLACKLIST_DATA = 'NORMALIZATION_BLACKLIST_DATA',
  SHOW_BLACKLIST_GAMES = 'SHOW_BLACKLIST_GAMES',
  UPDATE_BLACKLIST = 'UPDATE_BLACKLIST'
}

export type Message = IShowBlacklistGameMessage | IUpdateBlacklistMessage | INormallizationBlacklistDataMessage | IShowLogMessage;

export interface IShowBlacklistGameMessage {
  name: MessageType.SHOW_BLACKLIST_GAMES;
  data: {
    show: boolean
  };
}

export interface IUpdateBlacklistMessage {
  name: MessageType.UPDATE_BLACKLIST;
  data: {
    jsonContent: string
  };
}

export interface INormallizationBlacklistDataMessage {
  name: MessageType.NORMALIZATION_BLACKLIST_DATA;
}

export interface IShowLogMessage {
  name: MessageType.SHOW_LOG;
  data: {
    param: any,
    optionalParams?: any[]
  }
}
