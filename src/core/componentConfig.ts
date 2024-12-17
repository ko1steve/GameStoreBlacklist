import { IButtonElement, ICheckboxImageElement, IHTMLElement, ILabelEleemnt } from '../data/commonData';

export interface IComponentConfig {
  componentId: string
  checkboxContainer: ICheckBoxContainer
  headerBottomContainer: IHeaderContainer
  downloadButton: IButtonElement
  uploadButton: IUploadButton
  texthandle: ITextHandleConfig
  isGameListPage: boolean
}

export interface ITextHandleConfig {
  startWords: string[]
  endWords: string[]
  cutToEndWords: string[]
  excludeTitleWords: string[]
}

export interface ICheckBoxContainer extends IHTMLElement {
  checkbox: ICheckboxImageElement
}

export interface IHeaderContainer extends IHTMLElement {
  showBlacklistGameContainer: IShowBlacklistGameCheckbox
}

export interface IShowBlacklistGameCheckbox extends IHTMLElement {
  checkbox: ICheckboxImageElement
}

export interface IUploadButton extends IHTMLElement {
  label: ILabelEleemnt
  input: IHTMLElement
}

export class ComponentConfig implements IComponentConfig {
  public componentId = 'component';

  public checkboxContainer: ICheckBoxContainer = {
    className: 'checkboxContainer',
    checkbox: {
      className: 'checkboxImg',
      sourceName: 'image/checkbox_across_enabled.png',
      disabledSourceName: 'image/checkbox_across_disabled.png',
      action: 'actionCheckboxEnabled',
      disabledAction: 'actionCheckboxDisabled'
    }
  };

  public headerBottomContainer: IHeaderContainer = {
    id: 'headerBottom',
    className: 'flexbox',
    showBlacklistGameContainer: {
      id: 'showBlacklistGameCheckboxContainer',
      className: 'flexbox flexboxItem',
      checkbox: {
        id: 'showBlacklistGameCheckboxImg',
        sourceName: 'image/checkbox_tick_enabled.png',
        disabledSourceName: 'image/checkbox_tick_disabled.png',
        action: 'actionShowBlacklistGameCheckboxEnabled',
        disabledAction: 'actionShowBlacklistGameCheckboxDisabled',
        text: {
          id: 'showBlaclistGameCheckboxText',
          innerText: 'Also show in-blacklist games ({numberOfGames} games)'
        }
      }
    }
  };

  public downloadButton: IButtonElement = {
    id: 'downloadLocalStorageAsJsonButton',
    className: 'flexboxItem',
    textContent: 'Download local stoage data as JSON'
  };

  public uploadButton: IUploadButton = {
    label: {
      id: 'uploadLocalStorageFromJsonLabel',
      className: 'flexboxItem',
      textContent: 'Upload JSON to overwrite local storage data'
    },
    input: {
      id: 'uploadLocalStorageFromJsonInput'
    }
  };

  public validateButton: IButtonElement = {
    id: 'validateButton',
    className: 'flexboxItem',
    textContent: 'Validate'
  };

  public texthandle: ITextHandleConfig = {
    startWords: [],
    endWords: [],
    cutToEndWords: [],
    excludeTitleWords: []
  };

  public isGameListPage: boolean = false;
}
