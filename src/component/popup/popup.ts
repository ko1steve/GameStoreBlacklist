import { MainConfig } from 'src/mainConfig';
import { DataModel } from 'src/model/dataModel';
import { Container, Inject } from 'typescript-ioc';
import { IPopupConfig, PopupConfig } from './config';
import './popup.css';
import { CommonTool } from 'src/util/commonTool';

declare global {
  interface Window {
    PopupController: PopupController;
  }
}

export class PopupController {
  @Inject
  protected dataModel: DataModel;

  protected mainConfig: MainConfig;

  protected componentConfig: IPopupConfig;

  constructor (componentConfig: IPopupConfig) {
    this.dataModel = Container.get(DataModel);
    this.mainConfig = Container.get(MainConfig);
    this.componentConfig = componentConfig;
    this.addEventListeners();
  }

  protected addEventListeners (): void {
    this.dataModel.updateShowBlacklistGameSignal.add(this.initailzie.bind(this));
    this.dataModel.updateNumberOfGameSignal.add(this.updateTextOfNumberOfGame.bind(this));
  }

  protected async initailzie (): Promise<void> {
    const storageData = await chrome.storage.local.get([this.mainConfig.storageNames.debug]);
    const debug = storageData[this.mainConfig.storageNames.debug];
    if (debug == null) {
      await chrome.storage.local.set({ [this.mainConfig.storageNames.debug]: false });
      this.dataModel.debug = false;
    } else {
      this.dataModel.debug = storageData[this.mainConfig.storageNames.debug];
    }
    this.initElement();
  }

  public async setDebug (value: boolean) {
    const storageData = await chrome.storage.local.get([this.mainConfig.storageNames.debug]);
    const isDebug: boolean = storageData[this.mainConfig.storageNames.debug];
    if (isDebug == null || isDebug !== value) {
      await chrome.storage.local.set({ [this.mainConfig.storageNames.debug]: value });
      chrome.tabs.reload();
    }
  }

  protected initElement (): void {
    const container = document.createElement('div');
    container.id = 'mainContainer';
    document.body.appendChild(container);

    this.createShowBlacklistGameCheckbox(container);
    this.createDownloadButton(container);
    this.createUploadButton(container);

    if (this.dataModel.debug) {
      this.createValidateButton(container);
    }
  }

  protected createShowBlacklistGameCheckbox (parent: HTMLElement): void {
    const containerConfig = this.componentConfig.showBlacklistGameContainer;
    const container = document.createElement('div');
    container.id = containerConfig.id!;
    container.className = containerConfig.className!;
    parent.appendChild(container);

    const chexkboxConfig = containerConfig.checkbox;
    const checkbox = document.createElement('input');
    checkbox.id = chexkboxConfig.id!;
    checkbox.type = 'checkbox';
    checkbox.checked = this.dataModel.showBlacklistGame;
    checkbox.onchange = () => {
      chrome.storage.local.set({ [this.mainConfig.storageNames.showblacklistGames]: checkbox.checked }).then(() => {
        this.dataModel.showBlacklistGame = checkbox.checked;
        chrome.tabs.query({ active: true, currentWindow: true }).then((currentTab) => {
          if (!currentTab || !currentTab[0].url) {
            return;
          }
          const manifest = chrome.runtime.getManifest();
          const matchTab = manifest.content_scripts?.some(scriptConfig => scriptConfig.matches?.find(e => CommonTool.compareStr(e, currentTab[0].url!)));
          if (matchTab) {
            chrome.tabs.reload();
          }
        });
      });
    };
    container.appendChild(checkbox);

    const text = document.createElement('text');
    text.id = chexkboxConfig.text!.id!;
    text.innerText = chexkboxConfig.text!.innerText.replace('{numberOfGames}', this.dataModel.numberOfGame.toString());
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

  protected async downloadLocalStorageDataAsJson (): Promise<void> {
    const storageData = await chrome.storage.local.get([this.mainConfig.storageNames.blacklist]);
    const blacklistContent = storageData[this.mainConfig.storageNames.blacklist];
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
      this.uploadLocalStorageDataFromJson();
    };
    parent.appendChild(input);
  }

  protected uploadLocalStorageDataFromJson (): void {
    const fileInput: HTMLInputElement = document.getElementById(this.componentConfig.uploadButton.input.id!) as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target) {
          const jsonContent = event.target.result as string;
          await chrome.storage.local.set({ [this.mainConfig.storageNames.blacklist]: jsonContent });
          chrome.tabs.reload();
        }
      };
      reader.readAsText(file);
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

  protected async validateData (): Promise<void> {
    const storageData = await chrome.storage.local.get([this.mainConfig.storageNames.blacklist]);
    const jsonContent = storageData[this.mainConfig.storageNames.blacklist];
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
      await chrome.storage.local.set({ [this.mainConfig.storageNames.blacklist]: newJsonContent });
      chrome.tabs.reload();
    }
  }

  protected updateTextOfNumberOfGame (): void {
    const text = document.getElementById(this.componentConfig.showBlacklistGameContainer.checkbox.text!.id!) as HTMLTextAreaElement;
    if (!text) {
      return;
    }
    const textContent = this.componentConfig.showBlacklistGameContainer.checkbox.text!.innerText.replace('{numberOfGames}', this.dataModel.numberOfGame.toString());
    text.innerText = textContent;
  }
}

const componentConfig = Container.get(PopupConfig);
const popupController = new PopupController(componentConfig);
