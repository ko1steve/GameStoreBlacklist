import { IShowBlacklistGameCheckbox } from 'src/core/componentConfig';
import { IButtonElement, IHTMLElement, ILabelEleemnt } from 'src/data/commonData';

export interface IPopupConfig {
  componentId: string;
  showBlacklistGameContainer: IShowBlacklistGameCheckbox;
  downloadButton: IButtonElement;
  uploadButton: IUploadButton;
  normalizeButton: IButtonElement;
}

export interface IUploadButton extends IHTMLElement {
  label: ILabelEleemnt
  input: IHTMLElement
}

export class PopupConfig implements IPopupConfig {
  public componentId: string = 'popup';

  public showBlacklistGameContainer: IShowBlacklistGameCheckbox = {
    id: 'showBlacklistGameCheckboxContainer',
    className: 'flexbox-left settings',
    checkbox: {
      id: 'showBlacklistGameCheckbox',
      text: {
        id: 'showBlaclistGameCheckboxText',
        innerText: 'Show in-blacklist games ({numberOfGames})'
      }
    }
  };

  public downloadButton: IButtonElement = {
    id: 'downloadButton',
    className: 'settings',
    textContent: 'Download blacklist data'
  };

  public uploadButton: IUploadButton = {
    label: {
      id: 'uploadButtonLabel',
      className: 'settings',
      textContent: 'Upload blacklist data'
    },
    input: {
      id: 'uploadButtonInput'
    }
  };

  public normalizeButton: IButtonElement = {
    id: 'normalizeButton',
    className: 'settings',
    textContent: 'Normalize blacklist data'
  };
}
