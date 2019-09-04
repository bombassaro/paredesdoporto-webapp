import React from 'react'
const Component = (props) => {
	const { functions, item } = props;
  let slice = item.link.slice(-1) === "/" ? "" : "/"
  let src = `${item.link}${slice}media/?size=l`
  return (
  	<div className="post-page">
      <div className="topbar-page">
        <i 
          className="material-icons" 
          onClick={() => functions.handlePost()}>
          keyboard_arrow_left
        </i>
      </div>
      <div className="post-image">
        <img src={src} alt={item.title} />
      </div>
      <div className="post-body">
        <p className="label-title">MENSAGEM</p>
    		<p className="label-text">{item.title}</p>
        <p className="label-title">DATA DE REGISTRO</p>
        <p className="label-text">{item.rdate}</p>
        <p className="label-title">LOCAL</p>
        <p className="label-text">{item.local}</p>
        <p className="label-title">CATEGORIA</p>
        <p className="label-text">{item.link}</p>
      </div>
  	</div>
	)
}
export default Component;