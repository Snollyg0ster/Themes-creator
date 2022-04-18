import { CSSProperties, useEffect, useState } from 'react';
import { SyncOptions, ActiveTabMessageProps } from './models';

const rootUrlRegExp = /.+:\/\/[^\/]+(?=\/)/;

export const getUrlRoot = (url: string) => {
  const res = rootUrlRegExp.exec(url);
  return res ? res[0] : undefined;
};

export const sendTabMessage = <M = any, R = any>(
  tabId: number,
  ...[type, message, responseCallback]: ActiveTabMessageProps
) => {
  chrome.tabs.sendMessage(tabId, { type, data: message }, responseCallback);
};

export const getActiveTab = (
  callback: (tab: chrome.tabs.Tab) => any,
  async = true
) =>
  chrome.tabs?.query({ active: true, currentWindow: true }, ([tab]) => {
    tab && callback(tab);
    if (async) return true;
  });

export const sendActiveTabMessage = <M = any, R = any>(
  ...props: ActiveTabMessageProps
) => {
  getActiveTab((tab) => tab.id && sendTabMessage<M, R>(tab.id, ...props));
};

const storage = chrome.storage.local;

export const useStorageSync = <T, D>(
  key: string,
  data: T,
  setData: (data: T) => void,
  options: SyncOptions<T, D> = { defaultValue: null }
) => {
  const [receivedData, setReceivedData] = useState<any>();

  useEffect(() => {
    (receivedData === null || receivedData) && storage.set({ [key]: data });
  }, [data]);

  useEffect(() => {
    storage.get(key, (items: any) => {
      const data = items[key];
      setReceivedData(data || null);
      data && setData(items[key]);
      options?.onSync && options.onSync(data || options?.defaultValue);
    });
  }, []);
};

export const makeStyles =
  <T>(styles: { [style in keyof T]: CSSProperties }) =>
  () =>
    styles;
