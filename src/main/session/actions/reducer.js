import React from 'react'

import * as types from "./types";

const initialState = {
  verified: false,
  failure: false,
  logging: true,
  logged: false,
  data: null,
};

const handleLoginSuccess = function(state, payload) {
  console.log(state, payload)
  let usrid = payload.response ? payload.response.userId : undefined
  let token = payload.response ? payload.response.token : undefined
  let usrdt = payload ? payload.userdata : undefined
  localStorage.setItem('session-token', token);
  localStorage.setItem('session-usrid', usrid);
  return {...state, data: usrdt, logged: true, logging: false, failure: false};
}
const handleLoginFailure = function(state, payload) {
  localStorage.removeItem('session-token');
  localStorage.removeItem('session-usrid');
  let message = payload.body.response.message
  return {...state, data: null, logged: false, logging:false, failure: true, message};
}
const handleUserData = function(state, payload) {
  let usrdt = payload ? payload.userdata : undefined
  return {...state, data: usrdt, logged:true, logging:false, failure:false};
}
const handleLogout = function(state, payload) {
  localStorage.removeItem('session-token');
  localStorage.removeItem('session-usrid');
  return {...state, data: null, logged: false, logging:false, failure: false};
}

function reducer(state, action){
  const { type, payload } = action
  switch(type) {
    case types.LOGIN_CLEAR: return {...state, logged: false, logging: false, failure: false, message: ""}
    case types.LOGIN_START: return {...state, verified: true, logging: true, failure: false, message: ""}
    case types.LOGIN_SESSION: return handleUserData(state, payload)
    case types.LOGIN_SUCCESS: return handleLoginSuccess(state, payload)
    case types.LOGIN_FAILURE: return handleLoginFailure(state, payload)
    case types.LOGOUT_REQUEST: return handleLogout(state, payload)
    default:
      return state;
  }
};

export const Session = React.createContext("");

export function SessionProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Session.Provider value={value}>{props.children}</Session.Provider>;
}