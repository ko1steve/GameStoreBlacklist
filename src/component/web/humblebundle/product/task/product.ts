import { ProductTaskHandler } from './../../../../../core/task/productTaskHandler';

export class HumbleBundleProductTaskHandler extends ProductTaskHandler {
  protected getRawGameTitle (infoContainer?: HTMLElement): string {
    return (document.getElementsByClassName('showcase-large')[0]
      ?.getElementsByClassName('human_name-view')[0] as HTMLHeadingElement)
      ?.innerText;
  }

  protected getCheckboxParent (): HTMLElement | undefined {
    return document.getElementsByClassName('showcase-info-section')[0] as HTMLDivElement;
  }
}
