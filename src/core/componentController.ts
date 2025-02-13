import { Container, Inject } from 'typescript-ioc';
import { MainConfig } from './../mainConfig';
import { ComponentConfig } from './componentConfig';
import { CommonUtil } from './../util/commonUtil';
import { DataModel } from './../model/dataModel';
import { MessageDispatcher } from './../util/messageDispatcher';
import { IShowBlacklistGammeMessage, IUpdateBlacklistDataFromPopupMessage, MessageType } from './../data/messageData';
import { IReqeustBlacklistDataResponse, IReqeustPopupInitDataResponse } from './../component/popup/data/popupMessageData';
import { GlobalEventDispatcher, GlobalEventType } from './../util/globalEventDispatcher';
import { StorageType } from './../util/dataStorage';
import { ProductTaskHandler } from './task/productTaskHandler';
import { TaskHandler } from './task/taskHandler';
import { ListTaskHandler } from './task/listTaskHandler';

export class ComponentController {
  @Inject
  protected dataModel: DataModel;

  protected componentId: string;
  protected mainConfig: MainConfig;
  protected componentConfig: ComponentConfig;
  protected taskQueue: TaskHandler[];

  protected _running = false;
  public get running (): boolean {
    return this._running;
  }

  public set running (running: boolean) {
    if (this._running === running) {
      return;
    }
    this._running = running;
    if (running) {
      this.initailzie();
    }
    CommonUtil.showLog('extension controller is ' + (running ? 'running' : 'stopped'));
  }

  constructor (componentConfig: ComponentConfig) {
    CommonUtil.showLog('extension controller is running');
    this._running = true;
    this.taskQueue = [];
    this.componentId = componentConfig.componentId;
    this.mainConfig = Container.get(MainConfig);
    this.dataModel = Container.get(DataModel);
    this.componentConfig = componentConfig;
    this.addSignalListener();
    this.addMessageListener();
    this.addGlobalEventListener();
  }

  protected addSignalListener (): void {
    this.dataModel.onInitializeBlacklistCompleteSignal.add(this.initailzie.bind(this));
  }

  protected addMessageListener (): void {
    MessageDispatcher.addListener(MessageType.REQUEST_POPUP_INIT_DATA, (message, sender, sendResponse) => {
      if (!this._running) {
        sendResponse(undefined);
      }
      sendResponse({
        numberOfGame: this.dataModel.numberOfGame,
        showBlacklistGame: this.dataModel.showBlacklistGame,
        debug: this.dataModel.debug
      } as IReqeustPopupInitDataResponse);
    });
    MessageDispatcher.addListener(MessageType.SHOW_BLACKLIST_GAME, (message, sender, sendResponse) => {
      message = message as IShowBlacklistGammeMessage;
      this.dataModel.updateShowBlacklistGame(message.data.show).then(() => {
        location.reload();
        sendResponse();
      });
      return true;
    });
    MessageDispatcher.addListener(MessageType.REQUEST_BLACKLIST_DATA, (message, sender, sendResponse) => {
      const jsonContent = this.dataModel.getBlacklistData();
      sendResponse({ jsonContent } as IReqeustBlacklistDataResponse);
    });
    MessageDispatcher.addListener(MessageType.UPDATE_BLACKLIST_DATA_FROM_POPUP, (message, sender, sendResponse) => {
      message = message as IUpdateBlacklistDataFromPopupMessage;
      this.dataModel.updateBlacklistDataFromPopup(message.data.content).then(() => {
        location.reload();
        sendResponse();
      });
      return true;
    });
    MessageDispatcher.addListener(MessageType.FIX_DATA_CASE_SENSITIVE, (message, sender, sendResponse) => {
      this.dataModel.fixDataCaseSensitive().then(() => {
        CommonUtil.showLog('The issue of Case Sensitive is clear.');
        sendResponse();
      });
      return true;
    });
    MessageDispatcher.addListener(MessageType.CLEAR_LOCAL_STORAGE_DATA, (message, sender, sendResponse) => {
      this.dataModel.clearData(StorageType.LOCAL).then(() => {
        CommonUtil.showLog('Local Data is clear.');
        sendResponse();
      });
      return true;
    });
    MessageDispatcher.addListener(MessageType.CLEAR_SYNC_STORAGE_DATA, (message, sender, sendResponse) => {
      this.dataModel.clearData(StorageType.SYNC).then(() => {
        CommonUtil.showLog('Sync Data is clear.');
        sendResponse();
      });
      return true;
    });
  }

  protected addGlobalEventListener (): void {
    GlobalEventDispatcher.addListener(GlobalEventType.DEBUG_MODE_ON, this.turnOnDebugMode.bind(this));
    GlobalEventDispatcher.addListener(GlobalEventType.DEBUG_MODE_OFF, this.turnOffDebugMode.bind(this));
    GlobalEventDispatcher.addListener(GlobalEventType.SHOW_ALL_BLACKIST_DATA, this.showAllStorageData.bind(this));
  }

  protected turnOnDebugMode (): void {
    this.dataModel.updateDebugMode(true).then(() => {
      CommonUtil.showLog('Debug Mode turns on.');
    });
  }

  protected turnOffDebugMode (): void {
    this.dataModel.updateDebugMode(false).then(() => {
      CommonUtil.showLog('Debug Mode turns off.');
    });
  }

  protected showAllStorageData (): void {
    this.dataModel.showAllBlaclistData().then(() => {
      //
    });
  }

  protected initailzie (): void {
    this.setupTaskQueue();
    const promiseList: Promise<void>[] = [];
    this.taskQueue.forEach(e => promiseList.push(e.start()));
    Promise.all(promiseList).then(() => {
      this.clearTaskQueue();
      setTimeout(() => {
        if (this._running) {
          this.initailzie();
        }
      }, 500);
    });
  }

  protected setupTaskQueue (): void {
    this.taskQueue.push(new ProductTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new ListTaskHandler(this.componentConfig, this.dataModel));
  }

  protected clearTaskQueue (): void {
    this.taskQueue = [];
  }
}
