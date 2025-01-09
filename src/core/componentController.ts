import { Container, Inject } from 'typescript-ioc';
import { MainConfig } from '../mainConfig';
import { ComponentConfig } from './componentConfig';
import { IGameInfoOption } from 'src/data/commonData';
import { CommonTool } from 'src/util/commonTool';
import { DataModel } from 'src/model/dataModel';

export class ComponentController {
  @Inject
  protected dataModel: DataModel;

  protected componentId: string;
  protected mainConfig: MainConfig;
  protected componentConfig: ComponentConfig;
  protected numberOfGames = 0;
  protected countGameListElementInit = 0;

  constructor (componentConfig: ComponentConfig) {
    this.componentId = componentConfig.componentId;
    this.mainConfig = Container.get(MainConfig);
    this.dataModel = Container.get(DataModel);
    this.componentConfig = componentConfig;
    this.addEventListeners();
  }

  protected addEventListeners () {
    this.dataModel.onInitializeBlacklistCompleteSignal.add(this.initailzie.bind(this));
  }

  protected initailzie (): void {
    if (!this.componentConfig.isGameListPage) {
      this.handlePageContent();
    } else {
      this.handleListPageContent();
    }
    setTimeout(() => this.initailzie(), 500);
  }

  protected addResizeEventListener (): void {
    const listener = (event: UIEvent) => {
      removeEventListener('resize', listener);
      setTimeout(() => addEventListener('resize', listener), 200);
    };
    addEventListener('resize', listener);
  }

  protected getPageHeader (): HTMLElement | null {
    const header = document.getElementById('header-id');
    if (!header) {
      return null;
    }
    return header;
  }

  protected modifyHeader (header: HTMLElement): void {
    // modify header (ex. add class, modify style)
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
    const inBlacklist = this.getGameStatus(gameTitle);
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
    const inBlacklist = this.getGameStatus(gameTitle);
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
    config.excludeTitleWords.forEach(e => { gameTitle = gameTitle.replace(e, ''); });
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
      checkboxImg.onclick = () => {
        if (checkboxImg.dataset.action === this.componentConfig.checkboxContainer.checkbox.disabledAction) {
          this.addGameToBlacklist(gameTitle);
          this.dataModel.updateNumberOfGame();
          this.setCheckboxEnabled(checkboxImg);
          if (!this.dataModel.showBlacklistGame && option?.hideGame) {
            this.hideGame(option.hideGame.parentList, option.hideGame.infoElement);
          }
        } else {
          this.removeGameFromBlacklist(gameTitle);
          this.dataModel.updateNumberOfGame();
          this.setCheckboxDisabled(checkboxImg);
        }
      };
      checkboxParent.dataset.hasInit = 'true';
      if (inBlacklist) {
        CommonTool.showLog('In Blacklist : ' + gameTitle);
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

  protected getGameStatus (gameTitle: string): boolean {
    gameTitle = gameTitle.toLowerCase();
    const key = gameTitle[0];
    if (!this.dataModel.blacklistMap.has(key)) {
      return false;
    }
    return this.dataModel.blacklistMap.get(key)!.includes(gameTitle);
  }

  protected async addGameToBlacklist (gameTitle: string): Promise<void> {
    const key = gameTitle[0].toLowerCase();
    if (!this.dataModel.blacklistMap.has(key)) {
      this.dataModel.blacklistMap.set(key, [gameTitle]);
    } else {
      const list = this.dataModel.blacklistMap.get(key)!;
      list.push(gameTitle.toLowerCase());
      this.dataModel.blacklistMap.set(key, list);
    }
    await chrome.storage.sync.set({ [this.mainConfig.storageNames.blacklist]: JSON.stringify(Object.fromEntries(this.dataModel.blacklistMap.entries())) });
    CommonTool.showLog('Add "' + gameTitle + '" to blacklist. ');
  }

  protected async removeGameFromBlacklist (gameTitle: string): Promise<void> {
    const key = gameTitle[0];
    if (!this.dataModel.blacklistMap.has(key)) {
      return;
    }
    const list = this.dataModel.blacklistMap.get(key)!;
    const index = list.findIndex(e => e === gameTitle);
    if (index < 0) {
      return;
    }
    list.splice(index, 1);
    this.dataModel.blacklistMap.set(key, list);
    await chrome.storage.sync.set({ [this.mainConfig.storageNames.blacklist]: JSON.stringify(Object.fromEntries(this.dataModel.blacklistMap.entries())) });
    CommonTool.showLog('Removed "' + gameTitle + '" from blacklist. ');
  }

  protected async trimGameName (): Promise<void> {
    const storageData = await chrome.storage.sync.get([this.mainConfig.storageNames.blacklist]);
    const jsonContent = storageData[this.mainConfig.storageNames.blacklist] as string;
    if (!jsonContent) {
      return;
    } else {
      const blacklistMap = new Map<string, string[]>(Object.entries(JSON.parse(jsonContent)));
      blacklistMap.forEach((gameArr, k) => {
        gameArr.forEach((gameTitle, i) => {
          gameArr[i] = gameTitle.trim();
        });
        blacklistMap.set(k, gameArr);
      });
    }
    await chrome.storage.sync.set({ [this.mainConfig.storageNames.blacklist]: JSON.stringify(Object.fromEntries(this.dataModel.blacklistMap.entries())) });
  }
}
