import { ListTaskHandler } from './../../../../../core/task/listTaskHandler';

export class GreenManGamingComingSoonTaskHandler extends ListTaskHandler {
  public start (): Promise<void> {
    return new Promise<void>(resolve => {
      const gameListContainerArr = this.getMultiGameListContainer();
      if (!gameListContainerArr) {
        return resolve();
      }
      for (const gameListContainer of gameListContainerArr) {
        if (!gameListContainer || !gameListContainer.dataset || gameListContainer.dataset.hasInit === 'true') {
          return resolve();
        }
        const gameListChildren = Array.from(gameListContainer.children) as HTMLElement[];
        if (!this.isGameListFirstChildExist(gameListChildren) || this.isGameListFirstChildInit(gameListChildren)) {
          return resolve();
        }
        gameListChildren.forEach((gameInfoElement, i) => {
          this.addCheckBoxToGameListEachChild(gameInfoElement, gameListContainer);
        });
        if (this.countGameListElementInit === gameListChildren.length) {
          gameListContainer.dataset.hasInit = 'true';
        }
        this.countGameListElementInit = 0;
      }
      resolve();
    });
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0]?.children[0] !== undefined;
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

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | null {
    return infoContainer.children[0] as HTMLElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.children[0]?.children[3]?.children[0] as HTMLImageElement)?.alt;
  }
}
