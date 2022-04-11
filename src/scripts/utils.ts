import { Selector } from "../models";
import { AddListener, ExtensionListenerCallback } from "./models";

export const addExtensionListener = chrome.runtime.onMessage.addListener as (
  ...args: [ExtensionListenerCallback]
) => ReturnType<AddListener>;

const selectElement = ({ selectorType, selector }: Selector) => {
  let selectSymbol = "";
  switch (selectorType) {
    case "id":
      selectSymbol = "#";
      break;
    case "class":
      selectSymbol = ".";
      break;
    default:
      break;
  }
  return document.querySelector(selectSymbol + selector);
};

export const updateElementStyle = (
  selector: Selector,
  styleProp = "background"
) => {
  const element = selectElement(selector);
  element &&
    (((element as HTMLElement).style as Record<string, any>)[styleProp] =
      selector.color);
};
