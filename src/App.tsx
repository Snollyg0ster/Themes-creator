import SelectorEditor from "./components/SelectorEditor";
import { Farewell, Selector } from "./models";
import { makeStyles, sendTabMessage, useStorageSync } from "./utils";
import reset from "./assets/img/reset.png";
import { useState } from "react";
import SelectorList from "./components/SelectorList";

const makeMagic = (selectors: Selector[]) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    tabs[0]?.id &&
      sendTabMessage<Selector[], Farewell>(
        tabs[0].id,
        "tabInfo",
        selectors,
        (response) => {
          console.log(response?.farewell);
        }
      ); 
    return true;
  });
};

function App() {
  const [visible, setVisible] = useState(true);
  const [selectors, setSelectors] = useState<Selector[]>([]);

  useStorageSync("selectors", selectors, setSelectors);

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

  const resetAll = () => {
    setSelectors([]);
    setVisible(false), setTimeout(() => setVisible(true));
  };

  const applyStyles = () => makeMagic(selectors);

  const styles = useStyles();

  return (
    <>
      {visible && (
        <div style={styles.root}>
          <button style={styles.resetButton} onClick={resetAll}>
            <img alt="reset" src={reset} style={styles.reset} />
          </button>
          <h3>Lets make something!</h3>
          <SelectorList selectors={selectors} />
          <SelectorEditor addSelector={addSelector} />
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px 20px",
    position: "relative",
  },
  resetButton: {
    background: "transparent",
    borderWidth: 0,
    position: "absolute",
    left: -3,
    opacity: 0.7,
  },
  reset: {
    height: 15,
    width: 15,
  },
  switch: {
    marginTop: -2,
    color: "white",
  },
});

export default App;
