import { Container } from 'typescript-ioc';
import { ComponentController } from '../../../core/componentController';
import { GamivoProductConfig } from './config';
import './style.css';

class GamivoProductController extends ComponentController {
  protected componentConfig!: GamivoProductConfig;

  protected getPageHeader (): HTMLElement | null {
    const header = document.getElementsByClassName('main-container row no-gutters')[0] as HTMLElement;
    if (!header) {
      return null;
    }
    header.className += ' flexbox';
    return header;
  }

  protected getRawGameTitle (infoContainer?: HTMLElement): string | undefined {
    return document.getElementsByClassName('product-info')[0]
      ?.getElementsByClassName('product-info__top')[0]
      ?.getElementsByClassName('product-info__name')[0]
      ?.getElementsByTagName('h1')[0]
      ?.getElementsByTagName('span')[0]
      ?.innerText;
  }

  protected getCheckboxParent (): HTMLElement | null {
    return document.getElementsByClassName('product-info')[0] as HTMLDivElement;
  }
}

const componentConfig = Container.get(GamivoProductConfig);
const controller = new GamivoProductController(componentConfig);
