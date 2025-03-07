import { ListTaskHandler } from './../../../../core/task/list-task-handler';

export class HumbleBundleChunkEntityListTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | undefined {
    return document.getElementsByClassName('chunks-container')[0]?.getElementsByClassName('entities-list')[0] as HTMLElement;
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    const firstGameInfo = children[0];
    return firstGameInfo.getElementsByClassName('entity-title')[0] !== undefined;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.getElementsByClassName('entity-title')[0] as HTMLSpanElement)?.innerText;
  }
}
