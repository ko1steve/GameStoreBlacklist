export class CommonTool {
  public static showLog (param: any, ...optionalParams: any[]): void {
    console.log('%c[extension] ' + param, 'color: green font-weight: bold', ...optionalParams);
  }

  public static compareStr (wildcardStr: string, str: string): boolean {
    const source = '^' + wildcardStr.replaceAll('.', '\\.').replaceAll('?', '\\?').replaceAll('*', '.*') + '$';
    const regExp = new RegExp(source);
    return regExp.test(str);
  }
}
