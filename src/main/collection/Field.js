import React from 'react';
import MaskedInput from 'react-text-mask'
// [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]

class Field extends React.Component {
  renderMaskedInput(mask) {
    return (
      <MaskedInput
        className="form-control"
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        guide={false}
         {...this.props}
        // onBlur={() => {}}
        // onChange={() => {}}
      />
    )
  }
  renderTextarea() {
    // const { type } = this.props
    return (
      <textarea {...this.props}></textarea>
    )
  }
  renderText() {
    const { type } = this.props
    return (
      <input type={type} {...this.props} />
    )
  }
  render() {
    const { label, type, loading } = this.props
    let classes, disabled
    disabled = loading === true ? "disabled " : ""
    classes = "field-cont "
    classes = classes + disabled
    return (
      <div className={classes}>
        <p className="field-labl">{label}</p>
        { type === "textarea" ? this.renderTextarea() : null }
        { type === "masked-date" ? this.renderMaskedInput() : null }
        { type === "text" ? <input type={type} {...this.props} />  : null }
      </div>
    )
  }
}

export default Field;