import { ProductTaskHandler } from './../../../../core/task/product-task-handler';

export class GamivoProductTaskHandler extends ProductTaskHandler {
  protected getRawGameTitle (): string | undefined {
    return document.getElementsByClassName('product-info')[0]
      ?.getElementsByTagName('h1')[0]
      ?.innerText;
  }

  protected getCheckboxParent (): HTMLElement | undefined {
    return document.getElementsByClassName('product-info')[0] as HTMLElement;
  }
}
