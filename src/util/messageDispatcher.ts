import { Message, MessageType } from 'src/data/messageData';
import { Singleton } from 'typescript-ioc';
import { TSMap } from 'typescript-map';

export type MessageListenerCallback = (message: Message, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => void;

@Singleton
export class MessageDispatcher {
  public static messageMap: TSMap<MessageType, MessageListenerCallback[]> = new TSMap();

  public static async sendTabMessage (message: Message, responseCallback?: (response: any) => void): Promise<any> {
    if (!this.testScriptLoaded()) {
      return;
    }
    if (!chrome.runtime.onMessage.hasListeners()) {
      return;
    }
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.id === undefined) {
      return Promise.reject(new Error('Can\'t get the tab id'));
    }
    if (responseCallback) {
      return new Promise<void>(resolve => {
        chrome.tabs.sendMessage(tab.id!, message, responseCallback);
        resolve();
      });
    }
    return chrome.tabs.sendMessage(tab.id!, message);
  }

  public static async sendRuntimeMessage (message: Message, responseCallback?: (response: any) => void): Promise<any> {
    if (responseCallback) {
      return new Promise<void>(resolve => {
        chrome.runtime.sendMessage(message, responseCallback);
        resolve();
      });
    }
    return chrome.runtime.sendMessage(message);
  }

  public static addListener (messageName: MessageType, callback: MessageListenerCallback): void {
    if (this.messageMap.has(messageName)) {
      this.messageMap.get(messageName).push(callback);
    } else {
      this.messageMap.set(messageName, [callback]);
    }
  }

  protected static testScriptLoaded (): boolean {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        return false;
      }
      const tabId = tabs[0].id;

      if (tabId === undefined) {
        return false;
      }
      chrome.scripting.executeScript(
        {
          target: { tabId },
          func: () => typeof (window as any).contentScriptLoaded !== 'undefined'
        },
        (results) => {
          if (chrome.runtime.lastError || !results || !results[0].result) {
            return false;
          } else {
            return true;
          }
        }
      );
    });
    return false;
  }
}

chrome.runtime.onMessage.addListener((message: Message, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
  if (!MessageDispatcher.messageMap.has(message.name)) {
    return;
  }
  MessageDispatcher.messageMap.get(message.name).forEach(callback => callback(message, sender, sendResponse));
});
