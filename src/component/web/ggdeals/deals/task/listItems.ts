import { ListTaskHandler } from './../../../../../core/task/listTaskHandler';

export class GgdealsListItemsTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | undefined {
    return document?.getElementsByClassName('list-items')[0] as HTMLDivElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.getElementsByClassName('game-info-title-wrapper')[0] as HTMLElement
    )?.getElementsByTagName('a')[0].innerHTML;
  }
}
