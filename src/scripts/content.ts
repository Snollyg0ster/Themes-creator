import { Selector } from '../models';
import { someExecutions, storage, updateElementStyle } from './utils';

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type === 'tabInfo') {
    const selectors = request.data as Selector[];
    selectors?.forEach((selector) => updateElementStyle(selector));
  }
  sendResponse({ farewell: 'styles received' });
  return true;
});

const applySavedStyles = () => {
  const url = window.location.origin;
  if (!url) return;
  storage.get('themes', ({ themes: items }: any) => {
    if (items) {
      someExecutions(20, 500, () => {
        (items[url] as Selector[])?.forEach((selector) =>
          updateElementStyle(selector)
        );
      });
    }
  });
};

applySavedStyles();
