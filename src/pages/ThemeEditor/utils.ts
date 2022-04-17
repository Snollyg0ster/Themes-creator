import { useEffect, useState } from 'react';
import { Selector } from '../../models';
import { useStorageSync } from '../../utils';

export type Theme = Record<string, Selector[]>;

export const useTabTheme = (
  url: string | undefined,
  selectors: Selector[],
  setSelectors: (s: Selector[]) => void
) => {
  const [themes, setThemes] = useState<Theme>();
  const [themesReceivedCallback, setThemesReceivedCallback] =
    useState<(url: string) => void>();
  const [isThemesReceived, setIsThemesReceived] = useState(false);

  const setOldThemes = (url: string, themes?: Theme | null) => {
    url && themes && themes[url] && setSelectors(themes[url]);
    setIsThemesReceived(true);
  };

  const archiveOrApplyTheme = (themes?: Theme | null) => {
    url
      ? setOldThemes(url, themes)
      : setThemesReceivedCallback(
          () => (url: string) => setOldThemes(url, themes)
        );
  };

  useStorageSync('themes', themes, setThemes, { onSync: archiveOrApplyTheme });

  useEffect(() => {
    if (!url) return;
    if (!isThemesReceived) {
      themesReceivedCallback && themesReceivedCallback(url);
      return;
    }
    setThemes({ ...themes, [url]: selectors });
  }, [selectors, url, isThemesReceived]);
};

export const colorToHex = (color: string) => {
  let ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return color;
  ctx.fillStyle = color;
  return ctx.fillStyle;
};
