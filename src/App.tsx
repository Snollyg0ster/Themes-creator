import React from 'react';
import { Farewell, TabInfo } from './models';
import { sendTabMessage } from './utils';

function App() {

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

  return (
    <div>
      test label WOW
      <button onClick={makeMagic}>Тест</button>
    </div>
  );
}

export default App;
