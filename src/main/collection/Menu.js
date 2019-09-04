import React from 'react';
import _ from 'lodash'
import { Link } from 'react-router-dom'
import Service from './actions/service'

class Component extends React.Component{
  constructor(props) {
    super(props)
    // let selected = false
    let selected = props.mainid ? props.mainid : false
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
  async handleDeleteItem() {
    const { menu, functions } = this.props
    const { selected } = this.state
    const selected_model = _.find(menu, {_id: selected})
    // console.log(selected, selected_model.path)
    if(!selected_model || selected_model.path === "/") {
      console.log("false")
      return false
    }

    const parent_model = _.find(menu, {_id: selected_model.parent})
    await Service.deleteCollection(selected)
    this.setState({ selected: parent_model._id })
    // this.props.reloadMenu()
    functions.handleRoot()
  }
  async handleSaveItem(adding) {
    const { menu, mainid, functions } = this.props
    const { selected, collect_field_value } = this.state
    // if(!selected) return false
    const name = collect_field_value
    const parent = selected ? selected : mainid
    const path = name.replace(/\s/g, '').toLowerCase()
    const parentmodel = _.find(menu, {_id: parent})
    const fullpath = parentmodel && parentmodel.path !== "/" ? `${parentmodel.path}/${path}` : `${path}`
    // console.log(path, fullpath, parentmodel.path)
    const body = { name, parent, path: fullpath }
    const payload = await Service.saveCollection(body)
    const itemid = payload._doc._id
    functions.handleRoot()
    this.handleSelected(itemid)
  }
  handleSelectItem() {
    const { selected, st_addit, collect_field_value } = this.state
    if((st_addit && collect_field_value.length === 0) || (!st_addit && !selected)) return false
    if(st_addit) { 
      this.handleSaveItem(true) 
    } else {
      // this.props.handleAddItem(selected)
      // this.props.handleParents()
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
    const { functions, mainid, menu } = this.props
    const { selected, st_addit } = this.state
    
    const current_modl = _.find(menu, {_id: selected})
    const current_path = current_modl ? current_modl.path : ""    
    const item_selectd = current_path.startsWith(`${item.path}/`) || current_path === item.path
    const item_clsstrg = item_selectd ? ` visible` : ` `
    
    const is_over = (!st_addit && item._id === selected)
    const string_selected = is_over ? ` selected` : ``
    const nfield_visibles = st_addit ? ` visible` : ` `
    const parent_havesubs = _.filter(menu, {parent: item._id})
    // console.log(item.path)
    return (
      <div className={`dpto-item${item_clsstrg}${string_selected}`} key={k}>
        <div className="dpto-wrap" onClick={() => this.handleSelected(item._id)}>
          <div className="dpto-wrap-left">
            { 
              parent_havesubs.length > 0 ? 
                item_selectd ? 
                  this.renderIconOpend() : 
                    this.renderIconClose() : 
                      this.renderIconSlash() 
            }
          </div>
          <div className="dpto-wrap-center">{item.name.toUpperCase()}</div>
          <div className="dpto-wrap-right">
            { is_over && 
              <Link to={`/${item.path}`} onClick={() => functions.handleClea() && functions.handleMenu()}>
                <i className="material-icons">open_in_new</i> 
              </Link>
            }
          </div>
        </div>
        <div className="dpto-subs">
          { this.renderSubs(item._id) }
          <div className={`dpto-newf${nfield_visibles}`}>
            { (item._id === selected || mainid === selected) && st_addit && this.renderField(item._id) }
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
    const { mainid, menu, functions, logged } = this.props
    const { selected, st_addit, collect_field_value } = this.state
    const root_md = _.find(menu, {path: "/"})
    const root_id = root_md ? root_md._id.toString() : "0"
    const root_sb = _.filter(menu, {parent: root_id})
    const ordered = root_sb.sort((a, b) => a.name.localeCompare(b.name))
    const bttn_sv = st_addit && (collect_field_value.length > 0) ? " pri" : !st_addit && selected && root_id !== selected ? " pri" : " thi"
    return (
      <div className="menu-body">
        <div className="parent-body-contnt">
          { 
            _.map(ordered, (item, k) => {
              return this.renderItem(item, k)
            })
          }
          <div className="dpto-newf">
            {
              (!selected || root_id === selected) && 
                st_addit && this.renderField(root_id)
            }
          </div>
        </div>
        { logged &&
          <MenuBottom 
            bttn_sv={bttn_sv}
            st_addit={st_addit}
            functions={functions}
            handleNewItem={this.handleNewItem.bind(this)}
            handleSelectItem={this.handleSelectItem.bind(this)}
            handleDeleteItem={this.handleDeleteItem.bind(this)}
          />
        }
      </div>
    )
  }
  render() {
    const { menu, functions } = this.props
    if(!menu) return false
    return (
      <div className="main-menu-wrap">
        <button onClick={() => functions.handleMenu()}>
          <div className="main-menu-opac"></div>
        </button>
        <div className="main-menu">
          <div className="main-menu-top">
            <button onClick={() => functions.handleMenu()}>
              <i className="material-icons">close</i>
            </button>
          </div>
          <div className="main-menu-title">
            <Link to={`/`} onClick={() => functions.handleClea()}>PAREDES DO PORTO</Link>
          </div>
          { this.renderModal() }
        </div>
      </div>
    )
  }
}


const MenuBottom = (props) => {
  const { st_addit, bttn_sv, functions, handleNewItem, handleSelectItem, handleDeleteItem } = props
  return (
    <div className="parent-body-bottom">
      { st_addit && (
        <div className="parent-body-wrap">
          <button 
            className={`main-button thi`} 
            onClick={() => handleNewItem()}>
            CANCELAR
          </button>
          <button 
            className={`main-button thi`} 
            onClick={() => handleSelectItem()}>
            SALVAR
          </button>
        </div>
      )}
      { !st_addit && (
        <div className="parent-body-wrap three">
          <button 
            className={`main-button thi`} 
            onClick={() => handleNewItem()}>
            NOVA
          </button>
          <button 
            className={`main-button thi`} 
            onClick={() => handleDeleteItem()}>
            EXCLUIR
          </button>
          <button 
            className={`main-button${bttn_sv}`} 
            onClick={() => handleNewItem()}>
            EDITAR
          </button>
        </div>
      )}
      <button 
        className={`main-button thi`} 
        onClick={() => functions.handleLgot()}>
        { `LOGOUT`}
      </button>
    </div>
  )
}

export default Component;