import { ListTaskHandler } from './../../../../../core/task/listTaskHandler';

export class HumbleBundleSearchTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | null {
    return document.getElementsByClassName('chunks-container')[0].getElementsByClassName('entities-list')[0] as HTMLDivElement;
  }

  // protected modifyGameInfoElement (infoElement: HTMLElement): HTMLElement | null {
  //   const ahrefParent = infoElement.children[0]?.children[0] as HTMLElement;
  //   const ahrefElement = ahrefParent?.children[0];
  //   const ahrefElementChild = ahrefElement?.children[0];
  //   if (ahrefElementChild) {
  //     if (!ahrefParent.dataset.hasInit) {
  //       ahrefElement.removeChild(ahrefElementChild);
  //       ahrefParent.removeChild(ahrefElement);
  //       const container = document.createElement('div');
  //       container.className = ahrefElement.className;
  //       container.appendChild(ahrefElementChild);
  //       ahrefParent.insertBefore(container, ahrefParent.firstChild);
  //       ahrefParent.dataset.hasInit = 'true';
  //     }
  //     const titleElementParent = infoElement.children[0]?.children[0]?.children[0]?.children[0]?.children[1];
  //     const titleElement = titleElementParent?.children[0] as HTMLElement;
  //     if (titleElement) {
  //       if (!titleElement.dataset.hasInit) {
  //         titleElementParent.removeChild(titleElement);
  //         titleElementParent.appendChild(ahrefElement);
  //         ahrefElement.appendChild(titleElement);
  //         titleElement.dataset.hasInit = 'true';
  //       }
  //     } else {
  //       return null;
  //     }
  //   } else {
  //     return null;
  //   }
  //   return infoElement;
  // }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | null {
    return infoContainer;
    // return infoContainer.getElementsByClassName('entity-details')[0] as HTMLElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.getElementsByClassName('entity-title')[0] as HTMLSpanElement)?.innerText;
  }
}
