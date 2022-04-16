import { Selector } from '../models';
import { addExtensionListener, someExecutions } from './utils/common';
import { storage, updateElementStyle } from './utils/styles';

addExtensionListener((request, _sender, sendResponse) => {
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
