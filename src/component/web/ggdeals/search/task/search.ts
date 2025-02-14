import { ListTaskHandler } from './../../../../../core/task/listTaskHandler';

export class GgdealsSearchTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | null {
    const dealsList = document.getElementById('deals-list');
    if (!dealsList) {
      return null;
    }
    const listContainer = dealsList.getElementsByClassName('wrap_items')[0];
    if (!listContainer) {
      return null;
    }
    const listItemContainer = listContainer.getElementsByClassName('list-items')[0] as HTMLDivElement;
    if (!listItemContainer) {
      return null;
    }
    return listItemContainer;
  }

  protected modifyGameInfoElement (infoElement: HTMLElement): HTMLElement | null {
    const ahrefElement = infoElement.getElementsByClassName('full-link')[0];
    if (!ahrefElement) {
      return null;
    }
    infoElement.removeChild(ahrefElement);
    return infoElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string {
    return (infoContainer.getElementsByClassName('game-info-wrapper')[0]
      ?.getElementsByClassName('game-info-title-wrapper')[0] as HTMLElement
    )?.getElementsByTagName('a')[0].innerHTML;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement {
    return infoContainer.getElementsByClassName('feature-info')[0] as HTMLElement;
  }
}
