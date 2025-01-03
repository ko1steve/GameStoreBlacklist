import { IButtonElement, ICheckboxImageElement, IHTMLElement, ILabelEleemnt } from '../data/commonData';

export interface IComponentConfig {
  componentId: string
  checkboxContainer: ICheckBoxContainer
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

  public texthandle: ITextHandleConfig = {
    startWords: [],
    endWords: [],
    cutToEndWords: [],
    excludeTitleWords: []
  };

  public isGameListPage: boolean = false;
}
