import { ListTaskHandler } from './../../../../../core/task/listTaskHandler';

export class GgdealsListItemsTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | undefined {
    const dealsList = document.getElementById('deals-list');
    const listContainer = dealsList?.getElementsByClassName('wrap_items')[0];
    const listItemContainer = listContainer?.getElementsByClassName('list-items')[0] as HTMLDivElement;
    return listItemContainer;
  }

  protected modifyGameInfoElement (infoElement: HTMLElement): HTMLElement | undefined {
    const ahrefElement = infoElement.getElementsByClassName('full-link')[0];
    if (!ahrefElement) {
      return undefined;
    }
    infoElement.removeChild(ahrefElement);
    return infoElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.getElementsByClassName('game-info-wrapper')[0]
      ?.getElementsByClassName('game-info-title-wrapper')[0] as HTMLElement
    )?.getElementsByTagName('a')[0].innerHTML;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement {
    return infoContainer.getElementsByClassName('feature-info')[0] as HTMLElement;
  }
}
