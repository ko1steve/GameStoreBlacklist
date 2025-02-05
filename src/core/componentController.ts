import { Container, Inject } from 'typescript-ioc';
import { MainConfig } from '../mainConfig';
import { ComponentConfig } from './componentConfig';
import { IGameInfoOption } from './../data/commonData';
import { CommonUtil } from './../util/commonUtil';
import { DataModel } from './../model/dataModel';
import { MessageDispatcher } from './../util/messageDispatcher';
import { IShowBlacklistGammeMessage, IUpdateBlacklistDataFromPopupMessage, MessageType } from './../data/messageData';
import { IReqeustBlacklistDataResponse, IReqeustPopupInitDataResponse } from './../component/popup/data/popupMessageData';
import { GlobalEventDispatcher, GlobalEventType } from './../util/globalEventDispatcher';
import { StringFormatter } from './../util/stringFormatter';
import { StorageType } from './../util/dataStorage';

export class ComponentController {
  @Inject
  protected dataModel: DataModel;

  protected componentId: string;
  protected mainConfig: MainConfig;
  protected componentConfig: ComponentConfig;
  protected countGameListElementInit = 0;

  constructor (componentConfig: ComponentConfig) {
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
      return true;
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
    if (!this.componentConfig.isGameListPage) {
      this.handlePageContent();
    } else {
      this.handleListPageContent();
    }
    setTimeout(() => this.initailzie(), 500);
  }

  protected handlePageContent (): void {
    const rawGameTitle = this.getRawGameTitle();
    if (!rawGameTitle) {
      return;
    }
    const gameTitle = this.getModifiedGameTitle(rawGameTitle);

    const checkboxParent = this.getCheckboxParent();
    if (!checkboxParent) {
      return;
    }
    const inBlacklist = this.dataModel.getGameStatus(gameTitle);
    this.addCheckbox(checkboxParent, gameTitle, inBlacklist);
  }

  protected handleListPageContent (): void {
    const gameListContainer = this.getGameListContainer() as HTMLDivElement;
    if (!gameListContainer || !gameListContainer.dataset || gameListContainer.dataset.hasInit === 'true') {
      return;
    }
    const gameListChildren = Array.from(gameListContainer.children) as HTMLElement[];
    if (!this.isGameListFirstChildExist(gameListChildren) || this.isGameListFirstChildInit(gameListChildren)) {
      return;
    }
    gameListChildren.forEach(gameInfoElement => {
      this.addCheckBoxToGameListEachChild(gameInfoElement, gameListContainer);
    });
    if (this.countGameListElementInit === gameListChildren.length) {
      gameListContainer.dataset.hasInit = 'true';
    }
    this.countGameListElementInit = 0;
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children != null && children[0] != null;
  }

  protected isGameListFirstChildInit (children: HTMLElement[]): boolean {
    return children[0].dataset && children[0].dataset.hasInit === 'true';
  }

  protected addCheckBoxToGameListEachChild (gameInfoElement: HTMLElement, gameListContainer: HTMLElement): void {
    if (gameInfoElement.dataset && gameInfoElement.dataset.hasInit === 'true') {
      this.countGameListElementInit++;
      return;
    }
    const modifiedInfoElement = this.modifyGameInfoElement(gameInfoElement, gameListContainer);
    if (!modifiedInfoElement) {
      return;
    }
    gameInfoElement = modifiedInfoElement;
    const rawGameTitle = this.getRawGameTitle(gameInfoElement);
    if (!rawGameTitle) {
      return;
    }
    const gameTitle = this.getModifiedGameTitle(rawGameTitle);

    const checkboxParent = this.getCheckboxParent(gameInfoElement);
    if (!checkboxParent) {
      return;
    }
    const inBlacklist = this.dataModel.getGameStatus(gameTitle);
    this.addCheckbox(checkboxParent, gameTitle, inBlacklist, {
      hideGame: {
        infoElement: gameInfoElement,
        parentList: gameListContainer
      }
    });

    if (this.componentConfig.isGameListPage) {
      if (inBlacklist && !this.dataModel.showBlacklistGame) {
        this.hideGame(gameListContainer, gameInfoElement);
      }
    }
    gameInfoElement.dataset.hasInit = 'true';
    this.countGameListElementInit++;
  }

  protected modifyGameInfoElement (infoElement: HTMLElement, parent: HTMLElement): HTMLElement | null {
    // ex. add class, remove children
    return infoElement;
  }

  protected getGameListContainer (): HTMLElement | null {
    const container = document.getElementById('gameList');
    return container;
  }

  protected getRawGameTitle (infoContainer?: HTMLElement): string | undefined {
    return document.getElementById('title')?.innerText;
  }

  protected getModifiedGameTitle (gameTitle: string): string {
    const config = this.componentConfig.texthandle;
    config.startWords.forEach(e => {
      if (gameTitle.startsWith(e)) {
        const cutIndex = gameTitle.indexOf(e);
        gameTitle = gameTitle.substring(cutIndex + e.length);
      }
    });
    config.cutToEndWords.forEach(e => {
      const cutIndex = gameTitle.indexOf(e);
      if (cutIndex >= 0) {
        gameTitle = gameTitle.substring(0, cutIndex);
      }
    });
    config.excludeTitleWords.forEach(e => { gameTitle = gameTitle.replace(e, StringFormatter.EMPTY_STRING); });
    config.endWords.forEach(e => {
      if (gameTitle.endsWith(e)) {
        const cutIndex = gameTitle.lastIndexOf(e);
        gameTitle = gameTitle.substring(0, cutIndex);
      }
    });
    gameTitle = gameTitle.trim();
    return gameTitle;
  }

  protected getCheckboxParent (infoContainer?: HTMLElement): HTMLElement | null {
    const checkboxParent = document.getElementById('product-info');
    return checkboxParent;
  }

  protected addCheckbox (checkboxParent: HTMLElement, gameTitle: string, inBlacklist: boolean, option?: IGameInfoOption): void {
    let checkboxImg = checkboxParent.getElementsByClassName(this.componentConfig.checkboxContainer.checkbox.className!)[0] as HTMLImageElement;
    if (!checkboxImg) {
      checkboxImg = this.createCheckbox(checkboxParent);
      checkboxImg.onclick = (): void => {
        if (checkboxImg.dataset.action === this.componentConfig.checkboxContainer.checkbox.disabledAction) {
          this.dataModel.addGameToBlacklist(gameTitle);
          this.setCheckboxEnabled(checkboxImg);
          if (!this.dataModel.showBlacklistGame && option?.hideGame) {
            this.hideGame(option.hideGame.parentList, option.hideGame.infoElement);
          }
        } else {
          this.dataModel.removeGameFromBlacklist(gameTitle);
          this.setCheckboxDisabled(checkboxImg);
        }
      };
      checkboxParent.dataset.hasInit = 'true';
      if (inBlacklist) {
        CommonUtil.showLog('In Blacklist : ' + gameTitle);
        this.setCheckboxEnabled(checkboxImg);
      }
    }
  }

  protected createCheckbox (parent: HTMLElement): HTMLImageElement {
    const conainer = document.createElement('div');
    conainer.className = this.componentConfig.checkboxContainer.className!;
    const checkboxImg = document.createElement('img');
    checkboxImg.className = this.componentConfig.checkboxContainer.checkbox.className!;
    this.setCheckboxDisabled(checkboxImg);
    conainer.appendChild(checkboxImg);
    parent.style.position = 'relative';
    parent.appendChild(conainer);
    return checkboxImg;
  }

  protected setCheckboxEnabled (checkboxImg: HTMLImageElement): void {
    const config = this.componentConfig.checkboxContainer.checkbox;
    checkboxImg.dataset.action = config.action;
    checkboxImg.src = chrome.runtime.getURL(config.sourceName!);
  }

  protected setCheckboxDisabled (checkboxImg: HTMLImageElement): void {
    const config = this.componentConfig.checkboxContainer.checkbox;
    checkboxImg.dataset.action = config.disabledAction;
    checkboxImg.src = chrome.runtime.getURL(config.disabledSourceName!);
  }

  protected hideGame (gameListContainer: HTMLElement, gameContainer: HTMLElement): void {
    gameListContainer.removeChild(gameContainer);
  }
}
