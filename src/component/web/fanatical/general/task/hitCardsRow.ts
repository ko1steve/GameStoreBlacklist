import { MultiListTaskHandler } from './../../../../../core/task/multiListTaskHandler';

export class FanaticalHitCardsRowTaskHandler extends MultiListTaskHandler {
  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const collection = Array.from(document.getElementsByClassName('HitCardsRow')) as HTMLElement[];
    if (!collection || collection.length === 0) {
      return undefined;
    }
    return collection;
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0]?.getElementsByClassName('hit-card-overlay')[0] !== undefined;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | null {
    return infoContainer;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.getElementsByClassName('hit-card-overlay')[0]?.children[0]?.children[1]?.children[0]?.children[0] as HTMLAnchorElement)?.innerText;
  }
}
