export class CommonUtil {
  public static showLog (param: any, ...optionalParams: any[]): void {
    console.log('%c[GameStoreBlackList] ' + param, ...optionalParams, 'color: green; font-weight: bold');
  }

  public static showPopupLog (param: any, ...optionalParams: any[]): void {
    console.log('%c[GameStoreBlackList_Popup] ' + param, ...optionalParams, 'color: red; font-weight: bold');
  }
}
