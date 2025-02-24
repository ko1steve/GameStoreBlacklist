import { CommonUtil } from 'src/util/commonUtil';
import { IGameInfoOption } from 'src/data/commonData';
import { StringFormatter } from 'src/util/stringFormatter';
import { TaskHandler } from './taskHandler';

export class ListTaskHandler extends TaskHandler {
  protected countGameListElementInit: number = 0;

  public start (): Promise<void> {
    return new Promise<void>(resolve => {
      const gameListContainer = this.getGameListContainer();
      if (!gameListContainer || !gameListContainer.dataset || gameListContainer.dataset.hasInit === 'true') {
        return resolve();
      }
      const gameListChildren = this.getGameListChildren(gameListContainer);
      if (!gameListChildren || !this.isGameListFirstChildExist(gameListChildren)) {
        return resolve();
      }
      gameListChildren.forEach(gameInfoElement => {
        this.addCheckBoxToGameListEachChild(gameInfoElement, gameListContainer);
      });
      if (this.countGameListElementInit === gameListChildren.length) {
        gameListContainer.dataset.hasInit = 'true';
      }
      this.countGameListElementInit = 0;
      resolve();
    });
  }

  protected getGameListContainer (): HTMLElement | undefined {
    const container = document.getElementById('gameList');
    if (!container) {
      return undefined;
    }
    return container;
  }

  protected getGameListChildren (gameListContainer: HTMLElement): HTMLElement[] | undefined {
    return Array.from(gameListContainer.children) as HTMLElement[];
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    const firstGameInfo = children[0];
    return firstGameInfo !== undefined;
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
    if (inBlacklist && !this.dataModel.showBlacklistGame) {
      this.hideGame(gameListContainer, gameInfoElement);
    }
    gameInfoElement.dataset.hasInit = 'true';
    this.countGameListElementInit++;
  }

  protected modifyGameInfoElement (infoElement: HTMLElement, parent: HTMLElement): HTMLElement | undefined {
    // ex. add class, remove children
    return infoElement;
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

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer;
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
