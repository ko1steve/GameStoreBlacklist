import { StringFormatter } from 'src/util/stringFormatter';
import { MultiListTaskHandler } from './../../../../../core/task/multiListTaskHandler';

export class HumbleBundleSlickTrackTaskHandler extends MultiListTaskHandler {
  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const containers = Array.from(document.getElementsByClassName('slick-track')) as HTMLElement[];
    if (!containers || containers.length === 0) {
      return undefined;
    }
    const excludeParentClassArr: string[] = ['slick-dotted'];
    const filtered = containers.filter(e => {
      const targetNode = e.parentNode?.parentNode as HTMLElement;
      if (!targetNode) {
        return true;
      }
      const classArr = targetNode.className.split(StringFormatter.SPACE);
      const isFindExclude = classArr.some(className => excludeParentClassArr.includes(className));
      if (isFindExclude) {
        return false;
      }
      return true;
    });
    return filtered;
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.children[0] !== undefined;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.children[0]?.children[0]?.children[0]?.children[1]?.children[0] as HTMLSpanElement)?.innerText;
  }
}
