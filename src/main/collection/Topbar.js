import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Bread from './Bread'
import { Collection } from "./actions/reducer";

const Component = (props) => {

  const { state, dispatch } = useContext(Collection);
  const { functions } = props
  
  const renderAdd = () => {
    return (
      <button onClick={() => functions.toggleForm()}>
        <i className="material-icons">add</i>
      </button>
    )
  }
  const renderSearch = () => {
    return (
      <button className="item-search" onClick={() => functions.handleFltr()}>
        <i className="material-icons">search</i>
      </button>
    )
  }
  const render = () => {
    let dpto = "PAREDES DO PORTO"
    return (
      <div className="topbar-fixed">
        <div className="topbar">
          <div className="topbar-cont">
            <p className="left-icon">
              <button onClick={() => functions.handleMenu()}>
                <i className="material-icons">clear_all</i>
              </button>
            </p>
            <Link to={{ pathname: '/' }} onClick={() => functions.handleClea()}>
              <p className="title">{dpto}</p>
            </Link>
            <p className="right-icon">
              { renderSearch() }
            </p>
          </div>
        </div>
        <Bread {...props} />
      </div>
    )
  }
  return render()
}
export default Component;