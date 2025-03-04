import { ListTaskHandler } from './../../../../../core/task/list-task-handler';

export class HumbleBundleSlickTrackTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | undefined {
    return document.getElementsByClassName('slick-track')[0] as HTMLElement;
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    const firstGameInfo = children[0];
    return firstGameInfo?.getElementsByClassName('name')[0] !== undefined;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.children[0] as HTMLElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.getElementsByClassName('name')[0] as HTMLSpanElement)?.innerText;
  }
}
