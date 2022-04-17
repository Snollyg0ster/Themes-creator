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

const colorTransition = (
  element: Element,
  id: string,
  color: string,
  time: number
) => {
  $(`[title="myStyles${id}"]`)?.remove();

  const style = document.createElement('style');
  style.title = `myStyles${id}`;
  style.innerHTML = `
    .firstTS${id} {
      transition: background ${time}ms;
    }
    .secondTS${id} {
      background: ${color};
    }
  `;

  const head = $('head');
  head?.appendChild(style);

  element?.classList.add('firstTS' + id);
  element?.classList.add('secondTS' + id);
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
  command: string
) => {
  const [, minIntensity, maxIntensity, speed = 1000] = command
    .split(' ')
    .map((el, i) => (i ? +el : el)) as [string, ...number[]];
  const id = selectorType + selector.split(' ').join('');

  if (isNaN(minIntensity) || isNaN(maxIntensity) || isNaN(speed)) return;

  someExecutions(-1, speed, (num) => {
    const color = rgbToRgbaString(randomRGB(minIntensity, maxIntensity));
    color && colorTransition(element, id, color, speed);
  });
};
