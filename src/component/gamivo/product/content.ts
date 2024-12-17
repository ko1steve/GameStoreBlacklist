import { Container } from 'typescript-ioc';
import { ComponentController } from '../../../core/componentController';
import { GamivoProductConfig } from './config';
import './style.css';
import { CommonTool } from 'src/util/commonTool';

class GamivoProductController extends ComponentController {
  protected componentConfig!: GamivoProductConfig;

  protected createHeaderBottomContainer (): void {
    const minHeader = this.getPageHeader();
    if (!minHeader || minHeader.dataset?.hasInit === 'true') {
      return;
    }
    const config = this.componentConfig.headerBottomContainer;
    const minContainer = document.createElement('div');
    minContainer.id = config.id! + '_min';
    minContainer.className = config.className!;
    minHeader.appendChild(minContainer);

    this.createShowBlacklistGameCheckbox(minContainer);
    this.createDownloadButton(minContainer);
    this.createUploadButton(minContainer);

    super.createHeaderBottomContainer();
  }

  protected getMinPageHeader (): HTMLElement | null {
    const header = document.getElementsByClassName('top-bar')[0] as HTMLElement;
    if (!header) {
      return null;
    }
    header.className += ' flexbox';
    return header;
  }

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
      ?.getElementsByTagName('h1')[0]
      ?.innerText;
  }

  protected getCheckboxParent (): HTMLElement | null {
    return document.getElementsByClassName('product-info')[0] as HTMLDivElement;
  }
}

const componentConfig = Container.get(GamivoProductConfig);
const controller = new GamivoProductController(componentConfig);
