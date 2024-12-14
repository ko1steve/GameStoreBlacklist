import { Container } from 'typescript-ioc'
import { ComponentController } from '../../../core/componentController'
import { GgdealsProductConfig } from './config'
import './style.css'

class GgdealsProductController extends ComponentController {
  protected componentConfig!: GgdealsProductConfig

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

  protected getPageHeader (): HTMLElement | null {
    return null
  }

  protected getCheckboxParent (): HTMLElement | null {
    const gameCardElement = document.getElementById('game-card')
    if (!gameCardElement) {
      return null
    }
    const gameHeaderElement = gameCardElement.getElementsByClassName('game-header')[0]
    if (!gameHeaderElement) {
      return null
    }
    const gameSectionElement = gameHeaderElement.getElementsByClassName('game-section')[0]
    if (!gameSectionElement) {
      return null
    }
    const colLeftElement = gameSectionElement.getElementsByClassName('col-left')[0]
    if (!colLeftElement) {
      return null
    }
    const gameHeaderBox = colLeftElement.getElementsByClassName('game-header-box')[0]
    if (!gameHeaderBox) {
      return null
    }
    const wrapperElement = gameHeaderBox.getElementsByClassName('game-info-image-wrapper')[0] as HTMLElement
    wrapperElement.style.position = 'relative'
    return wrapperElement
  }

  protected getRawGameTitle (infoContainer?: HTMLElement): string | undefined {
    const catagoryListElement = document.getElementById('page')
      ?.getElementsByClassName('relative breadcrumbs-widget pjax-inner-replace')[0]?.children[0]?.children[0]
    const length = catagoryListElement?.children.length!
    return (catagoryListElement?.children[length - 1]?.children[0]?.children[0] as HTMLElement)?.innerText
  }
}

const componentConfig = Container.get(GgdealsProductConfig)
const controller = new GgdealsProductController(componentConfig)
