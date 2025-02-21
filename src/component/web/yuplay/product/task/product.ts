import { ProductTaskHandler } from './../../../../../core/task/productTaskHandler';

export class YuplayProductTaskHandler extends ProductTaskHandler {
  protected getRawGameTitle (): string | undefined {
    return document.getElementById('product-main-information')?.getElementsByClassName('product-name')[0]?.innerHTML;
  }

  protected getCheckboxParent (infoContainer?: HTMLElement): HTMLElement | undefined {
    const mainItemContainer = document.getElementById('product-main-information');
    return mainItemContainer?.getElementsByClassName('catalog-image-container')[0] as HTMLElement;
  }
}
