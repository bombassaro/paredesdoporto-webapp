import _ from 'lodash'
import React from 'react'

import Field from '../Field';
import Collect from '../Collect';
import Tagger from '../Tagger';

const Component = (props) => {
  const { fields, functions, menu } = props
  return (
    <div className="form-cont">
      <Field 
        type="textarea" 
        label="MENSAGEM" 
        defaultValue={fields && fields["title"]} 
        onChange={functions.handleChange("title")} 
      />
      <Field 
        type="masked-date" 
        label="DATA DE REGISTRO" 
        defaultValue={fields && fields["rdate"]} 
        onChange={functions.handleChange("rdate")} 
      />
      <Field 
        type="text" 
        label="LOCALIZAÇÃO" 
        defaultValue={fields && fields["local"]} 
        onChange={functions.handleChange("local")} 
      />
      <Collect {...props}
        menu={menu}
        fields={fields}
        parents={fields && fields["parents"]} 
        handleFields={functions.handleFields}
        handleChange={functions.handleChange} 
        reloadMenu={functions.handleRoot}
      />
      <Tagger {...props}
        fields={fields}
        tags={fields && fields["tags"]} 
        label="TAGS" 
        handleFields={functions.handleFields}
        handleChange={functions.handleChange} 
      />
    </div>
  )
}
export default Component