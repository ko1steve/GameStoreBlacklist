import { Container } from 'typescript-ioc';
import { TSMap } from 'typescript-map';
import { MainConfig } from '../mainConfig';
import { ComponentConfig } from './componentConfig';
import { IGameInfoOption } from 'src/data/commonData';
import { CommonTool } from 'src/util/commonTool';

export class ComponentController {
  protected componentId: string;
  protected mainConfig: MainConfig;
  protected componentConfig: ComponentConfig;
  protected blacklistMap: TSMap<string, string[]>;
  protected showBlacklistGames = true;
  protected hasInit = false;
  protected numberOfGames = 0;

  constructor (componentConfig: ComponentConfig) {
    this.componentId = componentConfig.componentId;
    this.mainConfig = Container.get(MainConfig);
    this.componentConfig = componentConfig;
    this.blacklistMap = new TSMap<string, string[]>();
    this.initailzie();
  }

  public initailzie (): void {
    if (!this.hasInit) {
      this.initBlacklist();
    }
    this.createHeaderBottomContainer();
    if (!this.componentConfig.isGameListPage) {
      this.handlePageContent();
    } else {
      this.handleListPageContent();
    }
    this.hasInit = true;
    setTimeout(() => this.initailzie(), 500);
  }

  protected initBlacklist (): void {
    this.hasInit = true;
    const jsonContent = localStorage.getItem(this.mainConfig.localStorage.blacklist.name);
    if (!jsonContent) {
      this.blacklistMap = new TSMap<string, string[]>();
    } else {
      this.blacklistMap = new TSMap<string, string[]>(Object.entries(JSON.parse(jsonContent)));
    }
    this.initNumberOfGame();
    const showBlacklistGamesInStorage = localStorage.getItem(this.mainConfig.localStorage.showblacklistGames.name);
    if (showBlacklistGamesInStorage == null) {
      this.showBlacklistGames = true;
      localStorage.setItem(this.mainConfig.localStorage.showblacklistGames.name, 'true');
    } else {
      this.showBlacklistGames = showBlacklistGamesInStorage === 'true';
    }
  }

  protected initNumberOfGame (): void {
    this.numberOfGames = 0;
    this.blacklistMap.forEach(list => {
      this.numberOfGames += list.length;
    });
  }

  protected createHeaderBottomContainer (): void {
    const header = this.getPageHeader();
    if (!header || header.dataset?.hasInit === 'true') {
      return;
    }
    const config = this.componentConfig.headerBottomContainer;
    const container = document.createElement('div');
    container.id = config.id!;
    container.className = config.className!;
    header.appendChild(container);

    this.createShowBlacklistGameCheckbox(container);
    this.createDownloadButton(container);
    this.createUploadButton(container);
    this.createValidateButton(container);

    header.dataset.hasInit = 'true';
  }

  protected getPageHeader (): HTMLElement | null {
    const header = document.getElementById('header-id');
    if (!header) {
      return null;
    }
    // modify header (ex. add class, modify style)
    return header;
  }

  protected createShowBlacklistGameCheckbox (parent: HTMLElement): void {
    const containerConfig = this.componentConfig.headerBottomContainer.showBlacklistGameContainer;
    const container = document.createElement('div');
    container.id = containerConfig.id!;
    container.className = containerConfig.className!;
    parent.appendChild(container);

    const chexkboxConfig = containerConfig.checkbox;
    const checkboxImg = document.createElement('img');
    checkboxImg.id = chexkboxConfig.id!;
    if (this.showBlacklistGames) {
      this.setShowBlacklistGameCheckboxEnabled(checkboxImg);
    } else {
      this.setShowBlacklistGameCheckboxDisabled(checkboxImg);
    }
    checkboxImg.onclick = () => {
      if (checkboxImg.dataset.action === chexkboxConfig.disabledAction!) {
        this.setShowBlacklistGameCheckboxEnabled(checkboxImg);
        localStorage.setItem(this.mainConfig.localStorage.showblacklistGames.name, 'true');
      } else {
        this.setShowBlacklistGameCheckboxDisabled(checkboxImg);
        localStorage.setItem(this.mainConfig.localStorage.showblacklistGames.name, 'false');
      }
      location.reload();
    };
    container.appendChild(checkboxImg);

    const text = document.createElement('text');
    text.id = chexkboxConfig.text!.id!;
    text.innerText = chexkboxConfig.text!.innerText.replace('{numberOfGames}', this.numberOfGames.toString());
    container.appendChild(text);
  }

  protected createDownloadButton (parent: HTMLElement): void {
    const button = document.createElement('button');
    button.id = this.componentConfig.downloadButton.id!;
    button.className = this.componentConfig.downloadButton.className!;
    button.textContent = this.componentConfig.downloadButton.textContent!;
    button.onclick = () => {
      this.downloadLocalStorageDataAsJson();
    };
    parent.appendChild(button);
  }

  protected downloadLocalStorageDataAsJson (): void {
    const blacklistContent = localStorage.getItem(this.mainConfig.localStorage.blacklist.name);
    if (blacklistContent) {
      const blob = new Blob([blacklistContent], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'blacklist.json';
      a.click();
    }
  }

  protected createUploadButton (parent: HTMLElement): void {
    const label = document.createElement('label');
    label.htmlFor = this.componentConfig.uploadButton.input.id!;
    label.id = this.componentConfig.uploadButton.label.id!;
    label.className = this.componentConfig.uploadButton.label.className!;
    label.textContent = this.componentConfig.uploadButton.label.textContent;
    parent.appendChild(label);

    const input = document.createElement('input');
    input.type = 'file';
    input.id = this.componentConfig.uploadButton.input.id!;
    input.accept = '.json';
    input.onchange = () => {
      if (confirm('Are you sure to upload the JSON ?')) {
        this.uploadLocalStorageDataFromJson();
      } else {
        input.files = null;
        input.value = '';
      }
    };
    parent.appendChild(input);
  }

  protected uploadLocalStorageDataFromJson (): void {
    const fileInput: HTMLInputElement = document.getElementById(this.componentConfig.uploadButton.input.id!) as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const jsonContent = event.target.result as string;
          localStorage.setItem(this.mainConfig.localStorage.blacklist.name, jsonContent);
          alert('Finished.');
          location.reload();
        }
      };
      reader.readAsText(file);
    } else {
      alert('Please select a JSON file to upload.');
    }
  }

  protected createValidateButton (parent: HTMLElement): void {
    const button = document.createElement('button');
    button.id = this.componentConfig.validateButton.id!;
    button.className = this.componentConfig.validateButton.className!;
    button.textContent = this.componentConfig.validateButton.textContent!;
    button.onclick = () => {
      this.validateData();
    };
    parent.appendChild(button);
  }

  protected validateData (): void {
    const jsonContent = localStorage.getItem(this.mainConfig.localStorage.blacklist.name);
    if (jsonContent) {
      const entries = Object.entries(JSON.parse(jsonContent)) as (string | string[])[][];
      for (let i = 0; i < entries.length; i++) {
        const capital = entries[i][0] as string;
        const gameList = entries[i][1] as string[];
        for (const j in gameList) {
          gameList[j] = gameList[j].toLowerCase();
        }
        const lowerCapital = capital.toLowerCase();
        if (capital !== lowerCapital) {
          const lowerCaseEntry = entries.find(entry => entry[0] === lowerCapital);
          if (lowerCaseEntry) {
            (lowerCaseEntry[1] as string[]).push(...gameList);
          } else {
            entries.push([lowerCapital, [...gameList]]);
          }
          entries.splice(+i, 1);
          i--;
        }
      }
      const newJsonContent = JSON.stringify(Object.fromEntries(entries));
      localStorage.setItem(this.mainConfig.localStorage.blacklist.name, newJsonContent);
      alert('Validation is completed.');
      window.location.reload();
    }
  }

  protected handlePageContent (): void {
    const rawGameTitle = this.getRawGameTitle();
    if (!rawGameTitle) {
      return;
    }
    const gameTitle = this.getModifiedGameTitle(rawGameTitle);

    const checkboxParent = this.getCheckboxParent();
    if (!checkboxParent) {
      return;
    }
    this.addCheckbox(checkboxParent, gameTitle);
  }

  protected handleListPageContent (): void {
    const gameListContainer = this.getGameListContainer() as HTMLDivElement;
    if (!gameListContainer || !gameListContainer.dataset || gameListContainer.dataset.hasInit === 'true') {
      return;
    }
    const gameListChildren = Array.from(gameListContainer.children) as HTMLElement[];
    if (!this.isGameListFirstChildExist(gameListChildren) || this.isGameListFirstChildInit(gameListChildren)) {
      return;
    }
    gameListChildren.forEach(gameInfoElement => {
      this.addCheckBoxToGameListEachChild(gameInfoElement, gameListContainer);
    });
    gameListContainer.dataset.hasInit = 'true';
  }

  protected isGameListFirstChildExist (children: HTMLElement[]): boolean {
    return children != null && children[0] != null;
  }

  protected isGameListFirstChildInit (children: HTMLElement[]): boolean {
    return children[0].dataset && children[0].dataset.hasInit === 'true';
  }

  protected addCheckBoxToGameListEachChild (gameInfoElement: HTMLElement, gameListContainer: HTMLElement): void {
    if (gameInfoElement.dataset && gameInfoElement.dataset.hasInit === 'true') {
      return;
    }
    const modifiedInfoElement = this.modifyGameInfoElement(gameInfoElement, gameListContainer);
    if (!modifiedInfoElement) {
      return;
    }
    gameInfoElement = modifiedInfoElement;
    const rawGameTitle = this.getRawGameTitle(gameInfoElement);
    if (!rawGameTitle) {
      return;
    }
    const gameTitle = this.getModifiedGameTitle(rawGameTitle);

    const checkboxParent = this.getCheckboxParent(gameInfoElement);
    if (!checkboxParent) {
      return;
    }
    this.addCheckbox(checkboxParent, gameTitle, {
      hideGame: {
        infoElement: gameInfoElement,
        parentList: gameListContainer
      }
    });

    if (this.componentConfig.isGameListPage) {
      const inBlacklist = this.getGameStatus(gameTitle);
      if (inBlacklist && !this.showBlacklistGames) {
        this.hideGame(gameListContainer, gameInfoElement);
      }
    }
    gameInfoElement.dataset.hasInit = 'true';
  }

  protected modifyGameInfoElement (infoElement: HTMLElement, parent: HTMLElement): HTMLElement | null {
    // ex. add class, remove children
    return infoElement;
  }

  protected getGameListContainer (): HTMLElement | null {
    const container = document.getElementById('gameList');
    return container;
  }

  protected getRawGameTitle (infoContainer?: HTMLElement): string | undefined {
    return document.getElementById('title')?.innerText;
  }

  protected getModifiedGameTitle (gameTitle: string): string {
    const config = this.componentConfig.texthandle;
    config.startWords.forEach(e => {
      if (gameTitle.startsWith(e)) {
        const cutIndex = gameTitle.indexOf(e);
        gameTitle = gameTitle.substring(cutIndex + e.length);
      }
    });
    config.cutToEndWords.forEach(e => {
      const cutIndex = gameTitle.indexOf(e);
      if (cutIndex >= 0) {
        gameTitle = gameTitle.substring(0, cutIndex);
      }
    });
    config.excludeTitleWords.forEach(e => { gameTitle = gameTitle.replace(e, ''); });
    config.endWords.forEach(e => {
      if (gameTitle.endsWith(e)) {
        const cutIndex = gameTitle.lastIndexOf(e);
        gameTitle = gameTitle.substring(0, cutIndex);
      }
    });
    gameTitle = gameTitle.trim();
    return gameTitle;
  }

  protected getCheckboxParent (infoContainer?: HTMLElement): HTMLElement | null {
    const checkboxParent = document.getElementById('product-info');
    return checkboxParent;
  }

  protected addCheckbox (checkboxParent: HTMLElement, gameTitle: string, option?: IGameInfoOption): void {
    let checkboxImg = checkboxParent.getElementsByClassName(this.componentConfig.checkboxContainer.checkbox.className!)[0] as HTMLImageElement;
    if (!checkboxImg) {
      checkboxImg = this.createCheckbox(checkboxParent);
      checkboxImg.onclick = () => {
        if (checkboxImg.dataset.action === this.componentConfig.checkboxContainer.checkbox.disabledAction) {
          this.initBlacklist();
          this.addGameToBlacklist(gameTitle);
          this.initNumberOfGame();
          this.updateTextOfNumberOfGame();
          this.setCheckboxEnabled(checkboxImg);
          if (!this.showBlacklistGames && option?.hideGame) {
            this.hideGame(option.hideGame.parentList, option.hideGame.infoElement);
          }
        } else {
          this.initBlacklist();
          this.removeGameFromBlacklist(gameTitle);
          this.initNumberOfGame();
          this.updateTextOfNumberOfGame();
          this.setCheckboxDisabled(checkboxImg);
        }
      };
      checkboxParent.dataset.hasInit = 'true';
      const inBlacklist = this.getGameStatus(gameTitle);
      if (inBlacklist) {
        console.log('[extension] In Blacklist : ' + gameTitle);
        this.setCheckboxEnabled(checkboxImg);
      }
    }
  }

  protected createCheckbox (parent: HTMLElement): HTMLImageElement {
    const conainer = document.createElement('div');
    conainer.className = this.componentConfig.checkboxContainer.className!;
    const checkboxImg = document.createElement('img');
    checkboxImg.className = this.componentConfig.checkboxContainer.checkbox.className!;
    this.setCheckboxDisabled(checkboxImg);
    conainer.appendChild(checkboxImg);
    parent.style.position = 'relative';
    parent.appendChild(conainer);
    return checkboxImg;
  }

  protected setCheckboxEnabled (checkboxImg: HTMLImageElement): void {
    const config = this.componentConfig.checkboxContainer.checkbox;
    checkboxImg.dataset.action = config.action;
    checkboxImg.src = chrome.runtime.getURL(config.sourceName!);
  }

  protected setCheckboxDisabled (checkboxImg: HTMLImageElement): void {
    const config = this.componentConfig.checkboxContainer.checkbox;
    checkboxImg.dataset.action = config.disabledAction;
    checkboxImg.src = chrome.runtime.getURL(config.disabledSourceName!);
  }

  protected setShowBlacklistGameCheckboxEnabled (checkboxImg: HTMLImageElement): void {
    const config = this.componentConfig.headerBottomContainer.showBlacklistGameContainer.checkbox;
    checkboxImg.dataset.action = config.action!;
    checkboxImg.src = chrome.runtime.getURL(config.sourceName!);
  }

  protected setShowBlacklistGameCheckboxDisabled (checkboxImg: HTMLImageElement): void {
    const config = this.componentConfig.headerBottomContainer.showBlacklistGameContainer.checkbox;
    checkboxImg.dataset.action = config.disabledAction!;
    checkboxImg.src = chrome.runtime.getURL(config.disabledSourceName!);
  }

  protected updateTextOfNumberOfGame (): void {
    const text = document.getElementById(this.componentConfig.headerBottomContainer.showBlacklistGameContainer.checkbox.text!.id!) as HTMLTextAreaElement;
    const textContent = this.componentConfig.headerBottomContainer.showBlacklistGameContainer.checkbox.text!.innerText.replace('{numberOfGames}', this.numberOfGames.toString());
    text.innerText = textContent;
  }

  protected hideGame (gameListContainer: HTMLElement, gameContainer: HTMLElement): void {
    gameListContainer.removeChild(gameContainer);
  }

  protected getGameStatus (gameTitle: string): boolean {
    gameTitle = gameTitle.toLowerCase();
    const key = gameTitle[0];
    if (!this.blacklistMap.has(key)) {
      return false;
    }
    return this.blacklistMap.get(key)!.includes(gameTitle);
  }

  protected addGameToBlacklist (gameTitle: string): void {
    const key = gameTitle[0];
    if (!this.blacklistMap.has(key)) {
      this.blacklistMap.set(key, [gameTitle]);
    } else {
      const list = this.blacklistMap.get(key)!;
      list.push(gameTitle);
      this.blacklistMap.set(key, list);
    }
    localStorage.setItem(this.mainConfig.localStorage.blacklist.name, JSON.stringify(Object.fromEntries(this.blacklistMap.entries())));
    CommonTool.showLog('Add "' + gameTitle + '" to blacklist. ');
  }

  protected removeGameFromBlacklist (gameTitle: string): void {
    const key = gameTitle[0];
    if (!this.blacklistMap.has(key)) {
      return;
    }
    const list = this.blacklistMap.get(key)!;
    const index = list.findIndex(e => e === gameTitle);
    if (index < 0) {
      return;
    }
    list.splice(index, 1);
    this.blacklistMap.set(key, list);
    localStorage.setItem(this.mainConfig.localStorage.blacklist.name, JSON.stringify(Object.fromEntries(this.blacklistMap.entries())));
    CommonTool.showLog('Removed "' + gameTitle + '" from blacklist. ');
  }

  protected trimGameName (): void {
    const jsonContent = localStorage.getItem(this.mainConfig.localStorage.blacklist.name);
    if (!jsonContent) {
      return;
    } else {
      const blacklistMap = new Map<string, string[]>(Object.entries(JSON.parse(jsonContent)));
      blacklistMap.forEach((gameArr, k) => {
        gameArr.forEach((gameTitle, i) => {
          gameArr[i] = gameTitle.trim();
        });
        blacklistMap.set(k, gameArr);
      });
    }
    localStorage.setItem(this.mainConfig.localStorage.blacklist.name, JSON.stringify(Object.fromEntries(this.blacklistMap.entries())));
  }
}
