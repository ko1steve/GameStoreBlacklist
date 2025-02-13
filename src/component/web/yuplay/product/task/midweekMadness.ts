import { ListTaskHandler } from './../../../../../core/task/listTaskHandler';

export class YuplayMidweekMadnessTaskHandler extends ListTaskHandler {
  public start (): Promise<void> {
    return new Promise<void>(resolve => {
      const gameListContainer = this.getGameListContainer() as HTMLDivElement;
      if (!gameListContainer || !gameListContainer.dataset || gameListContainer.dataset.hasInit === 'true') {
        return resolve();
      }
      const gameListChildren = Array.from(gameListContainer.children) as HTMLElement[];
      if (!this.isGameListFirstChildExist(gameListChildren) || this.isGameListFirstChildInit(gameListChildren)) {
        return resolve();
      }
      gameListChildren.forEach(gameInfoElement => {
        this.addCheckBoxToGameListEachChild(gameInfoElement, gameListContainer);
      });
      if (this.countGameListElementInit === gameListChildren.length) {
        gameListContainer.dataset.hasInit = 'true';
      }
      this.countGameListElementInit = 0;
      resolve();
    });
  }

  protected getGameListContainer (): HTMLElement | null {
    const catalog = document.getElementsByClassName('catalog') as HTMLCollection;
    if (!catalog) {
      return null;
    }
    const catalogArr = Array.from(catalog) as HTMLElement[];
    for (const item of catalogArr) {
      if (item.dataset && item.dataset.catalog_id === 'midweek-madness-catalog') {
        return item;
      }
    }
    return null;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    const titleContainer = infoContainer.children[0]?.getElementsByClassName('catalog-image-ratio-container')[0] as HTMLElement;
    if (!titleContainer) {
      return;
    }
    return titleContainer.title;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | null {
    return infoContainer.children[0] as HTMLElement;
  }
}
