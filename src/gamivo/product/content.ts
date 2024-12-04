import { Container } from 'typescript-ioc'
import { ComponentController } from '../../core/componentController'
import { GamivoProductConfig } from './config'
import './style.css'

class GamivoProductController extends ComponentController {
  protected componentConfig!: GamivoProductConfig

  protected getRawGameTitle (infoContainer?: HTMLElement): string {
    const productInfoContainer = document.getElementsByClassName('product-info')[0]
    if (!productInfoContainer) {
      return ''
    }
    const productInfoTop = productInfoContainer.getElementsByClassName('product-info__top')[0]
    if (!productInfoTop) {
      return ''
    }
    const productInfoName = productInfoTop.getElementsByClassName('product-info__name')[0]
    if (!productInfoName) {
      return ''
    }
    const productTitle = productInfoName.getElementsByTagName('h1')[0]
    if (!productTitle) {
      return ''
    }
    const productNameElement = productTitle.getElementsByTagName('span')[0]
    if (!productNameElement) {
      return ''
    }
    return productNameElement.innerText || ''
  }

  protected getCheckboxParent (): HTMLElement | null {
    return document.getElementsByClassName('product-info')[0] as HTMLDivElement
  }
}

const componentConfig = Container.get(GamivoProductConfig)
const controller = new GamivoProductController(componentConfig)
