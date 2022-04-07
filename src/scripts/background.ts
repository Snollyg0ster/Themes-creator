export {};

chrome.runtime.onInstalled.addListener(() => {
  chrome.action?.setTitle({title: 'Новый title'})
})
