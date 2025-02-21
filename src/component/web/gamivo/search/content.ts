import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/componentController';
import { CommonUtil } from './../../../../util/commonUtil';
import { MessageDispatcher } from './../../../../util/messageDispatcher';
import { MessageType } from './../../../../data/messageData';
import { GamivoSearchConfig } from './config';
import { StringFormatter } from 'src/util/stringFormatter';
import { GamivoSearchTaskHandler } from './task/search';

class GamivoSearchController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GamivoSearchTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(GamivoSearchConfig);
let controller: GamivoSearchController;
let currentUrl: string = StringFormatter.EMPTY_STRING;

addPopupListener();

const observer = new MutationObserver(() => {
  if (currentUrl === location.href) {
    return;
  }
  currentUrl = location.href;
  if (mathchStoreUrls(location.href)) {
    CommonUtil.showLog('Url is mathched !');
    if (controller) {
      controller.running = true;
    } else {
      controller = new GamivoSearchController(componentConfig);
      controller.running = true;
    }
  } else {
    CommonUtil.showLog('Url is unmathched ...');
    if (controller) {
      controller.running = false;
    }
  }
});
observer.observe(document, { childList: true, subtree: true });

function addPopupListener (): void {
  MessageDispatcher.addListener(MessageType.REQUEST_POPUP_INIT_DATA, (message, sender, sendResponse) => {
    if (!controller || !controller.running) {
      sendResponse(undefined);
    }
  });
}

function mathchStoreUrls (url: string): boolean {
  return componentConfig.matchUrls.some(e => CommonUtil.matchWildcardPattern(e, url));
}
