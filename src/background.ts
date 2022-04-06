import { Query } from './models'

type AddListener = typeof chrome.runtime.onMessage.addListener;
type CallbackParameters = Parameters<Parameters<AddListener>[0]>
type ExtensionListenerCallback = (...args: [Query, ...Omit<CallbackParameters, 'message'>]) => ReturnType<Parameters<AddListener>[0]>

const addExtensionListener = chrome.runtime.onMessage.addListener as (...args: [ExtensionListenerCallback]) => ReturnType<AddListener>;

chrome.runtime.onInstalled.addListener(() => {
  chrome.action?.setTitle({title: 'Новый охуенный title'})

  addExtensionListener(
    (request, _sender, sendResponse) => {
      if (request.type === "tabInfo")
        console.log(request.data.title)
        sendResponse({farewell: "tabName alerted"});
    }
  );
})
