import _ from 'lodash'
import React, { useContext } from 'react'
import AddBttn from './AddBttn';
import Board from './Board'
import Menu from './Menu'
import Form from './form'
import Filter from './Filter'
import Topbar from './Topbar'
import Load from './Load'

import { Session } from "../session/actions/reducer";
import { logout } from "../session/actions/actions";

import { Collection } from "./actions/reducer";
import { cleanCollectionLinks, refreshCollection, reloadCollection, loadRootDpto } from "./actions";
import { toggleFltr, toggleForm, toggleMenu, togglePost } from "./actions/panels";

const Component = (props) => {

  const SessionState = useContext(Session);
  const { state, dispatch } = useContext(Collection);

  const handleBack = () => props.history.goBack()
  const handleClea = () => cleanCollectionLinks()(dispatch)
  const handleForm = () => props.history.push("/p/new")
  const handleFltr = () => toggleFltr()(dispatch)
  const handleMenu = () => toggleMenu()(dispatch)
  const handlePost = () => togglePost()(dispatch)
  const handleRflk = () => loadRootDpto()(dispatch)
  const handleRfsh = () => refreshCollection(!state.rfrsh)(dispatch)
  const handleRlod = () => reloadCollection()(dispatch)
  const handleRoot = () => loadRootDpto()(dispatch)
  const handleLgot = () => logout()(SessionState.dispatch)
  
  const handleGoTo = (dest) => {
    props.history.push(dest)
    handleRfsh()
  }
  
  const functions = { 
    handleBack,
    handleClea, 
    handleForm, 
    handleFltr, 
    handleGoTo, 
    handleMenu, 
    handlePost,
    handleRflk,
    handleRfsh,
    handleRlod,
    handleRoot,
    handleLgot 
  }

  const { logged } = SessionState.state
  const { content, isnew } = props
  const { main, postid } = content
  const { dptos, fltrn, formn, lodng, links, mnuon, postn, tagsl, topon } = state
  const mainbj = _.find(dptos, { path: "/" })
  const mainid = mainbj ? mainbj._id.toString() : "0"
  return (
    <React.Fragment>
      { topon && 
        <Topbar {...props}
          content={content}
          functions={functions} 
          menu={dptos} 
          tags={tagsl}
        /> 
      }
      { mnuon && 
        <Menu 
          functions={functions} 
          logged={logged} 
          mainid={mainid}
          menu={dptos} 
        />
      }
      { fltrn && 
        <Filter 
          content={content}
          functions={functions} 
          tags={tagsl}
        />
      }
      { (isnew || postid) && 
        <Form {...props}
          content={content}
          functions={functions} 
          logged={logged} 
          menu={dptos} 
        />
      }
      <Board 
        content={content}
        functions={functions}
        lodng={lodng} 
        items={links} 
      />
      { lodng && 
        <Load />
      }
      { logged &&
        <AddBttn functions={functions} items={links} />
      }
    </React.Fragment>
  )
}
export default Component