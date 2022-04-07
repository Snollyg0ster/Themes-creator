import { addExtensionListener } from "../utils";

chrome.runtime.onInstalled.addListener(() => {
  addExtensionListener(
    (request, _sender, sendResponse) => {
      if (request.type === "tabInfo")
        console.log(request.data.title)
        sendResponse({farewell: "tabName alerted"});
    }
  );
})