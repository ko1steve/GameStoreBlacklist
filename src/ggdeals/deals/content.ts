import { Container } from 'typescript-ioc'
import { GgdealDealsDealConfig } from './config'
import { ComponentController } from '../../core/componentController'
import './style.css'

class GgdealsDealController extends ComponentController {
  protected componentConfig!: GgdealDealsDealConfig

  protected createHeaderBottomContainer (): void {
    const containerConfig = this.componentConfig.headerBottomContainer
    const pageElement = document.getElementById('page')
    if (!pageElement || pageElement.dataset.hasInit === 'true') {
      return
    }
    pageElement.dataset.hasInit = 'true'
    const container = document.createElement('div')
    container.id = containerConfig.id!
    container.className = 'flexbox'
    pageElement.insertBefore(container, pageElement.firstChild)

    this.createShowBlacklistGameCheckbox(container)
    this.createDownloadButton(container)
    this.createUploadButton(container)
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

  protected addCheckBoxToGameListEachChild (gameInfoElement: HTMLElement, gameListContainer: HTMLElement): void {
    if (gameInfoElement && gameInfoElement.dataset && gameInfoElement.dataset.hasInit === 'true') {
      return
    }
    const ahrefElement = gameInfoElement.getElementsByClassName('full-link')[0]
    if (ahrefElement) {
      gameInfoElement.removeChild(ahrefElement)
    }
    const rawGameTitle = this.getRawGameTitle(gameInfoElement)
    const gameTitle = this.getModifiedGameTitle(rawGameTitle)

    const checkboxParent = this.getCheckboxParent(gameInfoElement) as HTMLDivElement
    if (!checkboxParent) {
      return
    }
    this.addCheckbox(checkboxParent, gameTitle, {
      hideGame: {
        infoElement: gameInfoElement,
        parentList: gameListContainer
      }
    })
    if (this.componentConfig.isGameListPage) {
      const inBlacklist = this.getGameStatus(gameTitle)
      if (inBlacklist && !this.showBlacklistGames) {
        this.hideGame(gameListContainer, gameInfoElement)
      }
    }
    gameInfoElement.dataset.hasInit = 'true'
  }

  protected getRawGameTitle (infoContainer: HTMLElement): string {
    const gameInfoElement = infoContainer.getElementsByClassName('game-info-wrapper')[0]
    const wrapperElement = gameInfoElement.getElementsByClassName('game-info-title-wrapper')[0] as HTMLElement
    return (wrapperElement.children[0] as HTMLElement).innerText
  }

  protected getCheckboxParent (infoContainer: HTMLElement): HTMLElement {
    return infoContainer.getElementsByClassName('feature-info')[0] as HTMLElement
  }
}

const componentConfig = Container.get(GgdealDealsDealConfig)
const controller = new GgdealsDealController(componentConfig)
