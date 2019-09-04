import Service from './service';

export const PANELSFLTR_TOGGL = 'PANELSFLTR/TOGGL';
export const PANELSFORM_TOGGL = 'PANELSFORM/TOGGL';
export const PANELSMENU_TOGGL = 'PANELSMENU/TOGGL';
export const PANELSPOST_TOGGL = 'PANELSPOST/TOGGL';
// export const PANELSCNTN_TOGGL = 'PANELSCNTN/TOGGL';

export const toggleFltr = (status) => async dispatch => {
  dispatch({ type: PANELSFLTR_TOGGL, status });
}
export const toggleForm = (status) => async dispatch => {
  dispatch({ type: PANELSFORM_TOGGL, status });
}
export const toggleMenu = (status) => async dispatch => {
  dispatch({ type: PANELSMENU_TOGGL, status });
}
export const togglePost = (status) => async dispatch => {
  dispatch({ type: PANELSPOST_TOGGL, status });
}
