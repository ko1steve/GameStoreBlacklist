export class CommonTool {
  public static showLog (param: any, ...optionalParams: any[]): void {
    console.log('%c[extension] ' + param, 'color: green font-weight: bold', ...optionalParams)
  }
}
