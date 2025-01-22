export class CommonUtil {
  public static showLog (param: any, ...optionalParams: any[]): void {
    console.log('%c[GameStoreBlackList] ' + param, ...optionalParams, 'color: green; font-weight: bold');
  }

  public static showPopupLog (param: any, ...optionalParams: any[]): void {
    console.log('%c[GameStoreBlackList_Popup] ' + param, ...optionalParams, 'color: red; font-weight: bold');
  }

  public static matchWildcardPattern (pattern: string, str: string): boolean {
    const source = '^' + pattern.replaceAll('.', '\\.').replaceAll('?', '\\?').replaceAll('*', '.*') + '$';
    const regExp = new RegExp(source);
    return regExp.test(str);
  }
}
