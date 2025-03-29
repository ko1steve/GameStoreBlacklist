import { MultiListTaskHandler } from './../../../../core/task/multi-list-task-handler';

export class TwoGameSliderWidgetCardWrapperTaskHandler extends MultiListTaskHandler {
  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const collection = document.getElementsByClassName('SliderWidget-CardWrapper');
    if (!collection) {
      return undefined;
    }
    return Array.from(collection) as HTMLElement[];
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return infoContainer.getElementsByClassName('ImageProxyPicture')[0]?.getElementsByTagName('img')[0]?.alt;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer;
    // return infoContainer.getElementsByClassName('ProductCard-Picture')[0] as HTMLElement;
  }
}
