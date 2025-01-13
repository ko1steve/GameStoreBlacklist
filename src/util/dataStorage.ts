export type StorageType = null | string | number | boolean | Array<any> | Object;

export class DataStorage {
  public static setItem (key: string, value: StorageType): Promise<void> {
    return chrome.storage.sync.set({ [key]: value });
  }

  public static getItem (key: string): Promise<StorageType | undefined> {
    return new Promise<StorageType | undefined>(resolve => {
      /** version 1.8 and above */
      chrome.storage.sync.get([key]).then(syncData => {
        if (syncData && syncData[key]) {
          resolve(syncData[key]);
        } else {
          /** version 1.7.1 and below */
          chrome.storage.local.get([key]).then(localData => {
            if (localData) {
              resolve(localData[key]);
            } else {
              resolve(undefined);
            }
          });
        }
      });
    });
  }
}
