export enum MessageType {
  REQUEST_POPUP_INIT_DATA = 'REQUEST_POPUP_INIT_DATA',
  NORMALIZATION_BLACKLIST_DATA = 'NORMALIZATION_BLACKLIST_DATA',
  SHOW_LOG = 'SHOW_LOG'
}

export type Message = IRequestPopupInitDataMessage | INormallizationBlacklistDataMessage | IShowLogMessage;

export interface IRequestPopupInitDataMessage {
  name: MessageType.REQUEST_POPUP_INIT_DATA;
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
