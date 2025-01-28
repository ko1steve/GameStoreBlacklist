import { MessageType } from 'src/data/messageData';
import { PopupMessageDispatcher } from './popupMessageDispatcher';

export class PopupCommonUtil {
  public static showLog (param: any, ...optionalParams: any[]): void {
    if (optionalParams && optionalParams.length > 0) {
      PopupMessageDispatcher.sendTabMessage({ name: MessageType.SHOW_LOG, data: { param, optionalParams } });
    } else {
      PopupMessageDispatcher.sendTabMessage({ name: MessageType.SHOW_LOG, data: { param } });
    }
  }
}
