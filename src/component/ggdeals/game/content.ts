import { Container } from 'typescript-ioc'
import { ComponentController } from '../../../core/componentController'
import { GgdealsGameConfig } from './config'
import './style.css'

class GgdealsGameController extends ComponentController {
  protected componentConfig!: GgdealsGameConfig

  protected createHeaderBottomContainer (): void {
    const containerConfig = this.componentConfig.headerBottomContainer
    const pageElement = document.getElementById('page')
    if (!pageElement || document.getElementById(containerConfig.id!)) {
      return
    }
    const container = document.createElement('div')
    container.id = containerConfig.id!
    container.className = 'flexbox'
    pageElement.insertBefore(container, pageElement.firstChild)

    this.createShowBlacklistGameCheckbox(container)
    this.createDownloadButton(container)
    this.createUploadButton(container)
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

  protected getRawGameTitle (infoContainer?: HTMLElement): string {
    const pageElement = document.getElementById('page')
    if (!pageElement) {
      return ''
    }
    const topAreaContainer = pageElement.getElementsByClassName('relative breadcrumbs-widget pjax-inner-replace')[0]
    if (!topAreaContainer) {
      return ''
    }
    const catagoryContainer = topAreaContainer.children[0]
    if (!catagoryContainer) {
      return ''
    }
    const catagoryListElement = catagoryContainer.children[0]
    if (!catagoryListElement) {
      return ''
    }
    const length = catagoryListElement.children.length

    const gameNameItem = catagoryListElement.children[length - 1]
    if (!gameNameItem) {
      return ''
    }
    const ahrefElement = gameNameItem.children[0]
    if (!ahrefElement) {
      return ''
    }
    const spanElemenmt = gameNameItem.children[0]
    if (!spanElemenmt) {
      return ''
    }
    return (spanElemenmt as HTMLElement).innerText
  }
}

const componentConfig = Container.get(GgdealsGameConfig)
const controller = new GgdealsGameController(componentConfig)
