import { ProductTaskHandler } from './../../../../../core/task/productTaskHandler';

export class GamivoProductTaskHandler extends ProductTaskHandler {
  protected getRawGameTitle (infoContainer?: HTMLElement): string | undefined {
    return document.getElementsByClassName('product-info')[0]
      ?.getElementsByTagName('h1')[0]
      ?.innerText;
  }

  protected getCheckboxParent (): HTMLElement | undefined {
    return document.getElementsByClassName('product-info')[0] as HTMLDivElement;
  }
}
