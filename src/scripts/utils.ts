import { Selector } from '../models';
import { AddListener, ExtensionListenerCallback } from './models';

export const addExtensionListener = chrome.runtime.onMessage.addListener as (
  ...args: [ExtensionListenerCallback]
) => ReturnType<AddListener>;

const selectElements = ({ selectorType, selector }: Selector) => {
  let selectSymbol = '';
  switch (selectorType) {
    case 'id':
      selectSymbol = '#';
      break;
    case 'class':
      selectSymbol = '.';
      break;
    case 'tag':
      selectSymbol = '';
      break;
    default:
      break;
  }
  return document.querySelectorAll(selectSymbol + selector);
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
