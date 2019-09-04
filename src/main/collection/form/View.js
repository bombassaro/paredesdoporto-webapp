import _ from 'lodash'
import React from 'react'

const Component = (props) => {
  const { content, mainpost, menu } = props
  return (
    <div className="form-cont form-view-cont">
      <div className="form-view-group">
        <div className="form-view-labl">MENSAGEM</div>
        <div className="form-view-vlue">{mainpost["title"]}</div>
      </div>
      <div className="form-view-group">
        <div className="form-view-labl">DATA DE REGISTRO</div>
        <div className="form-view-vlue">{mainpost["rdate"]}</div>
      </div>
      <div className="form-view-group">
        <div className="form-view-labl">LOCALIZAÇÃO</div>
        <div className="form-view-vlue">{mainpost["local"]}</div>
      </div>
      <div className="form-view-group">
        <div className="form-view-labl">PARENTS</div>
        { 
          _.map(mainpost.parents, (item, k) => {
            const itemdata = _.find(menu, { _id: item})
            return ( 
              <div className="form-view-tag" key={k}>
                {itemdata && itemdata.path}
              </div> 
            )
          })
        }
      </div>
      <div className="form-view-group">
        <div className="form-view-labl">TAGS</div>
        { 
          _.map(mainpost.tags, (tag, k) => {
            return ( 
              <div className="form-view-tag" key={k}>
                {`# ${tag}`}
              </div> 
            )
          })
        }
      </div>
    </div>
  )
}
export default Component