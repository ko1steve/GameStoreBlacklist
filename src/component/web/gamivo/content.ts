import './style.css';
import { TSMap } from 'typescript-map';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../core/component/component-controller';
import { CommonUtil } from './../../../util/common-util';
import { StringFormatter } from './../../../util/string-formatter';
import { MessageDispatcher } from './../../../util/message-dispatcher';
import { MessageType } from './../../../data/message-data';
import { UrlTypeMap, ConfigClassMap, ControllerClassMap, ControllerType } from './config-map';

let currentUrl: string = StringFormatter.EMPTY_STRING;
let currentController: ComponentController;

const controllerMap = new TSMap<ControllerType, ComponentController>();

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
  if (matchUrl && UrlTypeMap.has(matchUrl)) {
    CommonUtil.showLog('Url: ' + location.href + ' is mathched');
    const controllerType = UrlTypeMap.get(matchUrl);
    if (controllerMap.has(controllerType)) {
      currentController = controllerMap.get(controllerType);
      if (!currentController.running) {
        currentController.running = true;
      }
    } else {
      const ConfigClass = ConfigClassMap.get(controllerType);
      const ControllerClass = ControllerClassMap.get(controllerType);
      if (!ConfigClass || !ControllerClass) {
        CommonUtil.showLog('Can\'t find any related controller\'s class');
        return;
      }
      currentController = new ControllerClass(Container.get(ConfigClass));
      currentController.running = true;
      controllerMap.set(controllerType, currentController);
    }
  } else {
    CommonUtil.showLog('%cUrl: ' + location.href + ' is unmathched', 'color:red;');
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
  return UrlTypeMap.keys().find(e => CommonUtil.matchWildcardPattern(e, url));
}
