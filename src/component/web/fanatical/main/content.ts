import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/componentController';
import { FanaticalMainConfig } from './config';

class FanaticalMainController extends ComponentController {
  protected componentConfig!: FanaticalMainConfig;

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0]?.getElementsByClassName('hit-card-overlay')[0]?.children[0]?.children[1]?.children[0]?.children[0] !== undefined;
  }

  protected getGameListContainer (): HTMLElement | null {
    return document.getElementsByClassName('HitCardsRow')[0] as HTMLDivElement;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | null {
    return infoContainer;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.getElementsByClassName('hit-card-overlay')[0]?.children[0]?.children[1]?.children[0]?.children[0] as HTMLAnchorElement)?.innerText;
  }
}

const componentConfig = Container.get(FanaticalMainConfig);
const controller = new FanaticalMainController(componentConfig);
