import _ from 'lodash'
import React from 'react';
import Service from './actions/service'
export default class Component extends React.Component {
  constructor(props) {
    super(props)
    let selected = false
    let st_addit = false
    let collect_field_value = ""
    this.inputs = []
    this.state = { selected, st_addit, collect_field_value }
  }
  handleChange = (selected) => (event) => {
    this.setState({ collect_field_value: event.target.value })
  }
  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.handleSaveItem()
    }
  }
  handleNewItem() {
    const { st_addit, selected } = this.state
    this.setState({ collect_field_value: "", st_addit: !st_addit }, () => {
      this.inputs[selected] && this.inputs[selected].focus()
    })
  }
  async handleSaveItem(adding) {
    const { menu } = this.props
    const { selected, collect_field_value } = this.state
    if(!selected) return false
    const name = collect_field_value
    const parent = selected
    const path = name.replace(/\s/g, '').toLowerCase()
    const parentmodel = _.find(menu, {_id: parent})
    const fullpath = `${parentmodel.path}/${path}`
    const body = { name, parent, path: fullpath }
    const payload = await Service.saveCollection(body)
    const itemid = payload._doc._id
    this.props.reloadMenu()
    this.handleSelected(itemid)
    if(adding) {
      this.props.handleAddItem(itemid)
      this.props.handleParents()
    }
  }
  handleSelectItem() {
    const { selected, st_addit, collect_field_value } = this.state
    if((st_addit && collect_field_value.length === 0) || (!st_addit && !selected)) return false
    if(st_addit) { 
      this.handleSaveItem(true) 
    } else {
      this.props.handleAddItem(selected)
      this.props.handleParents()
    }
  }
  handleSelected(itemid) {
    const { menu } = this.props
    let { selected } = this.state
    if(itemid === selected) {
      const s_parent = _.find(menu, {_id: itemid})
      selected = s_parent ? s_parent.parent : ""
    } else {
      selected = itemid
    }
    this.setState({ st_addit: false, selected })
  }
  renderIconClose() { 
    return (
      <p className="dpto-item-icon">
        <i className="material-icons">arrow_right</i>
      </p>
    ) 
  }
  renderIconOpend() { 
    return (
      <p className="dpto-item-icon">
        <i className="material-icons">arrow_drop_down</i>
      </p>
    ) 
  }
  renderIconSlash() { 
    return (
      <p className="dpto-item-icon">/</p>
    ) 
  }
  renderField(id) {
    return (
      <div className="dpto-wrap">
        <div className="dpto-wrap-left">
          { this.renderIconSlash() }
        </div>
        <div className="dpto-wrap-center">
          <input 
            type="text" 
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange("collect_field_value")} 
            ref={(input) => { this.inputs[id] = input }} 
          />
        </div>
        <div className="dpto-wrap-right">
        </div>
      </div>
    )
  }
  renderItem(item, k) {
    const { menu } = this.props
    const { selected, st_addit } = this.state
    const string_selected = !st_addit && item._id === this.state.selected ? ` selected` : ``
    const fupath_selected = _.find(menu, {_id: selected})
    const flpath_selected = fupath_selected ? fupath_selected.path : ""
    const stitem_selected = flpath_selected.startsWith(item.path) || flpath_selected === item.path
    const string_visibles = stitem_selected ? ` visible` : ` `
    const nfield_visibles = st_addit ? ` visible` : ` `
    const parent_havesubs = _.filter(menu, {parent: item._id})
    return (
      <div className={`dpto-item${string_visibles}${string_selected}`} key={k}>
        <div className="dpto-wrap" onClick={() => this.handleSelected(item._id)}>
          <div className="dpto-wrap-left">
            { 
              parent_havesubs.length > 0 ? stitem_selected ? this.renderIconOpend() : this.renderIconClose() : this.renderIconSlash()
            }
          </div>
          <div className="dpto-wrap-center">{item.name.toUpperCase()}</div>
          <div className="dpto-wrap-right"></div>
        </div>
        <div className="dpto-subs">
          { this.renderSubs(item._id) }
          <div className={`dpto-newf${nfield_visibles}`}>
            { item._id === selected && st_addit && this.renderField(item._id) }
          </div>
        </div>
      </div>
    )
  }
  renderSubs(parent) {
    const { menu } = this.props
    const root_sb = _.filter(menu, {parent: parent})
    const ordered = root_sb.sort((a, b) => a.name.localeCompare(b.name))
    return (
      <React.Fragment>{
        _.map(ordered, (item, k) => {
          return this.renderItem(item, k)
        })
      }</React.Fragment>
    )
  }
  renderModal() {
    const { menu } = this.props
    const { selected, st_addit, collect_field_value } = this.state
    const root_md = _.find(menu, {path: "/"})
    const root_id = root_md ? root_md._id.toString() : "0"
    const root_sb = _.filter(menu, {parent: root_id})
    const ordered = root_sb.sort((a, b) => a.name.localeCompare(b.name))
    const bttn_sv = (st_addit && collect_field_value.length > 0) || (!st_addit && selected) ? " pri" : " thi"
    return (
      <div className="parent-modal-wrap">
        <div className="parent-modal-opac" onClick={() => this.props.handleParents()}></div>
        <div className="parent-modal-body">
          <div className="parent-body-topper">
            <button className={`main-button`} onClick={() => this.props.handleParents()}>
              <i className="material-icons">close</i>
            </button>
          </div>
          <div className="parent-body-contnt">
            { 
              _.map(ordered, (item, k) => {
                return this.renderItem(item, k)
              })
            }
          </div>
          <div className="parent-body-bottom">
            <button 
              className={`main-button sec`} 
              onClick={() => this.handleNewItem()}>
              { st_addit ? `CANCELAR` : `NOVA CATEGORIA`}
            </button>
            <button 
              className={`main-button${bttn_sv}`} 
              onClick={() => this.handleSelectItem()}>
              SALVAR
            </button>
          </div>
        </div>
      </div>
    )
  }
  render() {
    return (
      this.props.open && this.renderModal()
    )
  }
}