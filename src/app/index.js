import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import CollectionRoutes from '../main/collection/actions/routes';

import { SessionProvider } from '../main/session/actions/reducer';
import SessionRoutes from '../main/session/actions/routes';

import '../stylesheet/main.css';

class App extends React.Component{
  render() {
    return (
      <SessionProvider>
        <BrowserRouter>
          <React.Fragment>
            <SessionRoutes />
            <Switch>
              <CollectionRoutes />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </SessionProvider>
    );
  }
}

export default App;