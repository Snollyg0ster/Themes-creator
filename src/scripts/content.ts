import { Selector } from '../models';
import { updateElementStyle } from './utils';

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type === 'tabInfo') {
    console.log('selectors', request.data);
    const selectors = request.data as Selector[];
    selectors.forEach((selector) => updateElementStyle(selector));
  }
  sendResponse({ farewell: 'styles received' });
  return true;
});
