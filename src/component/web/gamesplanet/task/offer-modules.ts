import { MultiListTaskHandler } from '../../../../core/task/multi-list-task-handler';

export class GamesplanetOfferModulesTaskHandler extends MultiListTaskHandler {
  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const containerParent = document.getElementById('offer_modules');
    const collection = containerParent?.children;
    if (!collection) {
      return undefined;
    }
    return Array.from(collection).flatMap(e => {
      if (e.className.split(' ').includes('row')) {
        const gamelistContainers = Array.from(e.children).filter(e => e.className.split(' ').includes('game_list'));
        if (gamelistContainers && gamelistContainers.length > 0) {
          const collection = gamelistContainers.map(c => {
            const row = c.getElementsByClassName('row')[0];
            if (row) {
              return row;
            }
            return c;
          });
          return collection as HTMLElement[];
        }
        return [e];
      }
      return [e];
    }) as HTMLElement[];
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByTagName('img')[0]?.alt;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.children[0] as HTMLElement;
  }
}
