import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/index.css';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Provider } from 'urql';
import { client } from './urql/index';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider value={client}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
