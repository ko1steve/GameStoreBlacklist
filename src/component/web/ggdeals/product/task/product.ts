import { ProductTaskHandler } from './../../../../../core/task/productTaskHandler';

export class GgdealsProductTaskHandler extends ProductTaskHandler {
  protected getCheckboxParent (): HTMLElement | undefined {
    const gameCardElement = document.getElementById('game-card');
    const gameHeaderElement = gameCardElement?.getElementsByClassName('game-header')[0];
    const gameSectionElement = gameHeaderElement?.getElementsByClassName('game-section')[0];
    const colLeftElement = gameSectionElement?.getElementsByClassName('col-left')[0];
    const gameHeaderBox = colLeftElement?.getElementsByClassName('game-header-box')[0];
    const wrapperElement = gameHeaderBox?.getElementsByClassName('game-info-image-wrapper')[0] as HTMLElement;
    if (!wrapperElement) {
      return undefined;
    }
    wrapperElement.style.position = 'relative';
    return wrapperElement;
  }

  protected getRawGameTitle (): string | undefined {
    const catagoryListElement = document.getElementById('page')
      ?.getElementsByClassName('relative breadcrumbs-widget pjax-inner-replace')[0]?.children[0]?.children[0];
    const length = catagoryListElement?.children.length!;
    return (catagoryListElement?.children[length - 1]?.children[0]?.children[0] as HTMLElement)?.innerText;
  }
}
