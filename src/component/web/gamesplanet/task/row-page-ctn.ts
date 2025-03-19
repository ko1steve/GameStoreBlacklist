import { ListTaskHandler } from 'src/core/task/list-task-handler';

export class GamesplanetRowPageCtnTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | undefined {
    const collection = document.getElementsByClassName('row-page-ctn')[0]?.children;
    if (!collection) {
      return undefined;
    }
    const container = Array.from(collection).find(e => e.className === 'col-12')?.getElementsByClassName('row')[0] as HTMLElement;
    if (!container) {
      return undefined;
    }
    return container;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByTagName('img')[0]?.alt;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.getElementsByClassName('card')[0] as HTMLElement;
  }
}
