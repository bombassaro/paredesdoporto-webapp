import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Index from '../index';
import Screen from '../../screen';
import Container from '../Contain';
import { CollectionProvider } from './reducer';
class Routes extends React.Component{
  render() {
    return (
      <CollectionProvider>
        <Switch>
          <Route path="/" component={Index} exact />
          <Route path="/c/:cid" component={Screen} exact />
          <Route path="/p/new" component={Index} exact />
          <Route path="/p/:postid" component={Index} exact />
          <Route path="/t/:tag" component={Index} exact />
          <Route path="/**/p/:postid" component={Index} exact />
          <Route path="/**/t/:tag" component={Index} exact />
          <Route path="/**" component={Index} exact />
        </Switch>
      </CollectionProvider>
    );
  }
}
export default Routes;