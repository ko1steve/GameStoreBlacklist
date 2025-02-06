import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/componentController';
import { FanaticalProductConfig } from './config';
import './style.css';

class FanaticalProductController extends ComponentController {
  protected componentConfig!: FanaticalProductConfig;

  protected getRawGameTitle (infoContainer?: HTMLElement): string | undefined {
    return (document.getElementsByClassName('product-name')[0] as HTMLHeadingElement)?.innerText;
  }

  protected getCheckboxParent (): HTMLElement | null {
    return document.getElementsByClassName('ProductHeader__cover')[0] as HTMLDivElement;
  }
}

const componentConfig = Container.get(FanaticalProductConfig);
const controller = new FanaticalProductController(componentConfig);
