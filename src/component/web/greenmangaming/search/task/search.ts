import { ListTaskHandler } from './../../../../../core/task/list-task-handler';

export class GreenManGamingSearchTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | undefined {
    return document.getElementsByClassName('ais-Hits-list')[0] as HTMLElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.getElementsByClassName('search-main-image')[0] as HTMLImageElement)?.alt;
  }
}
