import { CommonUtil } from '../../../../util/common-util';
import { ListTaskHandler } from './../../../../core/task/list-task-handler';

export class FanaticalSearchTaskHandler extends ListTaskHandler {
  public start (): Promise<void> {
    return new Promise<void>(resolve => {
      const resizeCallback: () => void = () => {
        const gameListContainer = this.getGameListContainer();
        if (gameListContainer) {
          gameListContainer.dataset.hasInit = undefined;
          const gameListChildren = this.getGameListChildren(gameListContainer);
          if (gameListChildren) {
            gameListChildren.forEach(e => { e.dataset.hasInit = undefined; });
          }
        }
      };
      window.addEventListener('resize', resizeCallback);
      const gameListContainer = this.getGameListContainer();
      if (!gameListContainer) {
        CommonUtil.showLog('Can\'t find the information list.');
        return resolve();
      }
      if (gameListContainer.dataset.hasInit === 'true') {
        window.removeEventListener('resize', resizeCallback);
        return resolve();
      }
      const gameListChildren = this.getGameListChildren(gameListContainer);
      if (!gameListChildren || gameListChildren.length === 0 || !this.isGameListFirstChildExist(gameListChildren)) {
        window.removeEventListener('resize', resizeCallback);
        return resolve();
      }
      gameListChildren.forEach(gameInfoElement => {
        this.addCheckBoxToGameListEachChild(gameInfoElement, gameListContainer);
      });
      if (this.countGameListElementInit === gameListChildren.length) {
        gameListContainer.dataset.hasInit = 'true';
      }
      this.countGameListElementInit = 0;
      window.removeEventListener('resize', resizeCallback);
      resolve();
    });
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    const firstGameInfo = children[0];
    return firstGameInfo?.children[0]?.getElementsByClassName('hit-card-overlay')[0] !== undefined;
  }

  protected getGameListContainer (): HTMLElement | undefined {
    return document.getElementsByClassName('ProductListingPage__grid')[0] as HTMLElement;
  }

  protected getGameListChildren (gameListContainer: HTMLElement): HTMLElement[] | undefined {
    return super.getGameListChildren(gameListContainer)?.filter(e => {
      return e.getElementsByClassName('hitCardStripe__content')[0]?.getElementsByClassName('card-price-container')[0];
    });
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.getElementsByClassName('hit-card-overlay')[0]?.getElementsByTagName('a')[0])?.innerText;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.getElementsByClassName('HitCard')[0] as HTMLElement;
  }
}
