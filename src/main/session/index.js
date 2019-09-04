import React, { useContext, useEffect } from 'react'

import { Session } from "./actions/reducer";

import Login from './Login'
import Logging from './Logging'
import Logout from './Logout'

import { logout, loginUser, loginVerify } from "./actions/actions";

const Component = (props) => {
  
  const { state, dispatch } = useContext(Session);
    
  const handleInitz = () => {
    !state.verified && loginVerify()(dispatch);
  }

  useEffect(() => handleInitz(state, dispatch), [state]);

  const handleLogin = () => {
    const username = "sysadmin"
    const password = "sysadmin"
    const credentials = { username, password }
    !state.logging && loginUser(credentials)(dispatch);
  }

  const handleLogout = () => logout()(dispatch);

  const functions = { handleLogin, handleLogout }

  return (
    state.logging ? 
      <Logging props /> : 
        state.logged ? 
          <Logout props functions={functions} /> : 
            <Login props functions={functions} /> )
}

export default Component

