import { IShowBlacklistGameCheckbox } from 'src/core/componentConfig';
import { IButtonElement, IHTMLElement, ILabelEleemnt } from 'src/data/commonData';

export interface IPopupConfig {
  componentId: string;
  showBlacklistGameContainer: IShowBlacklistGameCheckbox;
  downloadButton: IButtonElement;
  uploadButton: IUploadButton;
  validateButton: IButtonElement;
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
    id: 'downloadLocalStorageAsJsonButton',
    className: 'settings',
    textContent: 'Download local stoage data as JSON'
  };

  public uploadButton: IUploadButton = {
    label: {
      id: 'uploadLocalStorageFromJsonLabel',
      className: 'settings',
      textContent: 'Upload JSON to overwrite local storage data'
    },
    input: {
      id: 'uploadLocalStorageFromJsonInput'
    }
  };

  public validateButton: IButtonElement = {
    id: 'validateButton',
    className: 'settings',
    textContent: 'Validate'
  };
}
