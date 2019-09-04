import React from 'react';
import { filter } from 'lodash'
import loadData from '../../helpers/loadDataFunc'
import Service from './actions/service'
import Empty from './Empty'
class Component extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.loadDataService();
  }
  loadDataService() {
    return loadData(Service, (payload) => {
      return this.setState(payload)
    });
  }
  renderItem(item) {
    return (
      <div>
        <p>{item._id}</p>
        <p>{item.name}</p>
      </div>
    );
  }
  render() {
    const { items } = this.state
    const { match } = this.props
    const { params } = match
    const { id } = params
    const item = filter(items, { _id : id })[0]
    return item ? this.renderItem(item) : ( <Empty /> )

  }
}
export default Component;