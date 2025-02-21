import './style.css';
import { Container } from 'typescript-ioc';
import { TSMap } from 'typescript-map';
import { ComponentController } from './../../../core/componentController';
import { CommonUtil } from './../../../util/commonUtil';
import { StringFormatter } from './../../../util/stringFormatter';
import { MessageDispatcher } from './../../../util/messageDispatcher';
import { MessageType } from './../../../data/messageData';
import { FanaticalGeneralController } from './controller/general';
import { FanaticalProductController } from './controller/product';
import { FanaticalSearchController } from './controller/search';
import { ControllerType, ControllerTypeMap, FanaticalGeneralConfig, FanaticalProductConfig, FanaticalSearchConfig } from './config';

const controllerMap = new TSMap<string, ComponentController>([
  [
    ControllerType.GENERAL, new FanaticalGeneralController(Container.get(FanaticalGeneralConfig))
  ],
  [
    ControllerType.PRODUCT, new FanaticalProductController(Container.get(FanaticalProductConfig))
  ],
  [
    ControllerType.SEARCH, new FanaticalSearchController(Container.get(FanaticalSearchConfig))
  ]
]);

let currentUrl: string = StringFormatter.EMPTY_STRING;
let currentController: ComponentController;

addPopupListener();

const observer = new MutationObserver(() => {
  if (currentUrl === location.href) {
    return;
  }
  if (currentController) {
    currentController.running = false;
  }
  currentUrl = location.href;
  const matchUrl = mathchStoreUrls(location.href);
  if (matchUrl && ControllerTypeMap.has(matchUrl)) {
    CommonUtil.showLog('Url is mathched !');
    const controllerType = ControllerTypeMap.get(matchUrl);
    if (controllerMap.has(controllerType)) {
      currentController = controllerMap.get(controllerType);
      if (!currentController.running) {
        currentController.running = true;
      }
    }
  } else {
    CommonUtil.showLog('Url: ' + location.href);
    CommonUtil.showLog('Url is unmathched ...');
  }
});
observer.observe(document, { childList: true, subtree: true });

function addPopupListener (): void {
  MessageDispatcher.addListener(MessageType.REQUEST_POPUP_INIT_DATA, (message, sender, sendResponse) => {
    if (!currentController || !currentController.running) {
      sendResponse(undefined);
    }
  });
}

function mathchStoreUrls (url: string): string | undefined {
  return ControllerTypeMap.keys().find(e => CommonUtil.matchWildcardPattern(e, url));
}
