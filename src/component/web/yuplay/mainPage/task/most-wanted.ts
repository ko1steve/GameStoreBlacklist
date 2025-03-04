import { ListTaskHandler } from './../../../../../core/task/list-task-handler';

export class YuplayMostWantedTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | undefined {
    const catalog = document.getElementsByClassName('catalog') as HTMLCollection;
    if (!catalog) {
      return undefined;
    }
    const catalogArr = Array.from(catalog) as HTMLElement[];
    for (const item of catalogArr) {
      if (item.dataset && item.dataset.catalog_id === 'most-wanted-catalog') {
        return item;
      }
    }
    return undefined;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    const titleContainer = infoContainer.children[0]?.getElementsByClassName('catalog-image-ratio-container')[0] as HTMLElement;
    if (!titleContainer) {
      return;
    }
    return titleContainer.title;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.children[0] as HTMLElement;
  }
}
