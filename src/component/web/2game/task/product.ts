import { ProductTaskHandler } from '../../../../core/task/product-task-handler';

export class TwoGameProductTaskHandler extends ProductTaskHandler {
  protected getRawGameTitle (infoContainer?: HTMLElement): string | undefined {
    return document.getElementsByClassName('ProductPage-Wrapper')[0]?.getElementsByClassName('ProductActions-MainInfo')[0]
      ?.getElementsByTagName('h1')[0]?.innerText;
  }

  protected getCheckboxParent (infoContainer?: HTMLElement): HTMLElement | undefined {
    return document.getElementsByClassName('ProductPage-Wrapper')[0]?.getElementsByClassName('ProductPage-MainImageContainer')[0] as HTMLElement;
  }
}
