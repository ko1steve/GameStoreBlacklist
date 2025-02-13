import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/componentController';
import { GreenManGamingComingSoonConfig } from './config';

class GreenManGamingComingController extends ComponentController {
  protected componentConfig!: GreenManGamingComingSoonConfig;
  protected countPrechaseListElementInit: number = 0;

  protected initailzie (): void {
    this.handlePrechaseContent();
    super.initailzie();
  }

  protected handlePrechaseContent (): void {
    const prechaseListContainerArr = this.getMultiPrechaseListContainer();
    if (!prechaseListContainerArr || prechaseListContainerArr.length === 0) {
      return;
    }
    for (const prechaseListContainer of prechaseListContainerArr) {
      if (!prechaseListContainer || !prechaseListContainer.dataset || prechaseListContainer.dataset.hasInit === 'true') {
        return;
      }
      const prechaseListChildren = Array.from(prechaseListContainer.children) as HTMLElement[];
      if (!this.isPrechaseListFirstChildExist(prechaseListChildren) || this.isGameListFirstChildInit(prechaseListChildren)) {
        return;
      }
      prechaseListChildren.forEach(gameInfoElement => {
        this.addCheckBoxToPrechaseListEachChild(gameInfoElement, prechaseListContainer);
      });
      if (this.countPrechaseListElementInit === prechaseListChildren.length) {
        prechaseListContainer.dataset.hasInit = 'true';
      }
      this.countPrechaseListElementInit = 0;
    }
  }

  protected getMultiPrechaseListContainer (): HTMLElement[] | undefined {
    return Array.from(document.getElementsByClassName('owl-stage')) as HTMLElement[];
  }

  protected isPrechaseListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0]?.children[0] !== undefined;
  }

  protected addCheckBoxToPrechaseListEachChild (gameInfoElement: HTMLElement, gameListContainer: HTMLElement): void {
    if (gameInfoElement.dataset && gameInfoElement.dataset.hasInit === 'true') {
      this.countPrechaseListElementInit++;
      return;
    }
    const modifiedInfoElement = this.modifyGameInfoElement(gameInfoElement, gameListContainer);
    if (!modifiedInfoElement) {
      return;
    }
    gameInfoElement = modifiedInfoElement;
    const rawGameTitle = this.getPrechaseGameRawTitle(gameInfoElement);
    if (!rawGameTitle) {
      return;
    }
    const gameTitle = this.getPrechaseGameModifiedTitle(rawGameTitle);

    const checkboxParent = this.getPrechaseCheckboxParent(gameInfoElement);
    if (!checkboxParent) {
      return;
    }
    const inBlacklist = this.dataModel.getGameStatus(gameTitle);
    this.addCheckbox(checkboxParent, gameTitle, inBlacklist, {
      hideGame: {
        infoElement: gameInfoElement,
        parentList: gameListContainer
      }
    });

    if (this.componentConfig.isGameListPage) {
      if (inBlacklist && !this.dataModel.showBlacklistGame) {
        this.hideGame(gameListContainer, gameInfoElement);
      }
    }
    gameInfoElement.dataset.hasInit = 'true';
    this.countPrechaseListElementInit++;
  }

  protected getPrechaseGameRawTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.children[1]?.children[0]?.children[3] as HTMLImageElement)?.alt;
  }

  protected getPrechaseGameModifiedTitle (title: string): string {
    return title;
  }

  protected getPrechaseCheckboxParent (infoContainer: HTMLElement): HTMLElement | null {
    return infoContainer.children[0] as HTMLElement;
  }

  protected handleListPageContent (): void {
    const gameListContainerArr = this.getMultiGameListContainer();
    if (!gameListContainerArr) {
      return;
    }
    for (const gameListContainer of gameListContainerArr) {
      if (!gameListContainer || !gameListContainer.dataset || gameListContainer.dataset.hasInit === 'true') {
        return;
      }
      const gameListChildren = Array.from(gameListContainer.children) as HTMLElement[];
      if (!this.isGameListFirstChildExist(gameListChildren) || this.isGameListFirstChildInit(gameListChildren)) {
        return;
      }
      gameListChildren.forEach((gameInfoElement, i) => {
        this.addCheckBoxToGameListEachChild(gameInfoElement, gameListContainer);
      });
      if (this.countGameListElementInit === gameListChildren.length) {
        gameListContainer.dataset.hasInit = 'true';
      }
      this.countGameListElementInit = 0;
    }
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0]?.children[0] !== undefined;
  }

  protected getMultiGameListContainer (): HTMLElement[] | undefined {
    const collection = Array.from(document.getElementsByClassName('large-product-block')) as HTMLElement[];
    if (!collection || collection.length === 0) {
      return undefined;
    }
    const gameListContainers = collection.map(e => e.children[0]?.children[0]?.children[0]?.children[0]?.children[0] as HTMLElement);
    for (const container of gameListContainers) {
      if (!container) {
        return undefined;
      }
    }
    return gameListContainers;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | null {
    return infoContainer.children[0] as HTMLElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.children[0]?.children[3]?.children[0] as HTMLImageElement)?.alt;
  }
}

const componentConfig = Container.get(GreenManGamingComingSoonConfig);
const controller = new GreenManGamingComingController(componentConfig);
