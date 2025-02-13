import { CommonUtil } from './../../util/commonUtil';
import { StringFormatter } from './../../util/stringFormatter';
import { IGameInfoOption } from './../../data/commonData';
import { TaskHandler } from './taskHandler';

export class ProductTaskHandler extends TaskHandler {
  public start (): Promise<void> {
    return new Promise<void>(resolve => {
      const rawGameTitle = this.getRawGameTitle();
      if (!rawGameTitle) {
        return resolve();
      }
      const gameTitle = this.getModifiedGameTitle(rawGameTitle);

      const checkboxParent = this.getCheckboxParent();
      if (!checkboxParent) {
        return resolve();
      }
      const inBlacklist = this.dataModel.getGameStatus(gameTitle);
      this.addCheckbox(checkboxParent, gameTitle, inBlacklist);
      resolve();
    });
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
