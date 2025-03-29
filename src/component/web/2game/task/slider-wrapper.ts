import { MultiListTaskHandler } from './../../../../core/task/multi-list-task-handler';

export class TwoGameSliderWrapperTaskHandler extends MultiListTaskHandler {
  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const collection = document.getElementsByClassName('Slider-Wrapper');
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
  }

  protected hideGame (gameListContainer: HTMLElement, gameContainer: HTMLElement): void {
    super.hideGame(gameListContainer, gameContainer);
    const gameListContainerArr = this.getMultiGameListContainer();
    if (!gameListContainerArr || gameListContainerArr.length === 0) {
      return;
    }
    for (const gameListContainer of gameListContainerArr) {
      if (!gameListContainer) {
        continue;
      }
      const sliderCrumbs = gameListContainer.parentElement?.getElementsByClassName('Slider-Crumbs')[0];
      if (!sliderCrumbs || !sliderCrumbs.children) {
        continue;
      }
      const lastCrumb = Array.from(sliderCrumbs.children)?.pop();
      if (!lastCrumb) {
        continue;
      }
      sliderCrumbs.removeChild(lastCrumb);
    }
  }
}
