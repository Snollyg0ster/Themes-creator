import { CSSProperties, useEffect, useState } from 'react';

export const sendTabMessage = <M = any, R = any>(
  tabId: number,
  type: string,
  message: M,
  responseCallback?: (response: R) => void
) => {
  chrome.tabs.sendMessage(tabId, { type, data: message }, responseCallback);
};

export const makeStyles =
  <T>(styles: { [style in keyof T]: CSSProperties }) =>
  () =>
    styles;

export const getTabId = (callback: (tabId: number) => any) =>
  chrome.tabs?.query(
    { active: true, currentWindow: true },
    ([tab]) => tab?.id && callback(tab?.id)
  );

const storage = chrome.storage.local;

export const useStorageSync = <T>(
  key: string,
  data: T,
  setData: (data: T) => void
) => {
  const [receivedData, setReceivedData] = useState<any>(undefined);

  useEffect(() => {
    receivedData === null || (receivedData && storage.set({ [key]: data }));
  }, [data]);

  useEffect(() => {
    storage.get(key, (items: any) => {
      const data = items[key];
      setReceivedData(data || null);
      if (data) {
        setData(items[key]);
      }
    });
  }, []);
};
