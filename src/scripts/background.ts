export {};

chrome.runtime.onInstalled.addListener(() => {
  chrome.action?.setTitle({ title: "Новый title" });
});

// addExtensionListener((request, _sender, sendResponse) => {
//   if (request.type === "tabInfo") console.log(request.data.title);
//   sendResponse({ farewell: "tabName alerted" });
//   return true;
// });

// chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
//   getTabId((tabId) =>
//     chrome.scripting.executeScript({ target: { tabId }, files: ["content.js"] })
//   );
// });
