import { MultiListTaskHandler } from './../../../../core/task/multiListTaskHandler';

export class GamivoCarouselInnerTaskHandler extends MultiListTaskHandler {
  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const containers = Array.from(document.getElementsByClassName('carousel-inner')) as HTMLElement[];
    if (!containers || containers.length === 0) {
      return undefined;
    }
    return containers;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.children[0] as HTMLElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByClassName('product-tile__description')[0]?.getElementsByTagName('span')[0]?.innerText;
  }
}
