import _ from 'lodash'
import React from 'react';
export default class Component extends React.Component {
  constructor(props) {
    super(props)
    this.input = React.createRef();
  }
  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.handleTagAdd()
    }
  }
  handleTagAdd() {
    let { fields } = this.props
    let { tags, tag_field } = fields
    tag_field = tag_field.toUpperCase()
    if(!tag_field) return false
    if(tags.length > 0) {
      tags.unshift(tag_field)
    } else {
      tags.push(tag_field)
    }
    fields.tags = tags
    fields.tag_field = ""
    this.input.current.value = ""
    this.props.handleFields(fields)
  }
  handleTagRem(tag) {
    let { fields } = this.props
    let { tags } = fields
    let filtered = _.remove(tags, function(n) { return n !== tag })
    fields.tags = filtered
    this.props.handleFields(fields)
  }
  renderText() {
    return (
      <input 
        type="text" 
        ref={this.input} 
        onKeyPress={this.handleKeyPress}
        onChange={this.props.handleChange("tag_field")} 
      />
    )
  }
  renderField() {
    const { label } = this.props
    return (
      <div className="field-count">
        <p className="field-labl">{label}</p>
        <div className="field-tag">
          <div className="lef">#</div>
          <div className="cen">
            {this.renderText()}
          </div>
          <div className="rig">
            <button onClick={() => this.handleTagAdd()}>
              <i className="material-icons">add</i>
            </button>
          </div>
        </div>
      </div>
    )
  }
  renderTag(item, k) {
    return (
      <div className="field-tag item" key={k}>
        <div className="lef">#</div>
        <div className="cen">
          <p>{item}</p>
        </div>
        <div className="rig">
          <button onClick={() => this.handleTagRem(item)}>
            <i className="material-icons">remove</i>
          </button>
        </div>
      </div>
    )
  }
  render() {
    const { tags } = this.props
    return (
      <div className="tagger">
        { this.renderField() }
        { 
          _.map(tags, (item, k) => {
            return this.renderTag(item, k)
          }) 
        }
      </div>
    )
  }
}