import { ListTaskHandler } from './../../../../../core/task/listTaskHandler';

export class HumbleBundleSearchTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | null {
    return document.getElementsByClassName('chunks-container')[0].getElementsByClassName('entities-list')[0] as HTMLDivElement;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | null {
    return infoContainer;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.getElementsByClassName('entity-title')[0] as HTMLSpanElement)?.innerText;
  }
}
