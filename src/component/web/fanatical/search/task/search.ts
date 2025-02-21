import { ListTaskHandler } from './../../../../../core/task/listTaskHandler';

export class FanaticalSearchTaskHandler extends ListTaskHandler {
  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0]?.getElementsByClassName('hit-card-overlay')[0] !== undefined;
  }

  protected getGameListContainer (): HTMLElement | undefined {
    return document.getElementsByClassName('search-results')[0] as HTMLDivElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.getElementsByClassName('hit-card-overlay')[0]?.children[0]?.children[1]?.children[0]?.children[0] as HTMLAnchorElement)?.innerText;
  }
}
