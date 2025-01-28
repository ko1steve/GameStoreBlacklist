import './popup.css';
import Pako from 'pako';
import { MainConfig } from 'src/mainConfig';
import { Container, Inject } from 'typescript-ioc';
import { IPopupConfig, PopupConfig } from './config';
import { DataStorage, StorageType } from 'src/util/dataStorage';
import { PopupDataModel } from './model/popupDataModel';
import { IPopupInitData } from './data/popupCommonData';
import { MessageDispatcher } from 'src/util/messageDispatcher';
import { MessageType } from 'src/data/messageData';

export class PopupController {
  @Inject
  protected popupDataModel: PopupDataModel;

  protected mainConfig: MainConfig;

  protected componentConfig: IPopupConfig;

  /**
   * Creates an instance of PopupController. Invoked when popup is opened.
   * @param {IPopupConfig} componentConfig
   * @memberof PopupController
   */
  constructor (componentConfig: IPopupConfig) {
    this.popupDataModel = Container.get(PopupDataModel);
    this.mainConfig = Container.get(MainConfig);
    this.componentConfig = componentConfig;
    this.addSignalListener();
  }

  protected addSignalListener (): void {
    this.popupDataModel.onInitializeBlacklistCompleteSignal.add(this.initailzie.bind(this));
  }

  protected initailzie (initData: IPopupInitData): void {
    const container = document.createElement('div');
    container.id = 'mainContainer';
    container.className = 'flexbox-column';
    document.body.appendChild(container);

    this.createShowBlacklistGameCheckbox(container, initData);

    if (initData.debug) {
      this.createDownloadButton(container);
      this.createUploadButton(container);
      this.createFixDataButton(container);
    }
  }

  protected createShowBlacklistGameCheckbox (parent: HTMLElement, initData: IPopupInitData): void {
    const containerConfig = this.componentConfig.showBlacklistGameContainer;
    const container = document.createElement('div');
    container.id = containerConfig.id!;
    container.className = containerConfig.className!;
    parent.appendChild(container);

    const chexkboxConfig = containerConfig.checkbox;
    const checkbox = document.createElement('input');
    checkbox.id = chexkboxConfig.id!;
    checkbox.type = 'checkbox';
    checkbox.checked = initData.showBlacklistGame;
    checkbox.onchange = (): void => {
      MessageDispatcher.sendTabMessage({ name: MessageType.SHOW_BLACKLIST_GAME, data: { show: checkbox.checked } });
    };
    container.appendChild(checkbox);

    const text = document.createElement('text');
    text.id = chexkboxConfig.text!.id!;
    text.innerText = chexkboxConfig.text!.innerText.replace('{numberOfGames}', initData.numberOfGame.toString());
    container.appendChild(text);
  }

  protected createDownloadButton (parent: HTMLElement): void {
    const button = document.createElement('button');
    button.id = this.componentConfig.downloadButton.id!;
    button.className = this.componentConfig.downloadButton.className!;
    button.textContent = this.componentConfig.downloadButton.textContent!;
    button.onclick = (): void => {
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
    input.onchange = (): void => {
      this.uploadBlacklistData();
    };
    parent.appendChild(input);
  }

  protected uploadBlacklistData (): void {
    const fileInput: HTMLInputElement = document.getElementById(this.componentConfig.uploadButton.input.id!) as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = async (event): Promise<void> => {
        if (event.target) {
          const jsonContent = event.target.result as string;
          await DataStorage.setItem(this.mainConfig.storageNames.blacklist, Array.from(Pako.deflate(jsonContent)));
          chrome.tabs.reload();
        }
      };
      reader.readAsText(file);
    }
  }

  protected createFixDataButton (parent: HTMLElement): void {
    const button = document.createElement('button');
    button.id = this.componentConfig.fixDataButton.id!;
    button.className = this.componentConfig.fixDataButton.className!;
    button.textContent = this.componentConfig.fixDataButton.textContent!;
    button.onclick = (): void => {
      this.popupDataModel.fixDataCaseSensitive();
    };
    parent.appendChild(button);
  }

  protected matchWildcardPattern (pattern: string, str: string): boolean {
    const source = '^' + pattern.replaceAll('.', '\\.').replaceAll('?', '\\?').replaceAll('*', '.*') + '$';
    const regExp = new RegExp(source);
    return regExp.test(str);
  }
}

const componentConfig = Container.get(PopupConfig);
const popupController = new PopupController(componentConfig);
