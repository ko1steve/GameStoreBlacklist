import { Container } from 'typescript-ioc'
import { ComponentController } from '../../core/componentController'
import { YuplayProductConfig } from './config'
import './style.css'

class YuplayProductController extends ComponentController {
  protected componentConfig!: YuplayProductConfig

  public initailzie (): void {
    if (!this.hasInit) {
      this.initBlacklist()
    }
    this.createHeaderBottomContainer()
    this.handlePageContent()
    this.handleSpecifiedListItems('recommended-catalog')
    this.handleSpecifiedListItems('most-wanted-catalog')
    this.handleSpecifiedListItems('midweek-madness-catalog')
    this.handleSpecifiedListItems('just-arrived-catalog')
    this.hasInit = true
    setTimeout(() => this.initailzie(), 500)
  }

  protected createHeaderBottomContainer (): void {
    const header = document.getElementById('navbar-main')
    if (!header || header.dataset?.hasInit === 'true') {
      return
    }
    header.className += ' flexbox'
    header.dataset.hasInit = 'true'

    const containerConfig = this.componentConfig.headerBottomContainer
    const container = document.createElement('div')
    container.id = containerConfig.id!
    container.className = containerConfig.className!
    header.appendChild(container)

    this.createShowBlacklistGameCheckbox(container)
    this.createDownloadButton(container)
    this.createUploadButton(container)
  }

  protected getRawGameTitle (): string {
    const mainItemContainer = document.getElementById('product-main-information')
    if (!mainItemContainer) {
      return ''
    }
    const productNameContainer = mainItemContainer.getElementsByClassName('product-name')[0]
    if (!productNameContainer) {
      return ''
    }
    return productNameContainer.innerHTML
  }

  protected getCheckboxParent (infoContainer?: HTMLElement): HTMLElement | null {
    const mainItemContainer = document.getElementById('product-main-information')
    if (!mainItemContainer) {
      return null
    }
    return mainItemContainer.getElementsByClassName('catalog-image-container')[0] as HTMLElement
  }

  private handleSpecifiedListItems (contanerId: string): void {
    const gameListContainer = this.getSpecifiedGameListContainer(contanerId) as HTMLDivElement
    if (!gameListContainer || !gameListContainer.dataset || gameListContainer.dataset.hasInit === 'true') {
      return
    }
    const catalogItem = gameListContainer.getElementsByClassName('catalog-item')
    if (!catalogItem) {
      return
    }
    const gameListChildren = Array.from(catalogItem) as HTMLElement[]
    if (!this.isGameListFirstChildExist(gameListChildren) || this.isGameListFirstChildInit(gameListChildren)) {
      return
    }
    gameListChildren.forEach(gameInfoElement => {
      this.addCheckBoxToSpecifiedListEachChild(gameInfoElement, gameListContainer)
    })
  }

  private getSpecifiedGameListContainer (contanerId: string): HTMLElement | null {
    const catalog = document.getElementsByClassName('catalog') as HTMLCollection
    if (!catalog) {
      return null
    }
    const catalogArr = Array.from(catalog) as HTMLElement[]
    for (const item of catalogArr) {
      if (item.dataset && item.dataset.catalog_id === contanerId) {
        return item
      }
    }
    return null
  }

  private addCheckBoxToSpecifiedListEachChild (gameInfoElement: HTMLElement, gameListContainer: HTMLElement): void {
    if (gameInfoElement && gameInfoElement.dataset && gameInfoElement.dataset.hasInit === 'true') {
      return
    }
    const imageContainer = gameInfoElement.children[0] as HTMLElement
    const titleContainer = imageContainer.getElementsByClassName('catalog-image-ratio-container')[0] as HTMLElement
    if (!titleContainer) {
      return
    }
    const rawGameTitle = titleContainer.title
    if (rawGameTitle === '') {
      return
    }
    const gameTitle = this.getModifiedGameTitle(rawGameTitle)

    this.addCheckbox(imageContainer, gameTitle, {
      hideGame: {
        infoElement: gameInfoElement,
        parentList: gameListContainer
      }
    })
    const inBlacklist = this.getGameStatus(gameTitle)
    if (inBlacklist && !this.showBlacklistGames) {
      this.hideGame(gameListContainer, gameInfoElement)
    }
    gameInfoElement.dataset.hasInit = 'true'
  }
}

const componentConfig = Container.get(YuplayProductConfig)
const controller = new YuplayProductController(componentConfig)
