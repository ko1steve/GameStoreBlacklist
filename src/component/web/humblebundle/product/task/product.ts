import { ProductTaskHandler } from './../../../../../core/task/productTaskHandler';

export class HumbleBundleProductTaskHandler extends ProductTaskHandler {
  protected getRawGameTitle (): string {
    return (document.getElementsByClassName('human_name-view')[0] as HTMLHeadingElement)?.innerText;
  }

  protected getCheckboxParent (): HTMLElement | undefined {
    return document.getElementsByClassName('product-header-view')[0] as HTMLDivElement;
  }
}
