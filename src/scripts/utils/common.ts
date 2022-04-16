import { AddListener, ExtensionListenerCallback } from '../models';

export const addExtensionListener = chrome.runtime.onMessage.addListener.bind(
  chrome.runtime.onMessage
) as (...args: [ExtensionListenerCallback]) => ReturnType<AddListener>;

export const someExecutions = (
  num: number,
  timeout: number,
  callback: (num: number) => any
) => {
  if (num) {
    callback(num);
    setTimeout(() => {
      someExecutions(num - 1, timeout, callback);
    }, timeout);
  }
};
