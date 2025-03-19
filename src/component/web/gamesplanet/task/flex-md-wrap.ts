import { MultiListTaskHandler } from '../../../../core/task/multi-list-task-handler';

export class GamesplanetFlexMdWrapTaskHandler extends MultiListTaskHandler {
  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0] !== undefined;
  }

  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const collection = document.getElementsByClassName('flex-md-wrap');
    if (!collection) {
      return undefined;
    }
    return Array.from(collection) as HTMLElement[];
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByTagName('img')[0]?.alt;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.children[0] as HTMLElement;
  }
}
