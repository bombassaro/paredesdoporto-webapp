import _ from 'lodash'
import React, { useEffect } from 'react'

const TopbarMain = (props) => {
  const { edition, functions, logged, fields, mainpost } = props
  return (
    <div className="form-topb">
      <div className="topbar-cont">
        <div className="left-icon">
          <button onClick={() => functions.handleGoBack()}>
            <i className="material-icons">keyboard_arrow_left</i>
          </button>
        </div>
        <div className="title"></div>
        { 
          !logged ? 
            <TopbarEmpty {...props} /> : 
              mainpost && !edition ? 
                <TopbarView {...props} /> : 
                  <TopbarForm {...props} />
        }
      </div>
    </div>
  )
}

const TopbarEmpty = (props) => {
  return (
    <div className="right-icon"></div>
  )
}
const TopbarView = (props) => {
  const { functions } = props
  return (
    <div className="right-icon">
      <button 
        className={`main-button thi`} 
        onClick={() => functions.deleteData()}>
        {`DELETAR`}
      </button>
      <button 
        className={`main-button sec`} 
        onClick={() => functions.handleEdition()}>
        {`EDITAR`}
      </button>
    </div>
  )
}
const TopbarForm = (props) => {
  const { editstp, functions, fields, fvalid } = props
  const buttonName = editstp === "A" ? "AVANÇAR" : "SALVAR"
  let disabled = true
  disabled = editstp === "A" && fields && fields.link ? false : disabled
  disabled = 
    editstp === "B" && 
    fields && 
    fields.title && 
    fields.parents && 
    fields.parents.length > 0 ? 
      false : 
        disabled
        
  return (
    <div className="right-icon">
      <button 
        className={`main-button pri${disabled ? " dis" : ""}`} 
        onClick={() => functions.handleSubmit()}> 
        { buttonName }
      </button>
    </div>
  )
}
export default TopbarMain