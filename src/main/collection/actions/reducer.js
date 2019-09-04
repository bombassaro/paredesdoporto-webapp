import React from 'react'

import * as types from "../actions";
import * as pnels from "../actions/panels";

const initialState = {
  lodng: false,
  initd: false,
  initl: false,
  links: false,
  dptos: false,
  subsl: false,
  fltrn: false,
  formn: false,
  mnuon: false,
  postn: false,
  rfrsh: false,
  tagsl: false,
  topon: true,
};

const HandleCollectionSuccess = function(state, payload) {
  return { ...state, 
    subsl: payload.subs 
  };
}
const HandleCollecLinkSuccess = function(state, payload) {
  return {...state, 
    links: payload.posts, 
    tagsl: payload.tags,
    lodng: false
  };
}
const HandleCollDtLinkSuccess = function(state, payload) {
  return {...state, 
    lkdta: payload.posts
  };
}
const HandleLRootDprtoSuccess = function(state, payload) {
  return {...state, 
    dptos: payload.menu 
  };
}

function reducer(state, action){
  const { type, payload } = action
  switch(type) {
    case types.LROOTDPRTO_START: 
      return {...state}
    case types.COLLDTLINK_START: 
      return {...state}
    case types.COLLECTION_START: 
      return {...state, initd: true, lodng: true}
    case types.COLLECLINK_START: 
      return {...state, initl: true, lodng: true}
    case types.COLLECTION_CLEAR: 
      return {...state, initd: false}
    case types.COLLECLINK_CLEAR: 
      return {...state, initl: false}
    case types.COLLDTLINK_CLEAR: 
      return {...state, links: false}
    case types.COLLECTION_FAILR: 
      return {...state, lodng: false}
    case types.COLLECTION_RFRSH: 
      return {...state, rfrsh: action.payload}
    case types.COLLECTION_SCCES: 
      return HandleCollectionSuccess(state, payload)
    case types.COLLECLINK_SCCES: 
      return HandleCollecLinkSuccess(state, payload)
    case types.COLLDTLINK_SCCES: 
      return HandleCollDtLinkSuccess(state, payload)
    case types.LROOTDPRTO_SCCES: 
      return HandleLRootDprtoSuccess(state, payload)
    case pnels.PANELSFLTR_TOGGL: 
      return {...state, fltrn: action.status ? action.status : !state.fltrn}
    case pnels.PANELSFORM_TOGGL: 
      return {...state, formn: action.status ? action.status : !state.formn}
    case pnels.PANELSMENU_TOGGL: 
      return {...state, mnuon: action.status ? action.status : !state.mnuon}
    case pnels.PANELSPOST_TOGGL: 
      return {...state, postn: action.status ? action.status : !state.postn}
    default:
      return state;
  }
};

export const Collection = React.createContext("Collections");

export function CollectionProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Collection.Provider value={value}>{props.children}</Collection.Provider>;
}