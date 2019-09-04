import { Route, Switch} from 'react-router-dom';
import React from 'react';
import Index from '../index';
class Routes extends React.Component{
  // <Switch>
  //   <Route path="/login" component={Index} exact />
  // </Switch>
  render() {
    return (
      <Index />
    );
  }
}
export default Routes;