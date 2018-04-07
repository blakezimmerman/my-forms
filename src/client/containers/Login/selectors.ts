import { createSelector } from 'reselect';
import { State } from 'client/store';

export const getUserName = (state: State) => state.login.loginRequest.result;
export const getLoginError = (state: State) => state.login.loginRequest.error;

export const getAuthenticated = createSelector(
  getUserName, getLoginError,
  (userName, loginError) => !!userName && !loginError
);
