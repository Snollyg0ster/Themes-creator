import SelectorEditor from '../../components/SelectorEditor';
import { Selector } from '../../models';
import {
  getActiveTab,
  getUrlRoot,
  makeStyles,
  sendStyles,
  useStorageSync,
} from '../../utils';
import reset from '../../assets/img/reset.png';
import { useEffect, useMemo, useState } from 'react';
import SelectorList from '../../components/SelectorList';
import { useTabTheme } from './utils';

function ThemeEditor() {
  const [visible, setVisible] = useState(true);
  const [selectors, setSelectors] = useState<Selector[]>([]);
  const [activeTab, setActiveTab] = useState<chrome.tabs.Tab>();
  const [editedSelector, setEditedSelector] = useState<Selector>();

  const tabRootUrl = useMemo(
    () => activeTab?.url && getUrlRoot(activeTab.url),
    [activeTab]
  );

  useEffect(() => {
    getActiveTab(setActiveTab);
  }, []);

  useTabTheme(tabRootUrl, selectors, setSelectors);

  const addSelector = (selector: Selector) => {
    let isExist = false;
    const newSelectors = selectors.map((sel) => {
      if (
        sel.selector !== selector.selector ||
        sel.selectorType !== selector.selectorType
      )
        return sel;
      isExist = true;
      return selector;
    });
    isExist
      ? setSelectors(newSelectors)
      : setSelectors((prev) => [...prev, selector]);
  };

  const deleteSelector = ({ selectorType, selector }: Selector) => {
    setSelectors((selectors) =>
      selectors.filter(
        ({ selectorType: type, selector: pointer }) =>
          type !== selectorType || pointer !== selector
      )
    );
  };

  const resetAll = () => {
    setSelectors([]);
    setVisible(false), setTimeout(() => setVisible(true));
  };

  const applyStyles = () => sendStyles(selectors);

  const styles = useStyles();

  return (
    <>
      {visible && (
        <div style={styles.root}>
          <button style={styles.resetButton} onClick={resetAll}>
            <img alt="reset" src={reset} style={styles.reset} />
          </button>
          <h4 style={styles.url}>{tabRootUrl}</h4>
          <h3 style={styles.title}>Lets make something!</h3>
          <SelectorList
            selectors={selectors}
            deleteSelector={deleteSelector}
            setEditedSelector={setEditedSelector}
          />
          <SelectorEditor
            addSelector={addSelector}
            editedSelector={editedSelector}
          />
          <button id="submitStyles" onClick={applyStyles}>
            <h3 style={styles.switch}>Switch</h3>(let some magic happen)
          </button>
        </div>
      )}
    </>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5px 20px',
    position: 'relative',
    width: 250,
  },
  resetButton: {
    background: 'transparent',
    borderWidth: 0,
    position: 'absolute',
    left: -3,
    opacity: 0.7,
  },
  reset: {
    height: 15,
    width: 15,
  },
  url: {
    marginBlock: 0,
    color: 'gray',
  },
  title: {
    marginBlockStart: '0.5em',
  },
  switch: {
    marginTop: -2,
    color: 'white',
  },
});

export default ThemeEditor;
