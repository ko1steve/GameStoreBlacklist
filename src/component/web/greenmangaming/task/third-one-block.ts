import { MultiListTaskHandler } from '../../../../core/task/multi-list-task-handler';
import { CommonUtil } from '../../../../util/common-util';

export class GreenManGamingThirdOneBlockTaskHandler extends MultiListTaskHandler {
  public start (): Promise<void> {
    return new Promise<void>(resolve => {
      const gameListContainerArr = this.getMultiGameListContainer();
      if (!gameListContainerArr || gameListContainerArr.length === 0) {
        CommonUtil.showLog('No gameListContainerArr');
        return resolve();
      }
      for (const gameListContainer of gameListContainerArr) {
        if (!gameListContainer) {
          continue;
        }
        const gameListChildren = this.getGameListChildren(gameListContainer);
        if (!gameListChildren || gameListChildren.length === 0 || !this.isGameListFirstChildExist(gameListChildren)) {
          CommonUtil.showLog('No gameListChildren, continue');
          continue;
        }
        gameListChildren.forEach((gameInfoElement, i) => {
          this.addCheckBoxToGameListEachChild(gameInfoElement, gameListContainer);
        });
        if (this.countGameListElementInit === gameListChildren.length) {
          gameListContainer.dataset.hasInit = 'true';
        }
        this.countGameListElementInit = 0;
      }
      CommonUtil.showLog('resolve');
      resolve();
    });
  }

  protected addCheckBoxToGameListEachChild (gameInfoElement: HTMLElement, gameListContainer: HTMLElement): void {
    if (gameInfoElement.dataset && gameInfoElement.dataset.hasInit === 'true') {
      this.countGameListElementInit++;
      console.log('this.countGameListElementInit++');
      return;
    }
    const modifiedInfoElement = this.modifyGameInfoElement(gameInfoElement, gameListContainer);
    if (!modifiedInfoElement) {
      console.log('!modifiedInfoElement');
      return;
    }
    gameInfoElement = modifiedInfoElement;
    const rawGameTitle = this.getRawGameTitle(gameInfoElement);
    console.log('rawGameTitle : ' + rawGameTitle);
    if (!rawGameTitle) {
      return;
    }
    const gameTitle = this.getModifiedGameTitle(rawGameTitle);

    const checkboxParent = this.getCheckboxParent(gameInfoElement);
    if (!checkboxParent) {
      console.log('!checkboxParent');
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

  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const collection = Array.from(document.getElementsByClassName('medium-product-block')) as HTMLElement[];
    return collection.filter(e => e.getElementsByClassName('thirdblock')[0] != null)
      .map(e => e.getElementsByClassName('module-content')[0] as HTMLElement);
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    console.log(infoContainer.getElementsByTagName('a')[0]?.getAttribute('ng-click'));
    return infoContainer.getElementsByTagName('a')[0]?.getAttribute('ng-click')?.split('\'')[1];
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.children[0] as HTMLElement;
  }
}
