import { ListTaskHandler } from 'src/core/task/list-task-handler';

export class GamesplanetFlexMdWrapTaskHandler extends ListTaskHandler {
  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0] !== undefined;
  }

  protected getGameListContainer (): HTMLElement | undefined {
    const container = document.getElementsByClassName('flex-md-wrap')[0] as HTMLElement;
    if (!container) {
      return undefined;
    }
    return container;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByTagName('img')[0]?.alt;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.children[0] as HTMLElement;
  }
}
