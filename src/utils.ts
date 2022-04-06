export const sendTabMessage = <M = any, R = any>(tabId: number, type: string, message: M, responseCallback?: (response: R) => void) => {
  chrome.tabs.sendMessage(tabId, {type, data: message}, responseCallback)
}