import { Container } from 'typescript-ioc'
import { GgdealDealsDealConfig } from './config'
import { ComponentController } from '../../../core/componentController'
import './style.css'

class GgdealsDealController extends ComponentController {
  protected componentConfig!: GgdealDealsDealConfig

  protected createHeaderBottomContainer (): void {
    const containerConfig = this.componentConfig.headerBottomContainer
    const pageElement = document.getElementById('page')
    if (!pageElement || pageElement.dataset.hasInit === 'true') {
      return
    }
    const container = document.createElement('div')
    container.id = containerConfig.id!
    container.className = 'flexbox'
    pageElement.insertBefore(container, pageElement.firstChild)

    this.createShowBlacklistGameCheckbox(container)
    this.createDownloadButton(container)
    this.createUploadButton(container)
    pageElement.dataset.hasInit = 'true'
  }

  protected getGameListContainer (): HTMLElement | null {
    const dealsList = document.getElementById('deals-list')
    if (!dealsList) {
      return null
    }
    const listContainer = dealsList.getElementsByClassName('wrap_items')[0]
    if (!listContainer) {
      return null
    }
    const listItemContainer = listContainer.children[0] as HTMLDivElement
    if (!listItemContainer) {
      return null
    }
    return listItemContainer
  }

  protected modifyGameInfoElement (infoElement: HTMLElement): HTMLElement | null {
    const ahrefElement = infoElement.getElementsByClassName('full-link')[0]
    if (!ahrefElement) {
      return null
    }
    infoElement.removeChild(ahrefElement)
    return infoElement
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string {
    return ((infoContainer.getElementsByClassName('game-info-wrapper')[0]
      ?.getElementsByClassName('game-info-title-wrapper')[0] as HTMLElement
    )?.children[0] as HTMLElement).innerText
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement {
    return infoContainer.getElementsByClassName('feature-info')[0] as HTMLElement
  }
}

const componentConfig = Container.get(GgdealDealsDealConfig)
const controller = new GgdealsDealController(componentConfig)
