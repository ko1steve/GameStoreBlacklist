import { CommonUtil } from '../../../../util/common-util';
import { ListTaskHandler } from './../../../../core/task/list-task-handler';

export class FanaticalSearchTaskHandler extends ListTaskHandler {
  public start (): Promise<void> {
    return new Promise<void>(resolve => {
      const reAddCheckbox: () => void = () => {
        const gameListContainer = this.getGameListContainer();
        if (gameListContainer) {
          gameListContainer.dataset.hasInit = undefined;
          const gameListChildren = this.getGameListChildren(gameListContainer);
          if (gameListChildren) {
            gameListChildren.forEach(e => { e.dataset.hasInit = undefined; });
          }
        }
      };
      window.addEventListener('resize', reAddCheckbox);
      const gameListContainer = this.getGameListContainer();
      if (!gameListContainer) {
        CommonUtil.showLog('[' + this.constructor.name + '] Can\'t find the information list.');
        return resolve();
      }
      const gameListChildren = this.getGameListChildren(gameListContainer);
      if (!gameListChildren || gameListChildren.length === 0 || !this.isGameListFirstChildExist(gameListChildren)) {
        CommonUtil.showLog('[' + this.constructor.name + '] Can\'t find the information list\'s children.');
        window.removeEventListener('resize', reAddCheckbox);
        return resolve();
      }
      gameListChildren.forEach(gameInfoElement => {
        this.addCheckBoxToGameListEachChild(gameInfoElement, gameListContainer);
      });
      this.countGameListElementInit = 0;
      window.removeEventListener('resize', reAddCheckbox);
      resolve();
    });
  }

  protected getGameListContainer (): HTMLElement | undefined {
    return document.getElementsByClassName('ProductListingPage__grid')[0] as HTMLElement;
  }

  protected getGameListChildren (gameListContainer: HTMLElement): HTMLElement[] | undefined {
    return super.getGameListChildren(gameListContainer)?.filter(e =>
      e.getElementsByClassName('hitCardStripe__content')[0]?.getElementsByClassName('card-price-container')[0]
    )?.map(e => e.getElementsByClassName('HitCard')[0] as HTMLElement);
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByClassName('hit-card-overlay')[0]?.getElementsByTagName('a')[0]?.innerText;
  }
}
