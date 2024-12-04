import { Container } from 'typescript-ioc'
import { ComponentController } from '../../core/componentController'
import { YuplayProductsConfig } from './config'
import './style.css'

class YuplayProductsController extends ComponentController {
  protected componentConfig!: YuplayProductsConfig

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

  protected handleListPageContent (): void {
    const gameListContainer = document.getElementsByClassName('catalog')[0] as HTMLElement
    if (!gameListContainer || !gameListContainer.dataset || gameListContainer.dataset.hasInit === 'true') {
      return
    }
    const gameListChildren = Array.from(gameListContainer.children) as HTMLElement[]
    if (!this.isGameListFirstChildExist(gameListChildren) || this.isGameListFirstChildInit(gameListChildren)) {
      return
    }
    gameListChildren.forEach(gameInfoElement => {
      this.addCheckBoxToGameListEachChild(gameInfoElement, gameListContainer)
    })
  }

  protected getRawGameTitle (infoContainer?: HTMLElement): string {
    if (!infoContainer) {
      return ''
    }
    const imageContainer = infoContainer.children[0] as HTMLElement
    if (!imageContainer) {
      return ''
    }
    const titleCOntainer = imageContainer.getElementsByClassName('catalog-image-ratio-container')[0] as HTMLElement
    if (!titleCOntainer) {
      return ''
    }
    return titleCOntainer.title
  }

  protected getCheckboxParent (infoContainer?: HTMLElement): HTMLElement | null {
    if (!infoContainer) {
      return null
    }
    return infoContainer.children[0] as HTMLElement
  }
}

const componentConfig = Container.get(YuplayProductsConfig)
const controller = new YuplayProductsController(componentConfig)
