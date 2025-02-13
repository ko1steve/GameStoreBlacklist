import { ListTaskHandler } from './../../../../../core/task/listTaskHandler';

export class GreenManGamingPreorderTaskHandler extends ListTaskHandler {
  public start (): Promise<void> {
    return new Promise<void>(resolve => {
      const prechaseListContainerArr = this.getMultiGameListContainer();
      if (!prechaseListContainerArr || prechaseListContainerArr.length === 0) {
        return;
      }
      for (const prechaseListContainer of prechaseListContainerArr) {
        if (!prechaseListContainer || !prechaseListContainer.dataset || prechaseListContainer.dataset.hasInit === 'true') {
          return;
        }
        const prechaseListChildren = Array.from(prechaseListContainer.children) as HTMLElement[];
        if (!this.isGameListFirstChildExist(prechaseListChildren) || this.isGameListFirstChildInit(prechaseListChildren)) {
          return;
        }
        prechaseListChildren.forEach(gameInfoElement => {
          this.addCheckBoxToGameListEachChild(gameInfoElement, prechaseListContainer);
        });
        if (this.countGameListElementInit === prechaseListChildren.length) {
          prechaseListContainer.dataset.hasInit = 'true';
        }
        this.countGameListElementInit = 0;
      }
      resolve();
    });
  }

  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    return Array.from(document.getElementsByClassName('owl-stage')) as HTMLElement[];
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0]?.children[0] !== undefined;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.children[1]?.children[0]?.children[3] as HTMLImageElement)?.alt;
  }

  protected getModifiedGameTitle (title: string): string {
    return title;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | null {
    return infoContainer.children[0] as HTMLElement;
  }
}
