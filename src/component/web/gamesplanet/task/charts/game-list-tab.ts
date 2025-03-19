import { ListTaskHandler } from '../../../../../core/task/list-task-handler';

export class GamesplanetGameListTabTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | undefined {
    return document.getElementsByClassName('col-12 game_list')[0] as HTMLElement;
  }

  protected getGameListChildren (gameListContainer: HTMLElement): HTMLElement[] {
    const children = super.getGameListChildren(gameListContainer);
    return children.filter(e => e.className.split(' ').includes('game_list_big'));
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByTagName('img')[0]?.alt;
  }
}
