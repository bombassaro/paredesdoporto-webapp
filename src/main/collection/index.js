import React, { useContext, useState, useEffect } from 'react'

import Container from './Container'
import Empty from './Empty'
import Logging from '../session/Logging'
import Logout from '../session/Logout'

import { Collection } from "./actions/reducer";
import { togglePost } from "./actions/panels";
import { loadCollection, loadCollecLink, loadDataLink, loadRootDpto } from "./actions";

const gtag = window.gtag

class WrapComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { should_update: false }
  }
  componentWillReceiveProps(prevProps) {
    const props_key = this.props.location.key
    this.setState({ propkey: props_key })
  }
  render() {
    const { propkey } = this.state
    return <Component {...this.props} propkey={propkey} />
  }
}

const Component = (props) => {
  
  const { state, dispatch } = useContext(Collection);
  const [ content, setContent ] = useState("")
    
  const prepareContent = (p) => {
    const { subsl } = state
    const { location, match } = p
    const { path, params } = match
    const { tag, postid } = params
    const main = params[0] ? params[0] : "/"
    const isnew = path === "/p/new" ? true : false
    return { location, main, tag, postid, subsl, isnew, params }
  }

  const handleInitz = () => {
    const _content = prepareContent(props)
    
    if((_content && _content.location.key) !== 
      (content && content.location.key)) {

      setContent(_content)

      loadRootDpto(_content)(dispatch)

      gtag('config', 'GA_MEASUREMENT_ID', {'page_path': `${_content.main}`});

      gtag('event', 'collection_path', {
        'event_category': 'collection',
        'event_label': _content.main
      });

      _content.tag && gtag('event', 'collection_tag', {
        'event_category': 'collection',
        'event_label': _content.tag
      });

      _content.postid &&
      _content.postid !== content.postid &&
        loadDataLink(_content)(dispatch)
      
      !_content.isnew &&
      !_content.postid && 
        loadCollection(_content)(dispatch)
        // loadCollecLink(_content)(dispatch)

    } else if(
      !_content.postid &&
      !_content.isnew
    ) {
      if(!state.initd) 
        loadCollection(_content)(dispatch)

      if(state.initd && !state.initl)
        loadCollecLink(_content)(dispatch)
    }
  }

  useEffect(() => handleInitz(state, dispatch), [props, state]);
  
  const { main, isnew } = content

  return (
    main !== "login" &&
      <Container 
        isnew={isnew}
        history={props.history}
        content={content} /> 
  )
}

export default WrapComp