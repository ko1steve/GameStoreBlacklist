import { StringFormatter } from 'src/util/string-formatter';
import { ListTaskHandler } from '../../../../core/task/list-task-handler';

export class GgdealsDealsListItemsTaskHandler extends ListTaskHandler {
  protected getGameListContainer (): HTMLElement | undefined {
    return document?.getElementsByClassName('list-items')[0] as HTMLElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.getElementsByClassName('game-info-title-wrapper')[0] as HTMLElement
    )?.getElementsByTagName('a')[0].innerHTML;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | undefined {
    const infoChildren = Array.from(infoContainer.children) as HTMLElement[];
    if (!infoChildren || infoChildren.length === 0) {
      return undefined;
    }
    const featureInfo = infoChildren.filter(e => e.className.split(StringFormatter.SPACE).includes('feature-info'))[0];
    return featureInfo || infoContainer;
  }
}
