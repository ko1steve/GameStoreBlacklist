import { MultiListTaskHandler } from '../../../../core/task/multi-list-task-handler';

export class HumbleBundleThreeTaskHandler extends MultiListTaskHandler {
  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const containers = Array.from(document.getElementsByClassName('mosaic-layout threes')) as HTMLElement[];
    if (!containers || containers.length === 0) {
      return undefined;
    }
    return containers;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.children[1]?.children[0]?.children[0]?.children[0] as HTMLSpanElement)?.innerText;
  }
}
