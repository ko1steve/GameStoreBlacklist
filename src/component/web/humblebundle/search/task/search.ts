import { ListTaskHandler } from './../../../../../core/task/listTaskHandler';

export class HumbleBundleSearchTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | undefined {
    return document.getElementsByClassName('entities-list')[0] as HTMLElement;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.getElementsByClassName('entity-title')[0] as HTMLSpanElement)?.innerText;
  }
}
