import { ListTaskHandler } from './../../../../../core/task/listTaskHandler';

export class HumbleBundleSlickTrackTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | undefined {
    return document.getElementsByClassName('recommendations-row')[0]?.getElementsByClassName('slick-track')[0] as HTMLElement;
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    const firstGameInfo = children[0];
    return firstGameInfo?.getElementsByClassName('entity-title')[0] !== undefined;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.children[0] as HTMLElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.getElementsByClassName('entity-title')[0] as HTMLSpanElement)?.innerText;
  }
}
