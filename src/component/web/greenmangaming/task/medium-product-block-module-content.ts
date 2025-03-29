import { ComponentConfig } from '../../../../core/component/component-config';
import { MultiListTaskHandler } from '../../../../core/task/multi-list-task-handler';

export class GreenManGamingMediumProductBlockModuleContentTaskHandler extends MultiListTaskHandler {
  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const collection = Array.from(document.getElementsByClassName('medium-product-block')) as HTMLElement[];
    if (!collection || collection.length === 0) {
      return undefined;
    }
    const gameListContainers = collection.map(e => e.getElementsByClassName('module-content')[0] as HTMLElement);
    for (const container of gameListContainers) {
      if (!container) {
        return undefined;
      }
    }
    return gameListContainers;
  }

  protected getGameListChildren (gameListContainer: HTMLElement): HTMLElement[] | undefined {
    return super.getGameListChildren(gameListContainer)?.filter(e => {
      for (const excludeClass of this.componentConfig.texthandle.excludeClassNames!) {
        if (e.getElementsByTagName('a')[0]?.href?.includes(excludeClass)) {
          return false;
        }
      }
      return true;
    });
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    const firstGameInfo = children[0];
    return firstGameInfo?.children[0] !== undefined;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.children[0] as HTMLElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.getElementsByClassName('img-full')[0] as HTMLImageElement)?.alt;
  }
}
