import { MultiListTaskHandler } from './../../../../core/task/multi-list-task-handler';
import { StringFormatter } from './../../../../util/string-formatter';

export class FanaticalSlickTrackTaskHandler extends MultiListTaskHandler {
  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const containers = Array.from(document.getElementsByClassName('slick-track')) as HTMLElement[];
    if (!containers || containers.length === 0) {
      return undefined;
    }
    const excludeParentClass = ['CardPanelCarousel', 'fan-favourites'];
    const excludeSectionTitle = ['FantasyVerse'];
    return containers.filter(e => {
      const className = (e.parentNode?.parentNode?.parentNode as HTMLElement).className;
      if (!className) {
        return true;
      }
      return !className.split(StringFormatter.SPACE).some(e => excludeParentClass.includes(e));
    }).filter(e => {
      const sectionTitle = ((e.parentNode?.parentNode?.parentNode?.parentNode as HTMLElement)?.getElementsByClassName('section-title')[0] as HTMLHeadingElement)?.innerText;
      if (!sectionTitle) {
        return false;
      }
      return !excludeSectionTitle.some(e => sectionTitle.includes(e));
    });
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    const firstGameInfo = children[0];
    return firstGameInfo?.children[0]?.getElementsByClassName('HitCardContainer')[0] !== undefined;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.getElementsByClassName('hit-card-overlay')[0]?.children[0]?.children[1]?.children[0]?.children[0] as HTMLAnchorElement)?.innerText;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    return infoContainer.getElementsByClassName('HitCard')[0] as HTMLElement;
  }
}
