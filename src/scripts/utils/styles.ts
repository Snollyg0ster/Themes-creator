import { Selector } from '../../models';
import { applyColor, randomColorsInterpolation } from './colorTransf';

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

const randomColorElements: Record<string, any> = {};

export const updateElementStyle = (
  selector: Selector,
  styleProp = 'background'
) => {
  const elements = selectElements(selector);
  elements.forEach((element) => {
    if (selector.color.includes('random')) {
      let id = selector.selectorType + selector.selector;
      if (randomColorElements[id]) return;
      randomColorElements[id] = id;
      randomColorsInterpolation(
        element,
        selector,
        selector.color,
        Object.keys(randomColorElements).length - 1
      );
      return;
    }
    applyColor(element, selector.color, styleProp);
  });
};

export const storage = chrome.storage.local;
