import { ListTaskHandler } from './../../../../../core/task/listTaskHandler';

export class GgdealsListItemsTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | undefined {
    const listItemContainer = document.getElementsByClassName('list-items')[0] as HTMLDivElement;
    if (!listItemContainer) {
      return undefined;
    }
    return listItemContainer;
  }

  protected modifyGameInfoElement (infoElement: HTMLElement): HTMLElement | undefined {
    // const ahrefElement = infoElement.getElementsByClassName('full-link')[0];
    // if (!ahrefElement) {
    //   return undefined;
    // }
    // infoElement.removeChild(ahrefElement);
    return infoElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByClassName('title-inner')[0]?.innerHTML;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement {
    // return infoContainer.getElementsByClassName('feature-info')[0] as HTMLElement;
    return infoContainer;
  }
}
