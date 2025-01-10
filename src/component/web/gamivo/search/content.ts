import { Container } from 'typescript-ioc';
import { ComponentController } from '../../../../core/componentController';
import { GamivoSearchConfig } from './config';
import './style.css';

class GamivoSearchController extends ComponentController {
  protected componentConfig!: GamivoSearchConfig;

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children != null && children[0] != null && children[0].children[0].children[0] != null;
  }

  protected getGameListContainer (): HTMLElement | null {
    return document.getElementsByClassName('search-results__tiles')[0] as HTMLDivElement;
  }

  protected getCheckboxParent (newInfoElement?: HTMLDivElement): HTMLElement | null {
    if (!newInfoElement) {
      return null;
    }
    const productTitleContainer = newInfoElement.getElementsByClassName('product-tile')[0] as HTMLDivElement;
    const productImageContainer = productTitleContainer.getElementsByClassName('product-tile__image')[0] as HTMLDivElement;
    if (!productImageContainer) {
      return null;
    }
    return productImageContainer.getElementsByTagName('div')[0] as HTMLDivElement;
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string | undefined {
    return (infoContainer.children[0]?.children[1]?.children[0]?.children[0] as HTMLSpanElement)?.innerText;
  }

  protected modifyGameInfoElement (infoElement: HTMLElement, parent: HTMLElement): HTMLElement | null {
    const newInfoElement = this.getModifiedInfoElement(infoElement);
    if (!newInfoElement) {
      return null;
    }
    parent.removeChild(infoElement);
    parent.appendChild(newInfoElement);
    return newInfoElement;
  }

  private getModifiedInfoElement (infoElement: HTMLElement) {
    const nInfoElement = document.createElement('div');
    nInfoElement.dataset.hasInit = 'true';
    nInfoElement.className = infoElement.className;

    const productTitleContainer = infoElement.getElementsByClassName('product-tile')[0] as HTMLDivElement;
    if (!productTitleContainer) {
      return null;
    }
    const nProductTitleContainer = document.createElement('div');
    nProductTitleContainer.className = productTitleContainer.className;
    nInfoElement.appendChild(nProductTitleContainer);

    const nProductImageContainer = this.getNewProductImageContainer(productTitleContainer);
    if (!nProductImageContainer) {
      return null;
    }
    nProductTitleContainer.appendChild(nProductImageContainer);

    const nDescriptionContainer = this.getNewDescriptionContainer(productTitleContainer);
    if (!nDescriptionContainer) {
      return null;
    }
    nProductTitleContainer.appendChild(nDescriptionContainer);

    return nInfoElement;
  }

  private getNewProductImageContainer (productTitleContainer: HTMLDivElement): HTMLElement | null {
    const productImageContainer = productTitleContainer.getElementsByClassName('product-tile__image')[0] as HTMLDivElement;
    if (!productImageContainer) { return null; }

    const nProductImageContainer = document.createElement('div');
    nProductImageContainer.className = productImageContainer.className;

    const nImageLinkContainer = this.getNewImageLinkContainer(productImageContainer);
    if (!nImageLinkContainer) { return null; }

    nProductImageContainer.appendChild(nImageLinkContainer);

    const nPromotionContainer = this.getNewPromotionContainer(productImageContainer);
    if (nPromotionContainer) {
      nProductImageContainer.appendChild(nPromotionContainer);
      nProductImageContainer.style.position = 'relative';
    }
    return nProductImageContainer;
  }

  private getNewImageLinkContainer (productImageContainer: HTMLDivElement): HTMLDivElement | null {
    const imageLinkContainer = productImageContainer.getElementsByClassName('ng-star-inserted')[0];
    if (!imageLinkContainer) { return null; }

    const nImageLinkContainer = document.createElement('div');
    nImageLinkContainer.className = imageLinkContainer.className;

    const nAhrefImageContainer = document.createElement('div');
    nImageLinkContainer.appendChild(nAhrefImageContainer);

    const nAppImageContainer = document.createElement('div');
    nAhrefImageContainer.appendChild(nAppImageContainer);

    const figureContainer = imageLinkContainer.getElementsByTagName('figure')[0];
    if (!figureContainer) { return null; }

    const nFigureContainer = document.createElement('div');
    nFigureContainer.className = figureContainer.className;
    nAppImageContainer.appendChild(nFigureContainer);

    const imageElement = imageLinkContainer.getElementsByTagName('img')[0];
    if (!imageElement) { return null; }

    const nImageElement = document.createElement('img');
    nImageElement.className = imageElement.className;
    nImageElement.alt = imageElement.alt;
    nImageElement.src = imageElement.src;
    nImageElement.width = imageElement.width;
    nImageElement.height = imageElement.height;
    nFigureContainer.appendChild(nImageElement);

    return nImageLinkContainer;
  }

  private getNewPromotionContainer (productImageContainer: HTMLDivElement): HTMLDivElement | null {
    const promotionContainer = productImageContainer.getElementsByClassName('product-tile__image--promotion')[0];
    if (!promotionContainer) { return null; }

    const nPromotionContainer = document.createElement('div');
    nPromotionContainer.className = promotionContainer.className;

    const numberContainer = promotionContainer.getElementsByClassName('number')[0];
    if (!numberContainer) { return null; }

    const nNumberContainer = document.createElement('div');
    nNumberContainer.className = numberContainer.className + ' promotion';
    nPromotionContainer.appendChild(nNumberContainer);

    const percentageElement = numberContainer.getElementsByTagName('span')[0];
    if (!percentageElement) { return null; }

    const nPercentageElement = document.createElement('span');
    nPercentageElement.className = percentageElement.className;
    nPercentageElement.innerText = percentageElement.innerText;
    nNumberContainer.appendChild(nPercentageElement);

    return nPromotionContainer;
  }

  private getNewDescriptionContainer (productTitleContainer: HTMLDivElement): HTMLDivElement | null {
    const descriptionContainer = productTitleContainer.getElementsByClassName('product-tile__description')[0];
    if (!descriptionContainer) { return null; }

    const nDescriptionContainer = document.createElement('div');
    nDescriptionContainer.className = descriptionContainer.className;

    const producTitleNameContainer = descriptionContainer.getElementsByClassName('product-tile__name')[0];
    if (!producTitleNameContainer) { return null; }

    const nProducTitleNameContainer = document.createElement('div');
    nProducTitleNameContainer.className = producTitleNameContainer.className;
    nDescriptionContainer.appendChild(nProducTitleNameContainer);

    const producTitleNameAhrefElement = producTitleNameContainer.getElementsByTagName('a')[0];
    const nProducTitleNameAhrefElement = document.createElement('a');
    nProducTitleNameAhrefElement.className = producTitleNameAhrefElement.className;
    nProducTitleNameAhrefElement.href = producTitleNameAhrefElement.href;
    nProducTitleNameContainer.appendChild(nProducTitleNameAhrefElement);

    const producTitleNameElement = producTitleNameAhrefElement.getElementsByTagName('span')[0];
    const nProducTitleNameElement = document.createElement('span');
    nProducTitleNameElement.className = producTitleNameElement.className;
    nProducTitleNameElement.innerText = producTitleNameElement.innerText;
    nProducTitleNameAhrefElement.appendChild(nProducTitleNameElement);

    const priceInfoContainer = descriptionContainer.getElementsByClassName('product-tile__price')[0];
    if (!priceInfoContainer) { return null; }

    const nPriceInfoContainer = document.createElement('div');
    nPriceInfoContainer.className = priceInfoContainer.className;
    nDescriptionContainer.appendChild(nPriceInfoContainer);

    const currentPriceElement = priceInfoContainer.getElementsByClassName('current-price')[0];
    const nOldAndNewPriceElement = document.createElement('span');
    nOldAndNewPriceElement.className = currentPriceElement.className;
    nPriceInfoContainer.appendChild(nOldAndNewPriceElement);

    const currentPriceValueElement = currentPriceElement.getElementsByTagName('span')[0];
    const nCurrentPriceElement = document.createElement('span');
    nCurrentPriceElement.className = currentPriceValueElement.className;
    nCurrentPriceElement.innerText = currentPriceValueElement.innerText;
    nOldAndNewPriceElement.appendChild(nCurrentPriceElement);

    const officialPriceElement = priceInfoContainer.getElementsByClassName('official-price')[0] as HTMLSpanElement;
    if (!officialPriceElement) { return nDescriptionContainer; }

    const nOfficialPriceElement = document.createElement('span');
    nOfficialPriceElement.className = officialPriceElement.className;
    nOfficialPriceElement.innerText = officialPriceElement.innerText;
    nPriceInfoContainer.appendChild(nOfficialPriceElement);

    return nDescriptionContainer;
  }
}

const componentConfig = Container.get(GamivoSearchConfig);
const controller = new GamivoSearchController(componentConfig);
