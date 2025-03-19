export class DataStorage {
  public static readonly MAX_STORAGE_BYTE_PER_KEY: number = 7000;

  public static async setItem (key: string, value: StorageDataType, storageType: StorageType = StorageType.SYNC): Promise<void> {
    if (storageType === StorageType.ALL || storageType === StorageType.LOCAL) {
      await chrome.storage.local.set({ [key]: value });
    }
    if (storageType === StorageType.ALL || storageType === StorageType.SYNC) {
      await chrome.storage.sync.set({ [key]: value });
    }
  }

  public static getItem (key: string, type: StorageType = StorageType.ALL): Promise<StorageDataType | undefined> {
    return new Promise<StorageDataType | undefined>(resolve => {
      if (type === StorageType.ALL) {
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
      } else if (type === StorageType.SYNC) {
        chrome.storage.sync.get([key]).then(syncData => {
          if (syncData && syncData[key] !== undefined) {
            resolve(syncData[key]);
          }
        });
      } else if (type === StorageType.LOCAL) {
        chrome.storage.local.get([key]).then(localData => {
          if (localData && localData[key] !== undefined) {
            resolve(localData[key]);
          }
        });
      }
    });
  }

  public static async remove (key: string, type: StorageType = StorageType.SYNC): Promise<void> {
    if (type === StorageType.ALL || type === StorageType.LOCAL) {
      await chrome.storage.local.remove([key]);
    }
    if (type === StorageType.ALL || type === StorageType.SYNC) {
      await chrome.storage.sync.remove([key]);
    }
  }

  public static async clear (storageType: StorageType = StorageType.SYNC): Promise<void> {
    if (storageType === StorageType.ALL || storageType === StorageType.LOCAL) {
      await chrome.storage.local.clear();
    }
    if (storageType === StorageType.ALL || storageType === StorageType.SYNC) {
      await chrome.storage.sync.clear();
    }
  }
}
export type StorageDataType = null | string | number | boolean | Array<any> | Object;

export enum StorageType {
  ALL = 'ALL',
  LOCAL = 'ALL',
  SYNC = 'ALL'
}

export enum DataVersion {
  V_171_BELOW = 'V_1.7.1_BELOW',
  V_180_ABOVE = 'V_1.8.0_ABOVE'
}
