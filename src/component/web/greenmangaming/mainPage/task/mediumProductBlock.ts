import { MultiListTaskHandler } from './../../../../../core/task/multiListTaskHandler';

export class GreenManGamingMediumProductBlockTaskHandler extends MultiListTaskHandler {
  protected getGameListChildren (gameListContainer: HTMLElement): HTMLElement[] | undefined {
    return Array.from(gameListContainer.children).slice(1) as HTMLElement[];
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    const firstGameInfo = children[0];
    return firstGameInfo?.children[0]?.children[0] !== undefined;
  }

  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const collection = Array.from(document.getElementsByClassName('large-product-block')) as HTMLElement[];
    if (!collection || collection.length === 0) {
      return undefined;
    }
    const gameListContainers = collection.map(e => e.children[0]?.children[0]?.children[0]?.children[0]?.children[0] as HTMLElement);
    for (const container of gameListContainers) {
      if (!container) {
        return undefined;
      }
    }
    return gameListContainers;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.children[0] as HTMLElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.children[0]?.children[3]?.children[0] as HTMLImageElement)?.alt;
  }
}
