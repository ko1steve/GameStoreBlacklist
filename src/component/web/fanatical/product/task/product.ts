import { ProductTaskHandler } from 'src/core/task/productTaskHandler';

export class FanaticalProductTaskHandler extends ProductTaskHandler {
  protected getRawGameTitle (infoContainer?: HTMLElement): string | undefined {
    return (document.getElementsByClassName('product-name')[0] as HTMLHeadingElement)?.innerText;
  }

  protected getCheckboxParent (): HTMLElement | undefined {
    return document.getElementsByClassName('product-name')[0] as HTMLElement;
  }
}
