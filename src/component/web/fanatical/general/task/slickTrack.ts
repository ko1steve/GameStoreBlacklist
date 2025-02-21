import { MultiListTaskHandler } from './../../../../../core/task/multiListTaskHandler';
import { StringFormatter } from './../../../../../util/stringFormatter';

export class FanaticalSlickTrackTaskHandler extends MultiListTaskHandler {
  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const containers = Array.from(document.getElementsByClassName('slick-track')) as HTMLElement[];
    if (!containers || containers.length === 0) {
      return undefined;
    }
    const excludeParentClass = ['CardPanelCarousel', 'fan-favourites'];
    return containers.filter(e => {
      const className = (e.parentNode?.parentNode?.parentNode as HTMLElement).className;
      if (!className) {
        return e;
      }
      const classArr = className.split(StringFormatter.SPACE);
      if (classArr.some(e => excludeParentClass.includes(e))) {
        return undefined;
      }
      return e;
    });
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0]?.getElementsByClassName('HitCardContainer')[0] !== undefined;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.getElementsByClassName('hit-card-overlay')[0]?.children[0]?.children[1]?.children[0]?.children[0] as HTMLAnchorElement)?.innerText;
  }
}
