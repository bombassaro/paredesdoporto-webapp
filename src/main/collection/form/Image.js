import _ from 'lodash'
import React from 'react'

const Component = (props) => {
  const { mainpost, children } = props
  const { link } = mainpost
  const slice = link && link.slice(-1) === "/" ? "" : "/"
  const src = `${link}${slice}media/?size=l`
  return (
    <React.Fragment>
      <img className="form-pict" src={src} alt="" />
      { children }
    </React.Fragment>
  )
}
export default Component