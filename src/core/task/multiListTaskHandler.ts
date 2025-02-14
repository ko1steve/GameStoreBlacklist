import { CommonUtil } from 'src/util/commonUtil';
import { IGameInfoOption } from 'src/data/commonData';
import { StringFormatter } from 'src/util/stringFormatter';
import { TaskHandler } from './taskHandler';

export class MultiListTaskHandler extends TaskHandler {
  public start (): Promise<void> {
    return new Promise<void>(resolve => {
      const gameListContainerArr = this.getMultiGameListContainer();
      if (!gameListContainerArr) {
        return resolve();
      }
      for (const gameListContainer of gameListContainerArr) {
        if (!gameListContainer) {
          return resolve();
        }
        const gameListChildren = Array.from(gameListContainer.children) as HTMLElement[];
        if (!this.isGameListFirstChildExist(gameListChildren)) {
          return resolve();
        }
        gameListChildren.forEach((gameInfoElement, i) => {
          this.addCheckBoxToGameListEachChild(gameInfoElement, gameListContainer);
        });
      }
      resolve();
    });
  }

  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const containers = Array.from(document.getElementsByClassName('ListName')) as HTMLElement[];
    if (!containers || containers.length === 0) {
      return undefined;
    }
    return containers;
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0] !== undefined;
  }

  protected isGameListFirstChildInit (children: HTMLElement[]): boolean {
    return children[0].dataset && children[0].dataset.hasInit === 'true';
  }

  protected addCheckBoxToGameListEachChild (gameInfoElement: HTMLElement, gameListContainer: HTMLElement): void {
    if (gameInfoElement.dataset && gameInfoElement.dataset.hasInit === 'true') {
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
  }

  protected modifyGameInfoElement (infoElement: HTMLElement, parent: HTMLElement): HTMLElement | null {
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

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | null {
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
