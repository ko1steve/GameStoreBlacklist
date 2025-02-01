import { Singleton } from 'typescript-ioc';
import { Message, MessageType } from 'src/data/messageData';
import { MessageDispatcher } from 'src/util/messageDispatcher';

@Singleton
export class PopupMessageDispatcher extends MessageDispatcher {
  protected static async showLog (param: any, ...optionalParams: any[]): Promise<void> {
    if (!this.testScriptLoaded()) {
      return;
    }
    if (!chrome.runtime.onMessage.hasListeners()) {
      return;
    }
    const message: Message = { name: MessageType.SHOW_LOG, data: { param } };
    if (optionalParams && optionalParams.length > 0) {
      message.data.optionalParams = optionalParams;
    }
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.id === undefined) {
      return Promise.reject(new Error('Can\'t get the tab id'));
    }
    return chrome.tabs.sendMessage(tab.id!, message);
  }
}

chrome.runtime.onMessage.addListener((message: Message, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
  if (!PopupMessageDispatcher.messageMap.has(message.name)) {
    return;
  }
  PopupMessageDispatcher.messageMap.get(message.name).forEach(callback => callback(message, sender, sendResponse));
});
