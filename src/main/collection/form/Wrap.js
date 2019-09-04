import _ from 'lodash'
import React, { useEffect } from 'react'

import Fields from './Fields'
import BImg from './Image'
import New from './New'
import TBar from './Bars'
import View from './View'

const Component = (props) => {
  const { edition, editstp, fields, mainpost } = props
  return (
    <div className="form-wrap">
      <div className="form-body">
        <TBar {...props} />
        <div className="form-body-wrap">
        { 
          edition && editstp === "A" ?
            <New {...props} /> :
              <BImg mainpost={mainpost ? mainpost : fields}>
                { 
                  edition && editstp === "B" ?
                    <Fields {...props} /> :
                      mainpost ?
                        <View {...props} /> :
                        <div className="loader08"></div>
                }
              </BImg>
        }
        </div>
      </div>
    </div>
  )
}
export default Component