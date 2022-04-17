import { Selector } from '../../models';
import { RGB } from '../models';
import { someExecutions } from './common';

const $ = document.querySelector.bind(document);

export const applyColor = (
  element: Element,
  selector: string,
  styleProp: string
) =>
  (((element as HTMLElement).style as Record<string, any>)[styleProp] =
    selector);

let styleSheetNumber = 0;

const colorTransition = (
  element: Element,
  id: number,
  color: string,
  time: number,
  property = 'background'
) => {
  let style = $(`[title="CTThemeStyles"]`) as HTMLStyleElement;
  if (!style) {
    style = document.createElement('style');
    style.title = `CTThemeStyles`;
    const head = $('head');
    head?.appendChild(style);
    for (let i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].title === 'CTThemeStyles') {
        styleSheetNumber = i;
      }
    }
  }
  const styleSheet = document.styleSheets[styleSheetNumber];
  const rules = styleSheet.cssRules || styleSheet?.rules;
  const cssText = `.TS-${id} { transition: ${property} ${time}ms; ${property}: ${color}; }`;
  if (!rules[id]) {
    styleSheet.insertRule(cssText, id);
  } else {
    const rule = rules[id] as any;
    rule.style.transition = `${property} ${time}ms`;
    rule.style[property] = color;
  }
  element?.classList.add('TS-' + id);
};

// const colorInterpolation = (c1: RGB, c2: RGB, fraction: number) =>
//   c1.map((c, i) => (c2[i] - c) * fraction + c);

export const randomRGB = (minIntensity: number, maxIntensity: number) => {
  const rgb = Array.from({ length: 3 }, () =>
    Math.round(Math.random() * maxIntensity)
  );
  if (rgb.every((c) => c < minIntensity)) {
    rgb[Math.floor(Math.random() * 3)] =
      Math.round(Math.random() * (maxIntensity - minIntensity)) + minIntensity;
  }
  return rgb as RGB;
};

export const rgbToRgbaString = (color: number[], alpha = 255) =>
  color.length > 2 ? `rgba(${color.slice(0, 4).join(', ')}, ${alpha})` : null;

export const randomColorsInterpolation = (
  element: Element,
  { selector, selectorType }: Selector,
  command: string,
  id: number
) => {
  const [, minIntensity, maxIntensity, speed = 1000] = command
    .split(' ')
    .map((el, i) => (i ? +el : el)) as [string, ...number[]];

  if (isNaN(minIntensity) || isNaN(maxIntensity) || isNaN(speed)) return;

  someExecutions(-1, speed, (num) => {
    const color = rgbToRgbaString(randomRGB(minIntensity, maxIntensity));
    color && colorTransition(element, id, color, speed);
  });
};
