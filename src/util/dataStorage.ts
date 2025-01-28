export type StorageType = null | string | number | boolean | Array<any> | Object;

export class DataStorage {
  public static readonly MAX_STORAGE_BYTE_PER_KEY: number = 8192;

  public static setItem (key: string, value: StorageType): Promise<void> {
    return chrome.storage.sync.set({ [key]: value });
  }

  public static getItem (key: string, type: StorageDataType = 'all'): Promise<StorageType | undefined> {
    return new Promise<StorageType | undefined>(resolve => {
      if (type === 'all') {
        /** version 1.8 and above */
        chrome.storage.sync.get([key]).then(syncData => {
          if (syncData && syncData[key] !== undefined) {
            resolve(syncData[key]);
          } else {
            /** version 1.7.1 and below */
            chrome.storage.local.get([key]).then(localData => {
              if (localData && localData[key] !== undefined) {
                resolve(localData[key]);
              } else {
                resolve(undefined);
              }
            });
          }
        });
      } else if (type === 'sync') {
        chrome.storage.sync.get([key]).then(syncData => {
          if (syncData && syncData[key] !== undefined) {
            resolve(syncData[key]);
          }
        });
      } else if (type === 'local') {
        chrome.storage.local.get([key]).then(localData => {
          if (localData && localData[key] !== undefined) {
            resolve(localData[key]);
          }
        });
      }
    });
  }

  public static async remove (key: string, type: StorageDataType = 'all'): Promise<void> {
    if (type === 'all' || type === 'local') {
      await chrome.storage.local.remove([key]);
    }
    if (type === 'all' || type === 'sync') {
      await chrome.storage.sync.remove([key]);
    }
  }

  public static async clear (type: StorageDataType = 'all'): Promise<void> {
    if (type === 'all' || type === 'local') {
      await chrome.storage.local.clear();
    }
    if (type === 'all' || type === 'sync') {
      await chrome.storage.sync.clear();
    }
  }
}

export type StorageDataType = 'all' | 'local' | 'sync';

export enum DataVersion {
  V_171_BELOW = 'V_1.7.1_BELOW',
  V_180_ABOVE = 'V_1.8.0_ABOVE'
}
