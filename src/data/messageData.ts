export enum MessageType {
  REQUEST_POPUP_INIT_DATA = 'REQUEST_POPUP_INIT_DATA',
  FIX_DATA_CASE_SENSITIVE = 'FIX_DATA_CASE_SENSITIVE',
  SHOW_LOG = 'SHOW_LOG'
}

export type Message = IRequestPopupInitDataMessage | IFixDataCaseSensitiveMessage | IShowLogMessage;

export interface IRequestPopupInitDataMessage {
  name: MessageType.REQUEST_POPUP_INIT_DATA;
}

export interface IFixDataCaseSensitiveMessage {
  name: MessageType.FIX_DATA_CASE_SENSITIVE;
}

export interface IShowLogMessage {
  name: MessageType.SHOW_LOG;
  data: {
    param: any,
    optionalParams?: any[]
  }
}
