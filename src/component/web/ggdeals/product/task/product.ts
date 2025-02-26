import { ProductTaskHandler } from './../../../../../core/task/productTaskHandler';

export class GgdealsProductTaskHandler extends ProductTaskHandler {
  protected getCheckboxParent (): HTMLElement | undefined {
    return document.getElementsByClassName('game-heading')[0] as HTMLElement;
  }

  protected getRawGameTitle (): string | undefined {
    const catagoryListElement = document.getElementById('page')?.getElementsByClassName('breadcrumbs-list')[0];
    return catagoryListElement?.lastElementChild?.getElementsByTagName('span')[0]?.innerText;
  }
}
