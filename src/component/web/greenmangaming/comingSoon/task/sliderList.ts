import { MultiListTaskHandler } from './../../../../../core/task/multiListTaskHandler';

export class GreenManGamingSliderListTaskHandler extends MultiListTaskHandler {
  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    return Array.from(document.getElementsByClassName('owl-stage')) as HTMLElement[];
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    const firstGameInfo = children[0];
    return firstGameInfo?.children[0]?.children[0] !== undefined;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.children[1]?.children[0]?.children[3] as HTMLImageElement)?.alt;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.children[0] as HTMLElement;
  }
}
