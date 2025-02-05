import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/componentController';
import { FanaticalSearchConfig } from './config';

class FanaticalSearchController extends ComponentController {
  protected componentConfig!: FanaticalSearchConfig;

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0]?.getElementsByClassName('hit-card-overlay')[0]?.children[0]?.children[1]?.children[0]?.children[0] !== undefined;
  }

  protected getGameListContainer (): HTMLElement | null {
    return document.getElementsByClassName('search-results')[0] as HTMLDivElement;
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | null {
    return infoContainer;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.getElementsByClassName('hit-card-overlay')[0]?.children[0]?.children[1]?.children[0]?.children[0] as HTMLAnchorElement)?.innerText;
  }
}

const componentConfig = Container.get(FanaticalSearchConfig);
const controller = new FanaticalSearchController(componentConfig);
