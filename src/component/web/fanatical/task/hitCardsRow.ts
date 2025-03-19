import { MultiListTaskHandler } from './../../../../core/task/multi-list-task-handler';

export class FanaticalHitCardsRowTaskHandler extends MultiListTaskHandler {
  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const collection = Array.from(document.getElementsByClassName('HitCardsRow')) as HTMLElement[];
    if (!collection || collection.length === 0) {
      return undefined;
    }
    return collection;
  }

  protected getGameListChildren (gameListContainer: HTMLElement): HTMLElement[] {
    return super.getGameListChildren(gameListContainer).filter(e => {
      return e.getElementsByClassName('hitCardStripe__content')[0]?.getElementsByClassName('card-price-container')[0];
    });
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    const firstGameInfo = children[0];
    return firstGameInfo?.getElementsByClassName('hit-card-overlay')[0] !== undefined;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByClassName('hit-card-overlay')[0]?.getElementsByClassName('hit-card-game-name')[0]?.getElementsByTagName('a')[0]?.innerText;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.getElementsByClassName('HitCard')[0] as HTMLElement;
  }
}
