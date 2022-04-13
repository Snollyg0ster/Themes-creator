import { Selector } from '../models';
import { AddListener, ExtensionListenerCallback } from './models';

export const addExtensionListener = chrome.runtime.onMessage.addListener as (
  ...args: [ExtensionListenerCallback]
) => ReturnType<AddListener>;

const selectElements = ({ selectorType, selector }: Selector) => {
  let newSelector = selector;
  let selectSymbol = '';
  switch (selectorType) {
    case 'id':
      selectSymbol = '#';
      break;
    case 'class':
      selectSymbol = '.';
      newSelector = newSelector.split(' ').join('.');
      break;
    default:
      break;
  }
  return document.querySelectorAll(selectSymbol + newSelector);
};

export const updateElementStyle = (
  selector: Selector,
  styleProp = 'background'
) => {
  const elements = selectElements(selector);
  elements.forEach(
    (element) =>
      (((element as HTMLElement).style as Record<string, any>)[styleProp] =
        selector.color)
  );
};

export const storage = chrome.storage.local;

export const someExecutions = (
  num: number,
  timeout: number,
  callback: Function
) => {
  num &&
    setTimeout(() => {
      callback();
      someExecutions(num - 1, timeout, callback);
    }, timeout);
};
