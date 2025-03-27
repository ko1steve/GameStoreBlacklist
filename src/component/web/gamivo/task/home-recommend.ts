import { ListTaskHandler } from './../../../../core/task/list-task-handler';

export class GamivoHomeRecommendTaskHandler extends ListTaskHandler {
  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0]?.children[0] !== undefined;
  }

  protected getGameListContainer (): HTMLElement | undefined {
    return document.getElementsByClassName('row home-recommendations__row')[0] as HTMLElement;
  }

  protected getGameListChildren (gameListContainer: HTMLElement): HTMLElement[] | undefined {
    if (!gameListContainer.children) {
      return undefined;
    }
    return Array.from(gameListContainer.children).slice(1) as HTMLElement[];
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.children[0] as HTMLElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.getElementsByClassName('banner-card__title')[0] as HTMLSpanElement)?.innerText;
  }
}
