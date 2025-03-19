import { MultiListTaskHandler } from '../../../../../core/task/multi-list-task-handler';

export class GamesplanetGameListTabTaskHandler extends MultiListTaskHandler {
  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const containers = Array.from(document.getElementsByClassName('col-12 col-lg-6 game_list')) as HTMLElement[];
    if (!containers) {
      return undefined;
    }
    return containers;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByTagName('img')[0]?.alt;
  }
}
