import { ProductTaskHandler } from './../../../../../core/task/productTaskHandler';

export class HumbleBundleProductTaskHandler extends ProductTaskHandler {
  protected getRawGameTitle (): string {
    return (document.getElementsByClassName('product-header-view')[0]
      ?.getElementsByTagName('h1')[0] as HTMLHeadingElement)
      ?.innerText;
  }

  protected getCheckboxParent (): HTMLElement | undefined {
    return document.getElementsByClassName('product-header-view')[0] as HTMLDivElement;
  }
}
