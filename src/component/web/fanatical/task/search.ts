import { ListTaskHandler } from './../../../../core/task/listTaskHandler';

export class FanaticalSearchTaskHandler extends ListTaskHandler {
  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    const firstGameInfo = children[0];
    return firstGameInfo?.children[0]?.getElementsByClassName('hit-card-overlay')[0] !== undefined;
  }

  protected getGameListContainer (): HTMLElement | undefined {
    return document.getElementsByClassName('ProductListingPage__grid')[0] as HTMLElement;
  }

  protected getGameListChildren (gameListContainer: HTMLElement): HTMLElement[] {
    return super.getGameListChildren(gameListContainer).filter(e => {
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
