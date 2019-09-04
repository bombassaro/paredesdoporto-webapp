import React from 'react';
import ReactDOM from 'react-dom';
import RegisterServiceWorker from './app/rsworker';

import App from './app/index';

const rootEl = document.getElementById('app');

const render = () => ReactDOM.render(<App />, rootEl)

render();

RegisterServiceWorker();

if(module.hot) {
  module.hot.accept('./', render);
}
