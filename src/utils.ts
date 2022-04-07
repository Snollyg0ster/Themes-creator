import { CSSProperties } from "react";
import { AddListener, ExtensionListenerCallback } from "./models";

export const sendTabMessage = <M = any, R = any>(tabId: number, type: string, message: M, responseCallback?: (response: R) => void) => {
  chrome.tabs.sendMessage(tabId, {type, data: message}, responseCallback)
}

export const addExtensionListener = chrome.runtime.onMessage.addListener as (...args: [ExtensionListenerCallback]) => ReturnType<AddListener>;

export const makeStyles = <T>(styles: {[style in keyof T]: CSSProperties}) => () => styles;