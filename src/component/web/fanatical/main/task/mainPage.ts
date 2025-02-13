import { ListTaskHandler } from './../../../../../core/task/listTaskHandler';

export class FanaticalMainPageTaskHandler extends ListTaskHandler {
  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0]?.getElementsByClassName('hit-card-overlay')[0] !== undefined;
  }

  protected getGameListContainer (): HTMLElement | null {
    return document.getElementsByClassName('HitCardsRow')[0] as HTMLDivElement;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | null {
    return infoContainer;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.getElementsByClassName('hit-card-overlay')[0]?.children[0]?.children[1]?.children[0]?.children[0] as HTMLAnchorElement)?.innerText;
  }
}
