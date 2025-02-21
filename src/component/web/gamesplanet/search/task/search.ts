import { ListTaskHandler } from 'src/core/task/listTaskHandler';

export class GamesplanetSearchTaskHandler extends ListTaskHandler {
  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0]?.children[0] !== undefined;
  }

  protected getGameListContainer (): HTMLElement | undefined {
    const container = document.getElementById('search_filtered_view');
    if (!container) {
      return undefined;
    }
    return container;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.children[0]?.children[0] as HTMLImageElement)?.alt;
  }
}
