import { MultiListTaskHandler } from './../../../../../core/task/multiListTaskHandler';

export class HumbleBundleSlickTrackTaskHandler extends MultiListTaskHandler {
  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const containers = Array.from(document.getElementsByClassName('slick-track')) as HTMLElement[];
    if (!containers || containers.length === 0) {
      return undefined;
    }
    return containers;
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    const firstGameInfo = children[0];
    return firstGameInfo?.children[0]?.children[1]?.children[0]?.children[0]?.children[0] !== undefined;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.children[1]?.children[0]?.children[0]?.children[0] as HTMLSpanElement)?.innerText;
  }
}
