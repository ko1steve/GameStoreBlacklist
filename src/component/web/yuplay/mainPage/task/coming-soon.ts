import { ListTaskHandler } from './../../../../../core/task/list-task-handler';

export class YuplayComingSoonTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | undefined {
    const container = document.getElementById('coming-soon-slider-preview-container');
    return container || undefined;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByClassName('slider-preview-title')[0]?.getElementsByTagName('a')[0]?.innerText;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.children[0] as HTMLElement;
  }
}
