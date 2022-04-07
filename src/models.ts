export interface Query<T = any> {
  type: string;
  data: T;
}

export interface Farewell {
  farewell?: string;
}

export interface TabInfo {
  title: string | undefined;
}

export type AddListener = typeof chrome.runtime.onMessage.addListener;
export type CallbackParameters = Parameters<Parameters<AddListener>[0]>
export type ExtensionListenerCallback = (...args: [Query, ...Omit<CallbackParameters, 'message'>]) => ReturnType<Parameters<AddListener>[0]>