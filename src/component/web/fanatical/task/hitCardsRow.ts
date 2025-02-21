import { MultiListTaskHandler } from './../../../../core/task/multiListTaskHandler';

export class FanaticalHitCardsRowTaskHandler extends MultiListTaskHandler {
  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const collection = Array.from(document.getElementsByClassName('HitCardsRow')) as HTMLElement[];
    if (!collection || collection.length === 0) {
      return undefined;
    }
    return collection;
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.getElementsByClassName('hit-card-overlay')[0] !== undefined;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByClassName('hit-card-overlay')[0]?.getElementsByClassName('hit-card-game-name')[0]?.getElementsByTagName('a')[0]?.innerText;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.getElementsByClassName('HitCard')[0] as HTMLElement;
  }
}
