import _ from 'lodash'
import React from 'react';
import Parents from './Parents'
export default class Component extends React.Component {
  constructor(props) {
    super(props)
    this.input = React.createRef();
    this.state = { open_parents: false }
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleParents = this.handleParents.bind(this)
  }
  handleAddItem(itemid) {
    let { fields } = this.props
    let { parents } = fields
    if(!itemid) return false
    if(parents.length > 0) {
      parents.unshift(itemid)
    } else {
      parents.push(itemid)
    }
    fields.parents = parents
    this.props.handleFields(fields)
  }
  handleRemoveItem(tag) {
    let { fields } = this.props
    let { parents } = fields
    let filtered = _.remove(parents, function(n) { return n !== tag })
    fields.parents = filtered
    this.props.handleFields(fields)
  }
  handleParents() {
    this.setState({ open_parents: !this.state.open_parents})
  }
  renderItem(item, k) {
    const { menu } = this.props
    const itemdata = _.find(menu, { _id: item})
    return (
      <div className="field-path item" key={k}>
        <div className="cen">
          <p>{itemdata && itemdata.path}</p>
        </div>
        <div className="rig">
          <button onClick={() => this.handleRemoveItem(item)}>
            <i className="material-icons">remove</i>
          </button>
        </div>
      </div>
    )
  }
  renderButton() {
    return (
      <div className="field-buttons">
        <button className={`main-button thi`} onClick={() => this.handleParents()}>SELECIONAR</button>
      </div>
    )
  }
  render() {
    const { menu, parents } = this.props
    return (
      <div className="field-cont tagger">
        <p className="field-labl">CATEGORIA</p>
        { 
          _.map(parents, (item, k) => {
            return this.renderItem(item, k)
          }) 
        }
        {this.renderButton()}
        <Parents 
          menu={menu}
          parents={parents}
          open={this.state.open_parents}
          handleParents={this.handleParents}
          handleAddItem={this.handleAddItem}
          reloadMenu={this.props.reloadMenu}
        />
      </div>
    )
  }
}