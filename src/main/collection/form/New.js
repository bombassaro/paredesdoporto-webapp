import _ from 'lodash'
import React, {useRef, useEffect} from 'react'

import Field from '../Field';

const Component = (props) => {
  const { fields, functions, menu } = props
  const main_field = useRef(null)

  useEffect(() => {
    main_field && main_field.current && main_field.current.focus();
  }, []);

  return (
    <div className="form-link">
      <div className="field-cont">
        <p className="field-labl">URL DA IMAGEM</p>
        <input
          ref={main_field}
          type="text" 
          defaultValue={fields && fields["link"]} 
          onChange={functions.handleChange("link")} 
          onKeyPress={(event) => event.key === 'Enter' && functions.handleSubmit()}
        />
      </div>
    </div>
  )
}
export default Component