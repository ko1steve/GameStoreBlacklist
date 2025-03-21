import { ListTaskHandler } from './../../../../core/task/list-task-handler';

export class GgdealsGamesListItemsTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | undefined {
    return document.getElementsByClassName('list-items')[0] as HTMLElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByClassName('title-inner')[0]?.innerHTML;
  }
}
