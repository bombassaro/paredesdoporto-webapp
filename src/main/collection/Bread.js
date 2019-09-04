import _ from 'lodash'
import React from 'react';
import { Link } from 'react-router-dom'
const featured_tags_size = 5
class Component extends React.Component{
  renderTag(tag, active, k) {
    if(!tag) return false
    const { content, functions } = this.props
    const { main } = content
    const selected = active ? " selected" : ""
    const man_path = main === `/` ? `` : `/${main}`
    const tag_path = `/t/${tag.toLowerCase()}`
    // console.log(main, tag)
    let path = active ? 
      `${man_path}` : 
      `${man_path}${tag_path}`
    return (
      <div className={`item tag${selected}`} key={k}>
        <Link to={`${path}`} onClick={() => functions.handleClea()}>{`# ${tag}`}</Link>
      </div>
    )
  }
  renderTags(tags) {
    return _.map(tags, (item, k) => {
      return this.renderTag(item.name, false, k)
    })
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
  renderItem(item, k, subs) {
    if(!item) return false
    const { content, functions, menu, mainid } = this.props
    const { tag, main } = content
    const parent_model = _.find(menu, {_id: item.parent})
    const current_modl = _.find(menu, {path: main})
    const current_path = current_modl ? current_modl.path : `/`
    // const item_selectd = item.path.startsWith(current_path) || current_path === item.path
    const item_current = current_path === item.path
    const item_selectd = current_path.startsWith(`${item.path}/`) || item_current
    // const item_selectd = current_path.startsWith(item.path) || item_current
    // if(!item_selectd) return false
    const item_clsstrg = item_current && !tag ? ` current` : item_selectd ? ` selected` : parent_model && parent_model.path === current_path && !tag ? ` visible` : ``
    // let itemclas = !subs ? " dpto" : " subs"
    // console.log(parent_model.path, parent_model.path === current_path)
    const fstslash = item.path === "/" ? "" : "/"
    const prntpath = !parent_model ? "/" : `${!parent_model.path.startsWith("/") ? "/" : ""}${parent_model.path}`
    const itempath = item.path === current_path ? `${prntpath}` : `/${item.path}`
    // console.log(current_path, item.path ,item.path === current_path)
    return (
      <React.Fragment key={k}>
        <div className={`item dpto${item_clsstrg}`}>
          <Link to={itempath} onClick={() => functions.handleClea()}>{`${fstslash} ${item.name}`}</Link>
        </div>
        <div className={`item-dpto-subs${item_clsstrg}`}>
          { this.renderSubs(item._id) }
        </div>
      </React.Fragment>
    )
  }
  renderItems() {
    const { menu } = this.props
    const root_md = _.find(menu, {path: "/"})
    const root_id = root_md ? root_md._id.toString() : "0"
    const root_sb = _.filter(menu, {parent: root_id})
    return _.map(root_sb, (item, k) => {
      return this.renderItem(item, k)
    })
  }
  render() {
    const { content, menu, tags } = this.props
    const { tag, main } = content

    let maindata = _.find(menu, { path: main })
    let subs = menu
    let feat_tags = tags
    // items.push(maindata)
    if(maindata) {
      let s_parent = _.find(menu, { _id: maindata.parent })
      if(s_parent) {
        subs = _.filter(menu, { parent: maindata._id.toString() })
      }
    }
    if(tag) feat_tags = _.reject(tags, { name: tag.toUpperCase() })
    feat_tags = _.orderBy(feat_tags, ['name'],['asc']);
    feat_tags = _.orderBy(feat_tags, ['count'],['desc']);
    feat_tags = _.slice(feat_tags, 0, featured_tags_size)

    return (
      <div className="breadcrumb">
        <div className="bread-cont">
          <div className="items">
            {this.renderItems()}
            {this.renderTag(tag, true)}
            {
              // !tag && 
              // subs && 
              // subs.length < 3 ? 
                // null : 
                this.renderTags(feat_tags)
            }
          </div>
        </div>
      </div>
    )
          // <div className="item-right"></div>
  }
}
export default Component;