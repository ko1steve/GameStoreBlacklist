import { Container } from 'typescript-ioc';
import { ComponentController } from '../../../core/componentController';
import { YuplaySearchConfig } from './config';
import './style.css';

class YuplaySearchController extends ComponentController {
  protected componentConfig!: YuplaySearchConfig;

  protected getPageHeader (): HTMLElement | null {
    const header = document.getElementById('navbar-main');
    if (!header) {
      return null;
    }
    return header;
  }

  protected modifyHeader (header: HTMLElement): void {
    header.className += ' flexbox';
  }

  protected handleListPageContent (): void {
    const gameListContainer = document.getElementsByClassName('catalog')[0] as HTMLElement;
    if (!gameListContainer || !gameListContainer.dataset || gameListContainer.dataset.hasInit === 'true') {
      return;
    }
    const gameListChildren = Array.from(gameListContainer.children) as HTMLElement[];
    if (!this.isGameListFirstChildExist(gameListChildren) || this.isGameListFirstChildInit(gameListChildren)) {
      return;
    }
    gameListChildren.forEach(gameInfoElement => {
      this.addCheckBoxToGameListEachChild(gameInfoElement, gameListContainer);
    });
  }

  protected getRawGameTitle (infoContainer?: HTMLElement): string | undefined {
    return (infoContainer?.children[0]?.getElementsByClassName('catalog-image-ratio-container')[0] as HTMLElement)?.title;
  }

  protected getCheckboxParent (infoContainer?: HTMLElement): HTMLElement | null {
    if (!infoContainer) {
      return null;
    }
    return infoContainer.children[0] as HTMLElement;
  }
}

const componentConfig = Container.get(YuplaySearchConfig);
const controller = new YuplaySearchController(componentConfig);
