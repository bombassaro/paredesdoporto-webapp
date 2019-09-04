import React from 'react';
import _ from 'lodash'
import { Link } from 'react-router-dom'
class Component extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter_value: ""
    }
    this.changeFilterValue = this.changeFilterValue.bind(this)
  }
  changeFilterValue = (event) => {
    let filter_value = event.target.value
    this.setState({ filter_value })
  }
  renderFilterInput() {
    return (
      <div className="main-menu-title filter-input">
        <input type="text" placeholder="BUSCAR" onChange={this.changeFilterValue} />
      </div>
    )
  }
  renderTag(item, k) {
    const { content } = this.props
    const { location, main } = content
    let { tag } = content
    tag = tag && tag.toUpperCase()
    const fullpath = main === "/" ? "" : `/${main}`
    const selected = item.name === tag ? "selected" : ""
    // const itemname = item.name ? item.name.replace(/[^a-zA-Z ]/g, "").toLowerCase() : ""
    const itemname = item.name.toLowerCase()
    return (
      <div className={`main-menu-group tags`} key={k}>
        <Link to={ selected !== "" ? `${fullpath}` : `${fullpath}/t/${itemname}`}>
          <div className={`main-menu-item ${selected}`}>
            <p># {item.name}</p>
            <p className="bullet">{item.count}</p>
          </div>
        </Link>
      </div>
    )
  }
  render() {
    const { functions, tags } = this.props
    let { filter_value } = this.state
    filter_value = filter_value.toUpperCase()
    let _firstOrder = _.orderBy(tags, ['name'],['asc']);
    let _finalOrder = _.orderBy(_firstOrder, ['count'],['desc']);
    return (
      <div className="main-menu-wrap right-side">
        <button onClick={() => functions.handleFltr()}>
          <div className="main-menu-opac"></div>
        </button>
        <div className="main-menu">
          <div className="main-menu-top">
            <button onClick={() => functions.handleFltr()}>
              <i className="material-icons">close</i>
            </button>
          </div>
          { this.renderFilterInput() }
          { 
            _.map(_finalOrder, (item, k) => {
              // console.log(item.name, filter_value, _.includes(item.name, filter_value))
              if(_.includes(item.name, filter_value)) {
                return this.renderTag(item, k)
              }
            } 
          )}
        </div>
      </div>
    )
  }
}
export default Component;