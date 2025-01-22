import './popup.css';
import Pako from 'pako';
import { MainConfig } from 'src/mainConfig';
import { DataModel } from 'src/model/dataModel';
import { Container, Inject } from 'typescript-ioc';
import { IPopupConfig, PopupConfig } from './config';
import { CommonUtil } from 'src/util/commonUtil';
import { DataStorage, StorageType } from 'src/util/dataStorage';
import { MessageDispatcher } from 'src/util/messageDispatcher';
import { MessageType } from 'src/data/messageData';

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
    this.dataModel.onInitializeBlacklistCompleteSignal.add(this.initailzie.bind(this));
    this.dataModel.updateNumberOfGameSignal.add(this.updateTextOfNumberOfGame.bind(this));
    this.dataModel.onDebugModeChangeSignal.add(this.onDebugModeChange.bind(this));
  }

  protected onDebugModeChange (): void {
    location.reload();
  }

  protected initailzie (): void {
    const container = document.createElement('div');
    container.id = 'mainContainer';
    container.className = 'flexbox-column';
    document.body.appendChild(container);

    this.createShowBlacklistGameCheckbox(container);

    if (this.dataModel.debug) {
      this.createDownloadButton(container);
      this.createUploadButton(container);
      this.createNormalizeButton(container);
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
      DataStorage.setItem(this.mainConfig.storageNames.showblacklistGames, checkbox.checked).then(() => {
        this.dataModel.showBlacklistGame = checkbox.checked;
        chrome.tabs.query({ active: true, currentWindow: true }).then((currentTab) => {
          if (!currentTab || !currentTab[0].url) {
            return;
          }
          const manifest = chrome.runtime.getManifest();
          const matchTab = manifest.content_scripts?.some(scriptConfig => scriptConfig.matches?.find(e => CommonUtil.matchWildcardPattern(e, currentTab[0].url!)));
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
      this.downloadBlacklistData();
    };
    parent.appendChild(button);
  }

  protected async downloadBlacklistData (): Promise<void> {
    const compressedData: StorageType | undefined = await DataStorage.getItem(this.mainConfig.storageNames.blacklist);
    if (compressedData) {
      const blob = new Blob([Uint8Array.from(compressedData as number[])], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'blacklist.txt';
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
      this.uploadBlacklistData();
    };
    parent.appendChild(input);
  }

  protected uploadBlacklistData (): void {
    const fileInput: HTMLInputElement = document.getElementById(this.componentConfig.uploadButton.input.id!) as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target) {
          const jsonContent = event.target.result as string;
          await DataStorage.setItem(this.mainConfig.storageNames.blacklist, Array.from(Pako.deflate(jsonContent)));
          chrome.tabs.reload();
        }
      };
      reader.readAsText(file);
    }
  }

  protected createNormalizeButton (parent: HTMLElement): void {
    const button = document.createElement('button');
    button.id = this.componentConfig.normalizeButton.id!;
    button.className = this.componentConfig.normalizeButton.className!;
    button.textContent = this.componentConfig.normalizeButton.textContent!;
    button.onclick = () => {
      this.dataModel.normalizationBlacklistData();
    };
    parent.appendChild(button);
  }

  protected updateTextOfNumberOfGame (): void {
    const text = document.getElementById(this.componentConfig.showBlacklistGameContainer.checkbox.text!.id!) as HTMLTextAreaElement;
    if (!text) {
      return;
    }
    const textContent = this.componentConfig.showBlacklistGameContainer.checkbox.text!.innerText.replace('{numberOfGames}', this.dataModel.numberOfGame.toString());
    text.innerText = textContent;
  }

  protected showLog (param: any, ...optionalParams: any[]): void {
    if (optionalParams && optionalParams.length > 0) {
      MessageDispatcher.sendMessage({ name: MessageType.SHOW_LOG, data: { param, optionalParams } });
    } else {
      MessageDispatcher.sendMessage({ name: MessageType.SHOW_LOG, data: { param } });
    }
  }
}

const componentConfig = Container.get(PopupConfig);
const popupController = new PopupController(componentConfig);
