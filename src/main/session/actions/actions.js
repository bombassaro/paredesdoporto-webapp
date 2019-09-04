import * as types from './types';
import Service from './service';

export const loginUser = (credentials) => async dispatch => {
  dispatch({ type: types.LOGIN_START });
  try {
    const payload = await Service.login(credentials);
    if(payload.status === 500) {
      dispatch({ type: types.LOGIN_FAILURE, payload });
    } else {
      dispatch({ type: types.LOGIN_SUCCESS, payload });
    }
  } catch (e) {
    dispatch({ type: types.LOGIN_FAILURE });
    console.error('Failed to login', e);
  }
}

export const loginClear = () => async dispatch => {
  dispatch({ type: types.LOGIN_CLEAR });
}

export const logout = () => async dispatch => {
  dispatch({ type: types.LOGIN_START });
  localStorage.removeItem('session-token');
  localStorage.removeItem('session-usrid');
  dispatch({ type: types.LOGIN_CLEAR });
}

export const loginVerify = () => async dispatch => {
  dispatch({ type: types.LOGIN_START });
  let token = localStorage.getItem('session-token');
  let usrid = localStorage.getItem('session-usrid');
  if(!token || !usrid || token === "undefined" || usrid === "undefined") {
    dispatch({ type: types.LOGIN_CLEAR });
    return false
  }
  let credentials = {token,usrid}
  const payload = await Service.verify(credentials);
  if(payload.status === true) {
    dispatch({ type: types.LOGIN_SESSION, payload });
  } else {
    dispatch({ type: types.LOGIN_CLEAR });
  }
}