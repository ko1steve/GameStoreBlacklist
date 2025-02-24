import { ListTaskHandler } from './../../../../../core/task/listTaskHandler';

export class GamivoSearchTaskHandler extends ListTaskHandler {
  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0]?.children[0] !== undefined;
  }

  protected getGameListContainer (): HTMLElement | undefined {
    return document.getElementsByClassName('search-results__tiles')[0] as HTMLDivElement;
  }

  protected getCheckboxParent (infoContainer: HTMLDivElement): HTMLElement | undefined {
    return infoContainer;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByClassName('product-tile__description')[0]?.getElementsByTagName('span')[0]?.innerText;
  }
}
