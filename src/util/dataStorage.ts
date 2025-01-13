export class DataStorage {
  public static setItem (key: string, value: any): Promise<void> {
    return chrome.storage.local.set({ [key]: value });
  }

  public static getItem (key: string): Promise<any> {
    return new Promise<any>(resolve => {
      chrome.storage.local.get([key]).then(storageData => {
        if (storageData) {
          resolve(storageData[key]);
        } else {
          resolve(undefined);
        }
      });
    });
  }
}
