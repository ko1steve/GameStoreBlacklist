import { ProductTaskHandler } from './../../../../core/task/product-task-handler';

export class YuplayProductTaskHandler extends ProductTaskHandler {
  protected getRawGameTitle (): string | undefined {
    return document.getElementById('product-main-information')?.getElementsByClassName('product-name')[0]?.innerHTML;
  }

  protected getCheckboxParent (): HTMLElement | undefined {
    const mainItemContainer = document.getElementById('product-main-information');
    return mainItemContainer?.getElementsByClassName('catalog-image-container')[0] as HTMLElement;
  }

  protected createCheckbox (parent: HTMLElement): HTMLImageElement {
    const checkboxImg = super.createCheckbox(parent);
    checkboxImg.parentElement!.className = this.componentConfig.checkboxContainer.className! + ' right';
    return checkboxImg;
  }
}
