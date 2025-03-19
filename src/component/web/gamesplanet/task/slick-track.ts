import { MultiListTaskHandler } from '../../../../core/task/multi-list-task-handler';

export class GamesplanetSlickTrackTaskHandler extends MultiListTaskHandler {
  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0] !== undefined;
  }

  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const containers = Array.from(document.getElementsByClassName('slick-track')) as HTMLElement[];
    if (!containers) {
      return undefined;
    }
    return containers;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByTagName('img')[0]?.alt;
  }
}
