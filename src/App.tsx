import React, { ChangeEvent, CSSProperties, EventHandler, useState } from 'react';
import { Farewell, TabInfo } from './models';
import { makeStyles, sendTabMessage } from './utils';

const selectorTypes: string[] = ['id', 'class' ]

function App() {
  const [selectorType, setSelectorType] = useState(selectorTypes[0]);
  const [selector, setSelector] = useState('');

  const makeMagic = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      console.log('tabs', tabs)
      tabs[0]?.id && sendTabMessage<TabInfo, Farewell>(tabs[0].id, 'tabInfo',{title: tabs[0].title}, (response) => {
          console.log(response?.farewell); 
        }
      )
    }
    );
  }

  const handleSelectorType = (event: ChangeEvent<HTMLSelectElement>) => setSelectorType(event.target.value)

  const handleSelector = (event: ChangeEvent<HTMLInputElement>) => setSelector(event.target.value)

  const styles = useStyles();

  return (
    <div style={styles.root}>
      <h3>Lets make something!</h3>
      <select value={selectorType} onChange={handleSelectorType} style={styles.select}>
        {selectorTypes.map(selector => <option value={selector}>{selector}</option>)}
      </select>
      <input value={selector} onChange={handleSelector}/>
      <button onClick={makeMagic} style={styles.button}>
        <h3 style={styles.switch}>Switch</h3>(let some magic happen)
      </button>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  select: {
    marginBottom: 10,
  },
  button: {
    height: 40,
    width: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#eee',
    backgroundColor: 'gray',
    borderWidth: 0,
    borderRadius: 7,
    margin: 10,
    lineHeight: 0
  },
  switch: {
    marginTop: -2,
    color: 'white',
  }
});

export default App;
