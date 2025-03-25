import { ListTaskHandler } from 'src/core/task/list-task-handler';

export class GamesplanetWeeklyDealsTaskHandler extends ListTaskHandler {
  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0] !== undefined;
  }

  protected getGameListContainer (): HTMLElement | undefined {
    const collection = document.getElementsByTagName('h3');
    if (!collection) {
      return undefined;
    }
    const targetHeading = Array.from(collection).find(e => e.innerText?.toUpperCase() === 'WEEKLY DEALS');
    return targetHeading?.parentElement?.getElementsByClassName('row')[0] as HTMLElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByTagName('img')[0]?.alt;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.children[0] as HTMLElement;
  }
}
