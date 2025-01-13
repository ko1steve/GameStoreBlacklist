export class CommonUtil {
  public static showLog (param: any, ...optionalParams: any[]): void {
    console.log('%c[GameStoreBlackList] ' + param, ...optionalParams, 'color: green; font-weight: bold');
  }

  public static compareStr (wildcardStr: string, str: string): boolean {
    const source = '^' + wildcardStr.replaceAll('.', '\\.').replaceAll('?', '\\?').replaceAll('*', '.*') + '$';
    const regExp = new RegExp(source);
    return regExp.test(str);
  }
}
