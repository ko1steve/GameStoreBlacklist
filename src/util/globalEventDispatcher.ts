import { TSMap } from 'typescript-map';

export enum GlobalEventNames {
  DEBUG_MODE_ON = 'DEBUG_MODE_ON',
  DEBUG_MODE_OFF = 'DEBUG_MODE_OFF'
}

export interface IGlobalEvent {
  name: string;
  data: any;
}

window.addEventListener('message', (msg) => {
  const event: IGlobalEvent = msg.data;
  if (!GlobalEventDispatcher.eventMap.has(event.name)) {
    return;
  }
  GlobalEventDispatcher.eventMap.get(event.name).forEach(callbackfn => callbackfn(event));
});

export class GlobalEventDispatcher {
  public static eventMap: TSMap<string, ((event: IGlobalEvent) => any)[]> = new TSMap();

  public static addListener (eventName: string, callbackFn: (msg?: any) => any) {
    if (this.eventMap.has(eventName)) {
      this.eventMap.get(eventName).push(callbackFn);
    } else {
      this.eventMap.set(eventName, [callbackFn]);
    }
  }

  public static dispatch (eventName: string, eventData: any) {
    const event: IGlobalEvent = {
      name: eventName,
      data: eventData
    };
    window.postMessage(event);
  }
}
