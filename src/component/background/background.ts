import { IShowLogMessage, IShowObjectMessage, MessageType } from './../../data/messageData';
import { MessageDispatcher } from './../../util/messageDispatcher';

MessageDispatcher.addListener(MessageType.SHOW_LOG, (message, sender, sendResponse) => {
  message = message as IShowLogMessage;
  if (message.data.optionalParams && message.data.optionalParams.length > 0) {
    console.log('%c[GameStoreBlackList] ' + message.data.param, ...message.data.optionalParams, 'color: green; font-weight: bold');
  } else {
    console.log('%c[GameStoreBlackList] ' + message.data.param, 'color: green; font-weight: bold');
  }
  sendResponse();
});

MessageDispatcher.addListener(MessageType.SHOW_OBJECT, (message, sender, sendResponse) => {
  message = message as IShowObjectMessage;
  console.log('%c[GameStoreBlackList] Show_Object', 'color: red; font-weight: bold');
  console.log(message.data.object);
  sendResponse();
});
