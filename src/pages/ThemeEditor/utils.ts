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

  console.log('allThemes', themes);

  const setOldThemes = (url: string, themes?: Theme | null) => {
    console.log('Да могу я блин', themes, url);
    if (url && themes && themes[url]) {
      console.log('Да ставлю я блин', themes, themes[url]);
      setSelectors(themes[url]);
    }
    setIsThemesReceived(true);
  };

  const archiveOrApplyTheme = (
    _: boolean,
    themes?: Theme | null | undefined
  ) => {
    url
      ? setOldThemes(url, themes)
      : setThemesReceivedCallback(
          () => (url: string) => setOldThemes(url, themes)
        );
  };

  useStorageSync('themes', themes, setThemes, archiveOrApplyTheme);

  useEffect(() => {
    if (!url) return;
    if (!isThemesReceived) {
      themesReceivedCallback && themesReceivedCallback(url);
      return;
    }
    setThemes({ ...themes, [url]: selectors });
  }, [selectors, url, isThemesReceived]);
};
