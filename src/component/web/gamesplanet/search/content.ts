import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/componentController';
import { GamesplanetSearchConfig } from './config';

class GamesplanetSearchController extends ComponentController {
  protected componentConfig!: GamesplanetSearchConfig;

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children[0]?.children[0]?.children[0] !== undefined;
  }

  protected getGameListContainer (): HTMLElement | null {
    return document.getElementById('search_filtered_view');
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement | null {
    return infoContainer;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.children[0]?.children[0] as HTMLImageElement)?.alt;
  }
}

const componentConfig = Container.get(GamesplanetSearchConfig);
const controller = new GamesplanetSearchController(componentConfig);
