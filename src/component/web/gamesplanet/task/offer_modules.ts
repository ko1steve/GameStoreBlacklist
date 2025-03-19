import { MultiListTaskHandler } from '../../../../core/task/multi-list-task-handler';

export class GamesplanetOfferModulesTaskHandler extends MultiListTaskHandler {
  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const containerParent = document.getElementById('offer_modules');
    const collection = containerParent?.children;
    if (!collection) {
      return undefined;
    }
    return Array.from(collection).filter(e => e.className.split(' ').includes('row')) as HTMLElement[];
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByTagName('img')[0]?.alt;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.children[0] as HTMLElement;
  }
}
