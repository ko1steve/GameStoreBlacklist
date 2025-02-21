import { ListTaskHandler } from './../../../../../core/task/listTaskHandler';

export class YuplaySearchTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | undefined {
    return document.getElementsByClassName('catalog')[0] as HTMLElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.getElementsByClassName('catalog-image-ratio-container')[0] as HTMLElement)?.title;
  }

  protected getCheckboxParent (infoContainer?: HTMLElement): HTMLElement | undefined {
    if (!infoContainer) {
      return undefined;
    }
    return infoContainer.children[0] as HTMLElement;
  }
}
