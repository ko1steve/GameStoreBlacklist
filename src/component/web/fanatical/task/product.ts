import { ProductTaskHandler } from './../../../../core/task/product-task-handler';

export class FanaticalProductTaskHandler extends ProductTaskHandler {
  protected getRawGameTitle (): string | undefined {
    return (document.getElementsByClassName('product-name')[0] as HTMLHeadingElement)?.innerText;
  }

  protected getCheckboxParent (): HTMLElement | undefined {
    return document.getElementsByClassName('product-name')[0] as HTMLElement;
  }
}
