import SelectorEditor from './components/SelectorEditor';
import { Farewell, TabInfo } from './models';
import { makeStyles, sendTabMessage } from './utils';
import reset from './assets/img/reset.png'
import { useState } from 'react';

function App() {
  const [visible, setVisible] = useState(true);

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

  const resetAll = () => {
    setVisible(false),
    setTimeout(() => setVisible(true))
  }

  const styles = useStyles();

  return (
    <>
      { visible &&
        <div style={styles.root}>
          <button style={styles.resetButton} onClick={resetAll}>
            <img alt="reset" src={reset} style={styles.reset}/>
          </button>
          <h3>Lets make something!</h3>
          <SelectorEditor />
          <button onClick={makeMagic} style={styles.button}>
            <h3 style={styles.switch}>Switch</h3>(let some magic happen)
          </button>
        </div>
      }
    </>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5px 15px',
    position: 'relative',
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
    width: 15
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
    lineHeight: 0,
    marginTop: 20,
  },
  switch: {
    marginTop: -2,
    color: 'white',
  }
});

export default App;
