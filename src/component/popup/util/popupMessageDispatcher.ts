import { Singleton } from 'typescript-ioc';
import { Message } from 'src/data/messageData';
import { MessageDispatcher } from 'src/util/messageDispatcher';

@Singleton
export class PopupMessageDispatcher extends MessageDispatcher {
}

chrome.runtime.onMessage.addListener((message: Message, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
  if (!PopupMessageDispatcher.messageMap.has(message.name)) {
    return;
  }
  PopupMessageDispatcher.messageMap.get(message.name).forEach(callback => callback(message, sender, sendResponse));
});
