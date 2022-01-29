import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/index.css';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { client } from './apollo/apollo';
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
