import { ListTaskHandler } from './../../../../../core/task/listTaskHandler';

export class GgdealsListItemsTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | undefined {
    return document.getElementsByClassName('list-items')[0] as HTMLDivElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByClassName('title-inner')[0]?.innerHTML;
  }
}
