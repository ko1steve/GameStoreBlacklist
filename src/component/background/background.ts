import { IShowLogMessage, IShowObjectMessage, MessageType } from './../../data/messageData';
import { MessageDispatcher } from './../../util/messageDispatcher';

MessageDispatcher.addListener(MessageType.SHOW_LOG, (message, sender, sendResponse) => {
  message = message as IShowLogMessage;
  if (message.data.optionalParams && message.data.optionalParams.length > 0) {
    console.log(message.data.param, ...message.data.optionalParams);
  } else {
    console.log(message.data.param);
  }
  sendResponse();
});

MessageDispatcher.addListener(MessageType.SHOW_OBJECT, (message, sender, sendResponse) => {
  message = message as IShowObjectMessage;
  console.log('%c[GameStoreBlackList] Show_Object', 'color: red; font-weight: bold');
  console.log(message.data.object);
  sendResponse();
});
