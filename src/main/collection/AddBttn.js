import React from 'react';
import { Link } from 'react-router-dom'
class Component extends React.Component{
  render() {
    const { functions } = this.props
    return (
      <div className="floatter-button">
        <button className="item-capture" onClick={() => functions.handleForm()}>
          <i className="material-icons">add</i>
        </button>
      </div>
    )
  }
}
export default Component;